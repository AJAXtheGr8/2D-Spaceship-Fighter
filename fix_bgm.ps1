$content = Get-Content "D:\CODING\WebDev Projects\Qwen - 2D SpaceFighter\client\src\components\Game.jsx" -Raw
$content = $content -replace "startBgm\('ambient'\)", "startBgm()"
[System.IO.File]::WriteText("D:\CODING\WebDev Projects\Qwen - 2D SpaceFighter\client\src\components\Game.jsx", $content)
