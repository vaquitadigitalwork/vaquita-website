# Build Script for Vaquita Next.js -> Flask
param (
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

# Setup PATH for Node.js if needed
$env:Path += ";C:\Program Files\nodejs"

$FrontendDir = Join-Path $PSScriptRoot "frontend"
$FlaskStaticDir = Join-Path $PSScriptRoot "static"
$FlaskTemplatesDir = Join-Path $PSScriptRoot "templates"

if (-not $SkipBuild) {
    Write-Host ">>> Building Next.js application in $FrontendDir..." -ForegroundColor Cyan
    Push-Location $FrontendDir
    try {
        npm run build
    } finally {
        Pop-Location
    }
}

Write-Host ">>> Exporting files into Flask structures..." -ForegroundColor Cyan

# 1. Clean existing frontend files in templates & static
Write-Host "Cleaning templates & static folders..." -ForegroundColor Yellow
$Pages = @("index.html", "about.html", "services.html", "portfolio.html", "pricing.html", "testimonials.html", "faq.html", "contact.html")
foreach ($page in $Pages) {
    $target = Join-Path $FlaskTemplatesDir $page
    if (Test-Path $target) {
        Remove-Item $target -Force
    }
}

# Remove any old static next assets
$NextStatic = Join-Path $FlaskStaticDir "_next"
if (Test-Path $NextStatic) {
    Remove-Item $NextStatic -Recurse -Force
}

# 2. Copy Next.js static exported pages to templates/
$NextOutDir = Join-Path $FrontendDir "out"
if (-not (Test-Path $NextOutDir)) {
    Write-Error "Next.js output directory 'out' does not exist! Build failed."
}

Write-Host "Copying pages to templates/..." -ForegroundColor Green
Copy-Item (Join-Path $NextOutDir "index.html") (Join-Path $FlaskTemplatesDir "index.html") -Force
Copy-Item (Join-Path $NextOutDir "about.html") (Join-Path $FlaskTemplatesDir "about.html") -Force
Copy-Item (Join-Path $NextOutDir "services.html") (Join-Path $FlaskTemplatesDir "services.html") -Force
Copy-Item (Join-Path $NextOutDir "portfolio.html") (Join-Path $FlaskTemplatesDir "portfolio.html") -Force
Copy-Item (Join-Path $NextOutDir "pricing.html") (Join-Path $FlaskTemplatesDir "pricing.html") -Force
Copy-Item (Join-Path $NextOutDir "testimonials.html") (Join-Path $FlaskTemplatesDir "testimonials.html") -Force
Copy-Item (Join-Path $NextOutDir "faq.html") (Join-Path $FlaskTemplatesDir "faq.html") -Force
Copy-Item (Join-Path $NextOutDir "contact.html") (Join-Path $FlaskTemplatesDir "contact.html") -Force

# 3. Copy _next assets to static/
Write-Host "Copying Next assets to static/..." -ForegroundColor Green
$OutNext = Join-Path $NextOutDir "_next"
if (Test-Path $OutNext) {
    Copy-Item $OutNext $FlaskStaticDir -Recurse -Force
}

# 4. Modify paths in templates from '/_next/' to '/static/_next/' so Flask serves them correctly
Write-Host "Modifying assets paths inside exported HTML pages..." -ForegroundColor Cyan
foreach ($page in $Pages) {
    $targetPath = Join-Path $FlaskTemplatesDir $page
    if (Test-Path $targetPath) {
        $content = Get-Content $targetPath -Raw
        
        # Replace "/_next/" with "/static/_next/"
        $content = $content -replace '"/_next/', '"/static/_next/'
        $content = $content -replace "`'/_next/", "`'/static/_next/"
        
        Set-Content $targetPath $content -NoNewline
    }
}

Write-Host ">>> BUILD AND EXPORT PIPELINE SUCCESSFUL! <<<" -ForegroundColor Green
