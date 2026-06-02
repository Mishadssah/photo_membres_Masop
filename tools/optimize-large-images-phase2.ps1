$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = 'c:\Users\Admin\Documents\photo_membres_Masop'
$imagesRoot = Join-Path $root 'images'
$backupRoot = Join-Path $root 'images\_backup_phase2_large'
$reportPath = Join-Path $root 'image_optimization_phase2_large_report.txt'

function Get-JpegCodec {
    return [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq 'image/jpeg' } |
        Select-Object -First 1
}

function Save-JpegWithQuality {
    param(
        [Parameter(Mandatory = $true)] [string] $InputPath,
        [Parameter(Mandatory = $true)] [string] $OutputPath,
        [Parameter(Mandatory = $true)] [int] $Quality
    )

    $image = [System.Drawing.Image]::FromFile($InputPath)
    try {
        $codec = Get-JpegCodec
        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$Quality)
        $image.Save($OutputPath, $codec, $encoderParams)
    }
    finally {
        $image.Dispose()
    }
}

New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null

$targets = Get-ChildItem -Path $imagesRoot -Recurse -File |
    Where-Object {
        $_.FullName -notlike '*\images\_backup_phase2*' -and
        $_.Extension.ToLowerInvariant() -in @('.jpg', '.jpeg') -and
        $_.Length -gt 250KB
    } |
    Sort-Object Length -Descending

$report = New-Object System.Collections.Generic.List[string]
$report.Add('Phase 2 large image optimization report') | Out-Null
$report.Add(('Timestamp: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))) | Out-Null
$report.Add('') | Out-Null

foreach ($file in $targets) {
    $relativeFromImages = $file.FullName.Substring($imagesRoot.Length + 1)
    $relative = 'images\\' + $relativeFromImages
    $backupPath = Join-Path $backupRoot $relativeFromImages
    $backupDir = Split-Path -Path $backupPath -Parent
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    if (-not (Test-Path $backupPath)) {
        Copy-Item -Path $file.FullName -Destination $backupPath -Force
    }

    $tempPath = $file.FullName + '.tmp.jpg'
    Save-JpegWithQuality -InputPath $file.FullName -OutputPath $tempPath -Quality 80

    $beforeBytes = $file.Length
    $afterBytes = (Get-Item $tempPath).Length

    if ($afterBytes -lt $beforeBytes) {
        Move-Item -Path $tempPath -Destination $file.FullName -Force
        $savedBytes = $beforeBytes - $afterBytes
        $savedPct = [math]::Round(($savedBytes / $beforeBytes) * 100, 2)
        $report.Add(($relative + '|optimized|' + $beforeBytes + '|' + $afterBytes + '|' + $savedPct + '%')) | Out-Null
    }
    else {
        Remove-Item -Path $tempPath -Force
        $report.Add(($relative + '|kept-original|' + $beforeBytes + '|' + $afterBytes + '|0%')) | Out-Null
    }
}

Set-Content -Path $reportPath -Value $report
