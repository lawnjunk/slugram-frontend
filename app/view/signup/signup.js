'use strict';

module.exports = ['$log', 'authService', '$location', SignupController];

function SignupController($log, authService , $location){
  $log.log('init signupCtrl');
  this.user = {};

  authService.getToken()
  .then(() => $location.path('/home'))

  this.signup = function(){
    $log.log('signupCtrl.signup()');
    authService.signup(this.user)
    .then(() => {
      $location.path('/home');
    })
    .catch(err => {
      $log.error(err);
    });
  };
}
