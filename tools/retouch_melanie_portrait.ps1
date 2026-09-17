$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot '..\images\gallery\photo_melanie_psy_benevole.jpeg'
$output = Join-Path $PSScriptRoot '..\images\gallery\photo_melanie_psy_benevole_portrait.jpg'

if (-not (Test-Path $source)) {
    throw "Fichier introuvable : $source"
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
if ($magick) {
    Write-Host "Utilisation de ImageMagick pour le retouche portrait..."
    & $magick "$source" `
        -gravity center `
        -crop 78x100%+0+0 `
        -resize 900x1100^ `
        -extent 900x1100 `
        -background "#f2efe8" `
        -alpha background `
        -auto-level `
        -modulate 100,110,100 `
        -contrast-stretch 0x8% `
        -sharpen 0x1.0 `
        -quality 95 `
        "$output"

    if (Test-Path $output) {
        Write-Host "Portrait créé : $output"
        exit 0
    }
}

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command py -ErrorAction SilentlyContinue
}

if ($python) {
    Write-Host "Utilisation de Python/Pillow pour le retouche portrait..."
    $payload = @'
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

src = Path(sys.argv[1])
out = Path(sys.argv[2])
img = Image.open(src).convert('RGB')

# Portrait plus serré sur visage + épaules
w, h = img.size
crop_w = int(w * 0.78)
crop_h = int(h * 0.94)
left = (w - crop_w) // 2
upper = max(0, int(h * 0.03))
right = left + crop_w
lower = min(h, upper + crop_h)
img = img.crop((left, upper, right, lower))
img = img.resize((900, 1100), Image.Resampling.LANCZOS)

# Arrière-plan neutre clair, style portrait de studio
bg = Image.new('RGB', img.size, (242, 236, 228))
blur = img.filter(ImageFilter.GaussianBlur(radius=1.5))
blur = ImageEnhance.Color(blur).enhance(0.9)
blur = ImageEnhance.Brightness(blur).enhance(1.04)
blur = ImageEnhance.Contrast(blur).enhance(1.06)

# Masque central doux pour garder le sujet sans fond extérieur artificiel
mask = Image.new('L', img.size, 0)
for y in range(img.size[1]):
    for x in range(img.size[0]):
        cx = (x - img.size[0] / 2) / (img.size[0] / 2)
        cy = (y - img.size[1] / 2) / (img.size[1] / 2)
        dist = (cx * cx + cy * cy) ** 0.5
        weight = max(0, 1 - dist * 1.25)
        mask.putpixel((x, y), int(max(0, min(255, weight * 255))))

composed = Image.composite(blur, bg, mask)
composed = ImageEnhance.Brightness(composed).enhance(1.04)
composed = ImageEnhance.Contrast(composed).enhance(1.08)
composed = ImageEnhance.Color(composed).enhance(0.98)

# Conserver un rendu naturel, sans lissage excessif du visage
composed.save(out, quality=95)
print(f'Portrait créé : {out}')
'@

    $tmpScript = Join-Path $env:TEMP 'retouch_melanie_portrait.py'
    Set-Content -Path $tmpScript -Value $payload -Encoding UTF8
    & $python $tmpScript $source $output

    if (Test-Path $output) {
        Write-Host "Portrait créé : $output"
        exit 0
    }
}

throw "Aucun outil disponible pour retoucher l'image. Installez ImageMagick ou Python/Pillow sur la machine locale."
