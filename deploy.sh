#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'dev deploy'

git push -f git@github.com:JCCG-code/tripshot_vue_frontend.git develop:gh-pages

cd -
