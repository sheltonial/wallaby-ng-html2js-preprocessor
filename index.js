var util = require('util');

var TEMPLATE = 'angular.module(\'%s\', []).run(function($templateCache) {\n' +
  '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
  '});\n';

var SINGLE_MODULE_TPL = '(function(module) {\n' +
  'try {\n' +
  '  module = angular.module(\'%s\');\n' +
  '} catch (e) {\n' +
  '  module = angular.module(\'%s\', []);\n' +
  '}\n' +
  'module.run(function($templateCache) {\n' +
  '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
  '});\n' +
  '})();\n';

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

var transform = function(file, config) {
  config = typeof config === 'object' ? config : {};

  var moduleName = config.moduleName;
  var stripPrefix = new RegExp('^' + (config.stripPrefix || ''));
  var prependPrefix = config.prependPrefix || '';
  var stripSufix = new RegExp((config.stripSufix || '') + '$');
  var cacheIdFromPath = config && config.cacheIdFromPath || function(filepath) {
      return prependPrefix + filepath.replace(stripPrefix, '').replace(stripSufix, '');
    };

  var htmlPath = cacheIdFromPath(file.path);

  if (!/\.js$/.test(file.path)) {
    file.rename(file.path += '.js');
  }

  if (moduleName) {
    return util.format(SINGLE_MODULE_TPL, moduleName, moduleName, htmlPath, escapeContent(file.content));
  } else {
    return util.format(TEMPLATE, htmlPath, htmlPath, escapeContent(file.content));
  }
};

module.exports = {
  transform: transform
};