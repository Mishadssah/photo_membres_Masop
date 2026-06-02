$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = 'c:\Users\Admin\Documents\photo_membres_Masop'
$backupRoot = Join-Path $root 'images\_backup_phase2'
$reportPath = Join-Path $root 'image_optimization_phase2_report.txt'

$targets = @(
    'images\gallery\photo_femmes_lutte_droit_8_mars_2026.jpg',
    'images\gallery\photo_remise_certificat.jpeg',
    'images\gallery\photo_activite_terrain_janvier_2026_1.jpeg',
    'images\gallery\photo_activite_terrain_janvier_2026.jpeg',
    'images\gallery\photo_formation_agent_protection_1.jpeg',
    'images\gallery\photo_formation_agent_protection_2.jpeg',
    'images\gallery\teleconsultationMasop.jpeg',
    'images\gallery\REPI_Sensibilisation_IMJMC_Groupe_Filles_06-09jan2026.jpeg',
    'images\gallery\REPI_Visite_Site_ENRE_IMJMC_Delmas_06-09jan2026.jpeg',
    'images\gallery\formation_prevention_suicide_equipe_avril_2026.jpeg',
    'images\team\UlrickEdouardPresidentMasop.jpeg'
)

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
$report = New-Object System.Collections.Generic.List[string]
$report.Add('Phase 2 image optimization report') | Out-Null
$report.Add(('Timestamp: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))) | Out-Null
$report.Add('') | Out-Null

foreach ($relativePath in $targets) {
    $sourcePath = Join-Path $root $relativePath
    if (-not (Test-Path $sourcePath)) {
        $report.Add(($relativePath + '|missing')) | Out-Null
        continue
    }

    $fileInfo = Get-Item $sourcePath
    $extension = $fileInfo.Extension.ToLowerInvariant()
    if ($extension -notin @('.jpg', '.jpeg')) {
        $report.Add(($relativePath + '|skipped|non-jpeg')) | Out-Null
        continue
    }

    $backupPath = Join-Path $backupRoot ([IO.Path]::GetFileName($sourcePath))
    if (-not (Test-Path $backupPath)) {
        Copy-Item -Path $sourcePath -Destination $backupPath -Force
    }

    $tempPath = $sourcePath + '.tmp.jpg'
    Save-JpegWithQuality -InputPath $sourcePath -OutputPath $tempPath -Quality 82

    $beforeBytes = $fileInfo.Length
    $afterBytes = (Get-Item $tempPath).Length

    if ($afterBytes -lt $beforeBytes) {
        Move-Item -Path $tempPath -Destination $sourcePath -Force
        $savedBytes = $beforeBytes - $afterBytes
        $savedPct = [math]::Round(($savedBytes / $beforeBytes) * 100, 2)
        $report.Add(($relativePath + '|optimized|' + $beforeBytes + '|' + $afterBytes + '|' + $savedPct + '%')) | Out-Null
    }
    else {
        Remove-Item -Path $tempPath -Force
        $report.Add(($relativePath + '|kept-original|' + $beforeBytes + '|' + $afterBytes + '|0%')) | Out-Null
    }
}

Set-Content -Path $reportPath -Value $report
