<script>

import store from '../../store';
import { getVideoIdAndClassification, checkParentalControl } from '../../services';

export default {
  props: {
    data: {
      itemid: String,
      path: String,
      isBonusFeatures: {
        type: Boolean,
        default: false
      },
      isLiveStream: {
        type: Boolean,
        default: false
      },
      fullData: {
        type: Object,
        default: {}
      }
    }
  },
  mounted() {

  },
  beforeCreate() {
    // console.log('Actions beforeCreate');
  },
  computed: {
    isLogged: function() {
      return store.state.userData.isLogged;
    },
    canStream: function() {
      return store.state.userData.canStream;
    },
    fullData: function() {
      return this.item.fullData;
    },
    trailer: function() {
      let trailer = '';
      if (this.data.isDetail === 'true') {
        if (this.data.hasOwnProperty('fullData')) {
          if (Object.prototype.hasOwnProperty.call(this.data.fullData, 'show')) {
            if (Object.prototype.hasOwnProperty.call(this.data.fullData.show, 'trailers')) {
              if (this.data.fullData.show.trailers.length > 0) {
                trailer = this.data.fullData.show.trailers[0];
              }
            }
          }
        }
      }
      return trailer;
    },
    isTrailer: function() {
      let trailer = false;

      if (this.data.isDetail === 'true') {
        if (this.data.hasOwnProperty('fullData')) {
          if (Object.prototype.hasOwnProperty.call(this.data.fullData, 'show')) {
            if (Object.prototype.hasOwnProperty.call(this.data.fullData.show, 'trailers')) {
              if (this.data.fullData.show.trailers.length > 0) {
                trailer = true;
              }
            }
          }
        }
      }

      return trailer;
    }
  },
  methods: {
    showVideoNext: function(event) {
      if (event != null) {
        event.preventDefault();
      }


      // console.log('NEXT.VUE => showVideo', this.data);

      if (this.isLogged && this.canStream) {
        //Bonus features open the video without restriction
        if (this.data.isBonusFeatures) {
          // console.log('this.data.isBonusFeatures = true');
          $('.modal-overlay, .modal').addClass('active');
          $('body').addClass('overflow');
          // Open Video Player
          global.buildVideo(this.data.fullData.id);
        } else if (this.trailer !== '') {
          // console.log('this.trailer = true');
          // Its a trailer
          $('.modal-overlay, .modal').addClass('active');
          $('body').addClass('overflow');
          // Open Video Player
          global.buildVideo(this.trailer.id, true);
        } else if (this.data.isLiveStream) {
          // console.log('IS live strream VIDEO');
          // Its a trailer
          $('.modal-overlay, .modal').addClass('active');
          $('body').addClass('overflow');
          // Open Video Player

          global.buildVideo(this.data.itemid);

          // global.buildVideo('p01rnrb6');
        } else {
          // SET VIDEO ID AND CLASIFICATION NAME => From Services/index.js
          getVideoIdAndClassification(this.data.fullData).then(
            values => {

             // console.log('NEXT.VUE => showVideo => getVideoIdAndClassification', values);

              // getVideoIdAndClassification => Sometimes return Shows without videoId and Classification
              if (values.suggestionType === 'None') {
                window.location.href = '/' + global.Country + this.data.fullData.path;
              } else if (
                values.type === 'show' ||
                values.type === 'season' ||
                values.type === 'program'
              ) {
                window.location.href = '/' + global.Country + values.path;
              } else {
                if (store.state.userData.parentalControl) {
                  //Check ParentalCotrol => From Services/index.js
                  checkParentalControl(values.classification).then(response => {
                    // If can play just open de player
                    if (response.canStream) {

                     // console.log('NEXT.VUE => showVideo => getVideoIdAndClassification => response.canStream = true');
                      $('.modal-overlay, .modal').addClass('active');
                      $('body').addClass('overflow');
                      // Open Video Player

                      global.buildVideo(values.videoId);
                    } else {

                      // console.log('NEXT.VUE => showVideo => getVideoIdAndClassification => response.canStream = false');
                      // console.log('NEXT.VUE => showVideo => getVideoIdAndClassification => SHOW MODAL');

                      // if not,  show the modal to add the pin
                      this.$modal.show('modal-Logged-parental-control', {
                        videoId: values.videoId,
                        isNextVideo: true
                      });
                    }
                  });
                } else {
                  // PARENTAL CONTROL NOT ACTIVATED. JUST OPEN THE PLAYER
                  // console.log('NEXT.VUE => showVideo => getVideoIdAndClassification => store.state.userData.parentalControl = false');
                  $('.modal-overlay, .modal').addClass('active');
                  $('body').addClass('overflow');

                  // Open Video Player
                  global.buildVideo(values.videoId);
                }
              } // END if (store.state.userData.parentalControl)
            } // END if (values.type !== 'episode') {
          ); // END getVideoIdAndClassification(this.data.fullData).then(values => {
        }
      }
    }



  },
  created() {

 

  }
};
</script>

<template>
  <fragment>

  </fragment>
</template>
