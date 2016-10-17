'use strict';

module.exports = {
  template: require('./upload-pic-form.html'),
  controller: ['$log', 'picService',  UploadPicFormController],
  controllerAs: 'uploadPicFormCtrl',
  bindings: {
    gallery: '=',
  },
};

function UploadPicFormController($log, picService){
  $log.log('init uploadPicFormCtrl');
  this.pic = {};
  this.uploadPic = function(){
    $log.debug('uploadPicFormCtrl.uploadPic()');
    picService.uploadGalleryPic(this.gallery, this.pic);
  };
}
