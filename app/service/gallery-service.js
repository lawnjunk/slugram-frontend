'use strict';

module.exports = ['$log', '$http', 'authService', galleryService];

function galleryService($log, $http, authService){
  $log.log('init galleryService');

  let service = {};
  service.userGalleries = [];

  service.createGallery = function(galleryData){
    $log.log('galleryService.createGallery()');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.post(url, galleryData, config)
      .then( res => {
        service.userGalleries.unshift(res.data);
        return res.data;
      })
      .catch( err => {
        $log.error(err.message);
        return err;
      });
    });
  };

  service.fetchUserGallerys = function(){
    $log.log('galleryService.fetchUserGallerys()');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config)
      .then(res => {
        // clear out the array and then fill it up
        // to preserve the reference
        let userGalleries = service.userGalleries;
        userGalleries.splice(0, userGalleries.length);
        userGalleries.push.apply(userGalleries, res.data);
        console.log('res.data\n', service.userGalleries);
        return res.data;
      })
      .catch( err => {
        $log.error(err.message);
        return err;
      });
    });
  };

  service.deleteGallery = function(galleryData){
    $log.log('galleryService.deleteGallery()');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config)
      .then(() => {
        // remove gallery from userGalleries
        service.userGalleries.forEach((gallery, index) => {
          if (gallery === galleryData)
            service.userGalleries.splice(index, 1);
        });
        return true;
      })
      .catch( err => {
        $log.error(err.message);
        return err;
      });
    });
  };

  return service;
}
