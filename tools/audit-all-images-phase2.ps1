$ErrorActionPreference = 'Stop'

$root = 'c:\Users\Admin\Documents\photo_membres_Masop'
$reportPath = Join-Path $root 'image_audit_phase2_all.txt'

$items = Get-ChildItem -Path (Join-Path $root 'images') -Recurse -File |
    Where-Object {
        $_.FullName -notlike '*\images\_backup_phase2\*' -and $_.Extension.ToLowerInvariant() -in @('.jpg', '.jpeg', '.png', '.webp')
    } |
    Sort-Object Length -Descending

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add('All images by size') | Out-Null
$lines.Add(('Timestamp: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))) | Out-Null
$lines.Add('') | Out-Null

foreach ($item in $items) {
    $relative = $item.FullName.Replace($root + '\', '')
    $sizeKb = [math]::Round($item.Length / 1KB, 2)
    $lines.Add(($relative + '|' + $item.Length + '|' + $sizeKb + 'KB')) | Out-Null
}

Set-Content -Path $reportPath -Value $lines
