'use strict';

module.exports = ['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    redirectTo: '/signup',
  })
  .when('/signup', {
    template: require('../view/signup/signup.html'),
    controller: 'SignupController',
    controllerAs: 'signupCtrl',
  })
  .when('/login', {
    template: require('../view/login/login.html'),
    controller: 'LoginController',
    controllerAs: 'loginCtrl',
  })
  .when('/home', {
    template: require('../view/home/home.html'),
    controller: 'HomeController',
    controllerAs: 'homeCtrl',
    reloadOnSearch: false,
  })
  .otherwise({
    template: require('../view/404/404.html'),
  });
}];
