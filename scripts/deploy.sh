#!/bin/sh
# Build and publish dist/ to the gh-pages branch (GitHub Pages serves it).
set -e
cd "$(dirname "$0")/.."
npm run build
touch dist/.nojekyll
rm -rf dist/.git
git -C dist init -q -b gh-pages
git -C dist add -A
git -C dist -c user.name="Yaron Sole" -c user.email="Yaron.Sole@fanatics.live" commit -qm deploy
git -C dist push -f https://github.com/yaronsole/fresh-cart.git gh-pages
rm -rf dist/.git
echo "Deployed: https://yaronsole.github.io/fresh-cart/"
