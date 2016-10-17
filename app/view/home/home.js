'use strict';

module.exports = ['$log', '$location', 'authService', 'galleryService', HomeController];
function HomeController($log, $location, authService, galleryService){
  $log.log('init homeCtrl');
  this.currentGallery = {};

  authService.getToken()
  .catch(() => {
    $location.path('/signup'); 
  });

  this.fetchUserGallerys = function(){
    galleryService.fetchUserGallerys()
    .then(() => {
      this.userGalleries = galleryService.userGalleries;
      this.currentGallery = this.userGalleries[0];
      let galleryID = $location.search().galleryID;
      if (galleryID){
        for (let i=0; i<this.userGalleries.length; i++){
          let gallery = this.userGalleries[i];
          if (gallery._id === galleryID){
            return this.currentGallery = gallery;
          }
        }
        $location.search('galleryID', this.currentGallery._id);
      }
    });
  };

  this.fetchUserGallerys();

  this.logout = function(){
    authService.logout()
    .then(() => $location.path('/login'));
  };
  
  this.selectGallery = function(galleryData){
    $log.debug('homeCtrl.selectGallery');
    $location.search('galleryID', galleryData._id);
    this.currentGallery = galleryData;
  };

  this.deleteGallery = function(galleryData){
    if (galleryData._id === this.currentGallery._id){
      for(var i=0; i< this.userGalleries.length; i++){
        if(galleryData._id !== this.userGalleries[i]._id){
          return this.currentGallery = this.userGalleries[i];
        }
      }
      this.currentGallery = {};
    }
  };
}
