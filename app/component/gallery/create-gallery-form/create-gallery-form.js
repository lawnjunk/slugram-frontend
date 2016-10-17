'use strict';

module.exports = {
  template: require('./create-gallery-form.html'),
  controller: ['$log', 'galleryService', CreateGalleryFormController],
  controllerAs: 'createGalleryFormCtrl',
  bindings: {
    done: '&',
  },
};

function CreateGalleryFormController($log, galleryService){
  $log.log('init createGalleryFormCtrl');
  this.gallery = {};
  this.createGallery = function(){
    galleryService.createGallery(this.gallery)
    .then(res => {
      this.done(res.data);
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
