'use strict';

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', 'galleryService', GalleryLIController],
  controllerAs: 'galleryLICtrl', 
  bindings: {
    gallery: '<',
    select: '&',
    doneDelete: '&',
  },
};

function GalleryLIController($log, galleryService){
  $log.log('init galleryService');
  this.deleteGallery = function(){
    $log.debug('galleryLICtrl.deleteGallery');
    galleryService.deleteGallery(this.gallery);
    this.doneDelete({gallery: this.gallery});
  };
}
