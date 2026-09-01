# Cuts the product photos out of the shop flyer.
#
# Every picture on the site except the ones you add yourself was made by this
# script. If a crop ever sits too tight or too loose, change the numbers in the
# list below and run the file again.
#
# To run it: right click the file and choose "Run with PowerShell".
#
# Each line is:  name, left, top, width, height, output width
# The first five are measured in pixels on the original flyer, which is 853
# wide by 1280 tall. The name decides the file name, so it must match the
# "image" field of the matching product in script.js.
#
# Output width of 0 means "enlarge by the scale set below". Any other number
# is an exact width in pixels, used for the share card so it does not come out
# too heavy for a WhatsApp preview.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root "images\flyer-source.jpeg"
$out  = Join-Path $root "images"

$crops = @(
  @("laziz-vegetable-oil",  43, 543, 164, 186, 0),
  @("winners-soya-oil",    245, 543, 164, 186, 0),
  @("knorr-chicken-cubes", 447, 543, 164, 186, 0),
  @("laziz-ketchup",       649, 543, 164, 186, 0),
  @("laziz-salad-cream",    43, 801, 164, 154, 0),
  @("laziz-mayonnaise",    245, 801, 164, 154, 0),
  @("active-vegetable-oil",447, 801, 164, 154, 0),
  @("checkers-custard",    649, 801, 164, 154, 0),
  @("hero-basket",         565,  88, 288, 282, 0),

  # The wide banner shown when someone pastes the link into WhatsApp or
  # Facebook. Roughly 16 by 9, which is the shape those apps expect.
  @("share-card",            0,   0, 853, 480, 1200)
)

# Crops are enlarged this many times so they stay sharp on high resolution
# phone screens. The flyer is small, so this is doing real work.
$scale = 3

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq "image/jpeg" }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 90)

$img = [System.Drawing.Image]::FromFile($src)

foreach ($c in $crops) {
  $name = $c[0]; $x = $c[1]; $y = $c[2]; $w = $c[3]; $h = $c[4]; $outW = $c[5]

  if ($outW -gt 0) {
    $tw = $outW
    $th = [int][math]::Round($h * ($outW / $w))
  } else {
    $tw = $w * $scale
    $th = $h * $scale
  }

  $rect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
  $bmp  = New-Object System.Drawing.Bitmap $tw, $th
  $g    = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $tw, $th), $rect,
               [System.Drawing.GraphicsUnit]::Pixel)

  $path = Join-Path $out "$name.jpg"
  $bmp.Save($path, $codec, $params)

  $g.Dispose(); $bmp.Dispose()
  Write-Output "$name.jpg  ${tw}x${th}"
}

$img.Dispose()
Write-Output "Done. Refresh the website to see the new crops."
