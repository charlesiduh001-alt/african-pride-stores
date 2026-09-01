# Draws the site icons: the shop mark used in the browser tab and on a phone
# home screen. It is a gold shopping trolley on the brand green.
#
# favicon.svg is hand written and covers modern browsers. This script produces
# the PNG sizes that iOS and Android need, because those cannot use SVG.
#
# To run it: right click the file and choose "Run with PowerShell".
# Only needed if you change the design in favicon.svg and want the PNGs to match.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$green = [System.Drawing.ColorTranslator]::FromHtml("#0A3D1C")
$gold  = [System.Drawing.ColorTranslator]::FromHtml("#F2B705")

# name, pixel size
$icons = @(
  @("apple-touch-icon", 180),
  @("icon-192",         192),
  @("icon-512",         512),
  @("favicon-32",        32)
)

foreach ($i in $icons) {
  $name = $i[0]; $size = $i[1]
  $s = $size / 64.0   # the design is drawn on a 64 by 64 grid

  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  # Rounded square background.
  $r    = 14 * $s
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc(0, 0, $r*2, $r*2, 180, 90)
  $path.AddArc($size - $r*2, 0, $r*2, $r*2, 270, 90)
  $path.AddArc($size - $r*2, $size - $r*2, $r*2, $r*2, 0, 90)
  $path.AddArc(0, $size - $r*2, $r*2, $r*2, 90, 90)
  $path.CloseFigure()
  $g.FillPath((New-Object System.Drawing.SolidBrush $green), $path)

  $brush = New-Object System.Drawing.SolidBrush $gold
  $pen   = New-Object System.Drawing.Pen $gold, (4.5 * $s)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

  # Handle: down from the top left, then along under the basket.
  $g.DrawLines($pen, @(
    (New-Object System.Drawing.PointF (12*$s), (16*$s)),
    (New-Object System.Drawing.PointF (17*$s), (16*$s)),
    (New-Object System.Drawing.PointF (21.5*$s), (34*$s)),
    (New-Object System.Drawing.PointF (46*$s), (34*$s))
  ))

  # Basket.
  $g.FillPolygon($brush, @(
    (New-Object System.Drawing.PointF (20*$s),   (20*$s)),
    (New-Object System.Drawing.PointF (52*$s),   (20*$s)),
    (New-Object System.Drawing.PointF (48.5*$s), (33*$s)),
    (New-Object System.Drawing.PointF (23.5*$s), (33*$s))
  ))

  # Wheels.
  $g.FillEllipse($brush, (22.5*$s), (38.5*$s), (7*$s), (7*$s))
  $g.FillEllipse($brush, (40.5*$s), (38.5*$s), (7*$s), (7*$s))

  $out = Join-Path $root "$name.png"
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

  $pen.Dispose(); $brush.Dispose(); $g.Dispose(); $bmp.Dispose()
  Write-Output "$name.png  ${size}x${size}"
}

Write-Output "Done."
