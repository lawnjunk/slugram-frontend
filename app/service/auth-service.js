'use strict'

module.exports = ['$q', '$log', '$http', '$window', AuthService];

function AuthService($q, $log, $http, $window){
  let service =  {};
  let token = null;

  function setToken(_token) {
    $log.debug('authService.setToken');
    if (!_token) return $q.reject(new Error('no token'));
    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function(){
    $log.debug('authService.getToken');
    if (token) return $q.resolve(token);
    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout');
    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  service.signup = function(user){
    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    return $http.post(url, user, config)
    .then( res => {
      $log.info('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('failure', err);
      return $q.reject(err);
    });
  };

  service.login= function(user){
    $log.debug('authService.login');
    let url = `${__API_URL__}/api/login`;
    let authString = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
    };
    return $http.get(url, config)
    .then( res => {
      $log.info('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('failure', err);
      return $q.reject(err);
    });
  };

  return service;
}

