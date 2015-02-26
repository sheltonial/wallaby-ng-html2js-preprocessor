# wallaby-ng-html2js-preprocessor
 Wallaby.js preprocessor to compile AngularJS templates to JavaScript.

#Configuration:

```js
// wallaby.conf.js
module.exports = function () {
    return {
        files: [
            'app/**/*.js',
            'app/**/*.html'
         ],
         tests: [
             'tests/**/*.js'
         ],
        preprocessors: {
            'app/**/*.html': function(file) {
                return require('wallaby-ng-html2js-preprocessor').transform(file, {
                    // strip this from the file path
                    stripPrefix: 'public/',
                    stripSufix: '.ext',
                    // prepend this to the
                    prependPrefix: 'served/',

                    // or define a custom transform function
                    cacheIdFromPath: function(filepath) {
                    return cacheId;
                    },

                    // setting this option will create only a single module that contains templates
                    // from all the files, so you can load them all with module('foo')
                    moduleName: 'foo'
                })
            }
        }
    }
}
```

#How does it work ?

This preprocessor converts HTML files into JS strings and generates Angular modules. These modules, when loaded, puts these HTML files into the $templateCache and therefore Angular won't try to fetch them from the server.