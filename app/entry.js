'use strict';


require('./sass/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const ngRoute = require('angular-route');
const ngFileUpload = require('ng-file-upload');
const slugram = angular.module('slugram', [ngRoute, ngFileUpload]);

// load config
let context = require.context('./config/', true, /.js$/);
context.keys().forEach( path => {
  slugram.config(context(path));
});

// load view controllers
context = require.context('./view/', true, /.js$/);
context.keys().forEach( key => {
  let name = pascalcase(`${path.basename(key, '.js')}Controller`);
  slugram.controller(name, context(key));
});

// load services 
context = require.context('./service/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(`${path.basename(key, '.js')}`);
  slugram.service(name, context(key));
});

// load components 
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(`${path.basename(key, '.js')}`);
  console.log('loading component', name);
  slugram.component(name, context(key));
});
