'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    gallery: '<',
    pic: '<',
  },
};

function ThumbnailController($log, picService){
  $log.log('init thumnailCtrl');

  this.deletePic = function(){
    picService.deleteGalleryPic(this.gallery, this.pic);
  };
}
