'use strict';

module.exports = {
  template: require('./gallery-thumb.html'),
  controller: ['$log', '$http', GalleryThumbController],
  controllerAs: 'galleryThumbCtrl',
  bindings: {
    image: '=',
  },
};

function GalleryThumbController($log, $http){
  $log.log('init galleryThumbCtrl');
}
