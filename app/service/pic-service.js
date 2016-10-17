'use strict';

module.exports = ['$log', '$http', '$window', 'Upload', 'authService', PicService];

function PicService($log, $http, $window, Upload, authService){
  $log.log('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('picService.uploadPic');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      };

      return Upload.upload({
        url,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.image,
        },
        headers,
      });
    })
    .then(res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return err;
    });
  };

  service.deleteGalleryPic = function(galleryData, picData){
    $log.debug('picService.deleteGalleryPic');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      };

      return $http.delete(url, config);
    })
    .then(res => {
      galleryData.pics.forEach((pic, index) => {
        if (pic === picData)
          galleryData.pics.splice(index, 1);
      });
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return err;
    });
  };

  return service;
}
