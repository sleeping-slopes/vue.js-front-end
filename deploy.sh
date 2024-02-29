
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:sleeping-slopes/vue.js-front-end.git master:gh-pages

cd -