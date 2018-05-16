# Code analyzer

Tool to provide a static code analyzing of your application, based on standard or classical linter configuration

[![NPM version](https://badge.fury.io/js/code-analyzer.svg)](http://badge.fury.io/js/node-code-analyzer)
[![Build Status](https://travis-ci.org/rochejul/code-analyzer.svg?branch=master)](https://travis-ci.org/rochejul/code-analyzer)[![Dependency Status](https://david-dm.org/rochejul/code-analyzer.svg)](https://david-dm.org/rochejul/code-analyzer)
[![dependencies Status](https://david-dm.org/rochejul/code-analyzer/status.svg)](https://david-dm.org/rochejul/code-analyzer)
[![devDependency Status](https://david-dm.org/rochejul/code-analyzer/dev-status.svg)](https://david-dm.org/rochejul/code-analyzer#info=devDependencies)
[![NPM Downloads](https://img.shields.io/npm/dm/code-analyzer.svg)](https://www.npmjs.org/package/node-code-analyzer)
[![Known Vulnerabilities](https://snyk.io/test/github/rochejul/code-analyzer/badge.svg)](https://snyk.io/test/github/rochejul/code-analyzer)
[![codecov](https://codecov.io/gh/rochejul/code-analyzer/branch/master/graph/badge.svg)](https://codecov.io/gh/rochejul/code-analyzer)
[![bitHound Code](https://www.bithound.io/github/rochejul/code-analyzer/badges/code.svg)](https://www.bithound.io/github/rochejul/code-analyzer)
[![bitHound Overall Score](https://www.bithound.io/github/rochejul/code-analyzer/badges/score.svg)](https://www.bithound.io/github/rochejul/code-analyzer)

# How to install it?

## Globally

````
> npm install -g node-code-analyser
````

And to run it:

````
> code-analyser
````

## Locally

````
> npm install --save-dev --save-exact node-code-analyser
````

Extends your package.json like so:

````json
{
  "scripts": {
    "analyze": "node ./node_modules/node-code-analyzer/bin/code-analyzer"
  }
}
````

And to run it:

````
> npm run analyze
````

# How to use it?

````
    Usage
      $ code-analyzer

    Basically, if no option is provided, the tool will analyze the content of the folders:
        - app
        - bin
        - lib
        - src

    Options
      --help, -h  Display the documentation associated to this command
      --init, -i  Display a prompter to setup the code analyzer for your project. If you have persisted the configuration, you could reuse it to edit it
      --version   Display the version of the tool

    Examples
      $ code-analyzer
      $ code-analyzer --help
      $ code-analyzer --init
      $ code-analyzer --version

````

In you have installed it locally, you could do:

````
    Examples
      $ npm run analyze
      $ npm run analyze -- --help
      $ npm run analyze -- --init
      $ npm run analyze -- --version

````

# If you run "code-analyzer" without options

The tool will first have a look if a *.code-analyzerrc* file is present and use it, to know for examples in which folders we should run the analyze, or the report format.
Otherwise, the default behavior will be to report into the console and to run the analyze into the following folders (which are common name of folders): app, bin, lib, src

# The "init" option

This option allowed you to define the following options:

 - The base directories to run the analyze (per default, bower_components, node_modules and folder which starts with '.' are ignored)
 - The report format (console, json, html)
 - The report path (if json and html was choosed). If not specified, a temporary file will be generated and the path will be prompted
 - If we want to save into the file .code-analyzerrc the current configuration
 
If you run the init method when you have a *.code-analyzerrc*, you will be in an "edit mode" and so change the configuration
