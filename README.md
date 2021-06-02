
## Webpack parse json error
Related to [issues/13292](https://github.com/webpack/webpack/issues/13292)
````
ERROR in ./node_modules/emoji-mart/data/all.json 1:13
Module parse failed: Unexpected token (1:13)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
````
Webpack can't parse the json from the emoji-mart module

## How to throw the error?
1. run `npm install`
2. run `npm run prod` or `npm run dev` . I don't know why but it takes like 5 minutes to finish and show the error.

## How to fix it?
In the webpack/webpack.config.js uncomment the json loader code (line 110-113).
Now you can run `npm run dev` or `npm run prod` without errors