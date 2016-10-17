'use strict';

module.exports = ['$log', 'authService', '$location', LoginController];

function LoginController($log, authService, $location){
  $log.log('init loginCtrl');
  this.user = {};

  authService.getToken()
  .then(() => $location.path('/home'))

  this.login = function(){
    $log.log('loginCtrl.login()');
    authService.login(this.user)
    .then(() => {
      $location.path('/home');
    })
    .catch(err => {
      $log.error(err);
    });
  };
}
