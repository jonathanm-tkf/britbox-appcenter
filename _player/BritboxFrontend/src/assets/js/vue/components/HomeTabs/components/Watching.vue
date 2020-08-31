<script>
  // import animationDataContinue from '../../../../../animations/continue.json';
  // import animationDataPlay from '../../../../../animations/play.json';
  import { uuid } from '../../../../lib/global';
  import { calculateSizeImage, getPathURL, getUrlImageStatic } from '../../../../lib/global';
  import store from '../../../store';
  import { BritboxAccountApi } from '../../../../lib/sdk';
  import { getVideoIdAndClassification, checkParentalControl } from '../../../services';

  export default {
    props: {
      data: {
        top: String,
        title: String,
        classification: String,
        progress: Number
      },
      imageType: {
        type: String,
        default: 'wallpaper'
      },
      hideRemove: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'continue'
      }
    },
    data() {
      return {
        hover: false,
        animationSpeed: 1
        // animationDataPlay,
        // animationDataContinue
      };
    },
    computed: {
      urlLanding: function () {
        if (this.data.type === 'episode' || this.data.type === 'movie') {
          let path = this.data.path === undefined ? null : getPathURL(this.data.path);
          if (path !== null) {
            return path + '?autoplay=true';
          }
        } else {
          return this.data.path === undefined ? null : getPathURL(this.data.path);
        }
      },
      isContinueWatching: function () {
        return this.checkIsContinueWatching();
      },
      isLogged: function () {
        return store.state.userData.isLogged;
      },
      canStream: function () {
        return store.state.userData.canStream;
      },
      uuid: function () {
        return uuid();
      },
      top: function () {
        return this.data.type === 'episode'
          ? `${this.data.seasonTitle} - ${this.data.episodeName}`
          : this.data.type;
      },
      title: function () {
        return this.data.type === 'episode' ? this.data.showTitle : this.data.title;
      },
      isHD: function () {
        const hd = this.data?.customFields?.HDFlag && this.data.customFields.HDFlag === 'True' ? 1 : 0;
        return Boolean(hd);
      },
      isCC: function () {
        const cc = this.data?.customFields?.CCFlag && this.data.customFields.CCFlag === 'True' ? 1 : 0;
        return Boolean(cc);
      },
      classification: function () {
        return this.data?.classification?.name || '';
      },
      offer: function () {
        return this.data.offers.length > 0 ? this.data.offers.reduce(item => item).resolution : null;
      },
      progress: function () {
        return (parseInt(this.data.position) * 100) / parseInt(this.data.duration);
      },
      minutes: function () {
        return Math.round((parseInt(this.data.duration) - parseInt(this.data.position)) / 60);
      },
      image: function () {
        if (this.isContinue) {
          return typeof this.data.images !== 'undefined'
            ? calculateSizeImage(this.data.images[this.imageType], this.imageType)
            : '';
        }
        else {
          return typeof this.data.images !== 'undefined'
            ? calculateSizeImage(this.data.images['tile'], 'tile')
            : '';
        }
      },
      isBadgeAvailable: function () {
        const badge = this.data?.badge;
        return typeof badge !== 'undefined';
      },
      badge: function () {
        const badge = this.data?.badge;
        return badge;
      },
      isContinue: function () {
        return this.type === 'continue';
      },
      isLogged: function () {
        return store.state.userData.isLogged;
      },
      animation() {
        return this.$refs.animation;
      },
      contentType() {
        return this.data.type;
      }
    },
    methods: {
      play: function () {
        // REMOVED TO TEST PERFORMANCE - Need to create and detroy when used.
        // if (!this.hover) {
        //  this.hover = true;
        //  setTimeout(() => {
        //    if (this.animation) {
        //      this.animation.goToAndStop(0);
        //      this.animation.play();
        //    }
        //  }, 300);
        // }
      },
      resetAnimation: function () {
        // REMOVED TO TEST PERFORMANCE - Need to create and detroy when used.
        // this.hover = false;
        //  setTimeout(() => {
        //    if (this.animation) {
        //       console.log('reset animation');
        //      this.animation.stop();
        //    }
        //  }, 300);
      },
      showVideo: function (event) {
        event.preventDefault();
        if (this.isLogged && this.canStream) {
          // SET VIDEO ID AND CLASIFICATION NAME => From Services/index.js
          getVideoIdAndClassification(this.data).then(
            values => {
              // getVideoIdAndClassification => Sometimes return Shows without videoId and Classification
              if (values.type === 'show' || values.type === 'season' || values.type === 'program') {
                window.location.href = '/' + global.Country + values.path;
              } else {
                if (store.state.userData.parentalControl) {
                  // Check ParentalCotrol => From Services/index.js
                  checkParentalControl(values.classification).then(response => {
                    // If can play just open de player
                    if (response.canStream) {
                      $('.modal-overlay, .modal').addClass('active');
                      $('body').addClass('overflow');
                      // Open Video Player
                      global.buildVideo(values.videoId);
                    } else {
                      // if not,  show the modal to add the pin
                      this.$modal.show('modal-Logged-parental-control', { videoId: values.videoId });
                    }
                  });
                } else {
                  // PARENTAL CONTROL NOT ACTIVATED. JUST OPEN THE PLAYER

                  $('.modal-overlay, .modal').addClass('active');
                  $('body').addClass('overflow');

                  // Open Video Player
                  global.buildVideo(values.videoId);
                }
              } // END if (values.type !== 'episode') {
            } // END if (store.state.userData.parentalControl)
          ); // END getVideoIdAndClassification(this.data).then(values => {
        } else if (this.isLogged && !this.canStream) {
          // LOGGED BUT Can't Stream . No subscription Active (Payment, no plan selected or Trial Expired)
          // this.$modal.show('modal-Logged-NOTcanStream');

          var path = window.location.pathname;
          var querystring = window.location.search;
          window.location.href = getPathURL('/account/SelectPlan?returnURL=' + path + querystring);
        } else {
          // USER NOT LOGGED
          this.$modal.show('modal-login');
        }

        //if (this.isLogged) {
        //  $('.modal-overlay, .modal').addClass('active');
        //  global.buildVideo(this.data.id);
        //} else {
        //  this.$modal.show('modal-login');
        //}
      },
      actionBookmarkList: function () {
        this.isInWatchingList = 2; // Loading

        // Callback from Remove Items
        const callback = (error, data, response) => {
          if (error) {
            this.isInWatchingList = 4; // Loading
            console.error(error);
          } else {
            this.isInWatchingList = 1;

            if (this.isContinue) {
              // Update store when remove from continue Watching
              store.commit('removeContinueWatching', { id: this.data.id });
            } else {
              // Update store when remove from Watchlist
              store.commit('removeBookmark', { id: this.data.id });
            }
          }
        };

        // Remove items from SWIPER
        const opts = {
          segments: [global.Country]
        };

        const apiInstance = new BritboxAccountApi.ProfileApi();
        if (this.isContinue) {
          // Remove continue watching item
          apiInstance.deleteWatched(
            {
              request: { ItemIds: [this.data.id] },
              segments: [global.Country]
            },
            callback
          );
        } else {
          // Remove Watchlist item
          apiInstance.deleteItemBookmark(this.data.id, opts, callback);
        }
      },
      checkIsContinueWatching: function () {
        if (typeof store.state.userData.watchedList !== 'undefined') {
          if (this.data.type === 'season' || this.data.type === 'show') {
            let showIdToUse = 0;
            // To make hero of home and detail work
            if (this.data.type === 'episode' || this.data.type === 'season') {
              showIdToUse = this.data.showId;
            } else if (this.data.type === 'show') {
              showIdToUse = this.data.id;
            } else {
              showIdToUse = itemid;
            }

            const watcheditem = store.state.userData.watchedList.items.filter(
              item => parseInt(item.showId, 10) === parseInt(showIdToUse, 10)
            );

            if (watcheditem.length > 0) {
              return true;
            } else {
              return false;
            }
          }
          else if (this.data.type === 'movie') {
            const watcheditem = store.state.userData.watchedList.items.filter(
              item => parseInt(item.id, 10) === parseInt(this.data.id, 10)
            );

            if (watcheditem.length > 0) {
              return true;
            } else {
              return false;
            }
          }

        } else {
          // console.log('NO FULL DATA AVAILABLE');

          // NO FULL DATA AVAILABLE => Return always false.
          return false;


        }
        return false;



      }
    }
  };
</script>

<template>
  <div class="card" @mouseover="play" @mouseleave="resetAnimation">
    <div class="ribbon Blue-normal" v-if="isBadgeAvailable">{{badge}}</div>

    <div class="image pulsate">
      <img class="b-lazy" :data-src="image" />
      <div class="bar" v-if="isContinue || (isContinueWatching && contentType === 'movie')">
        <div class="color-bar" :style="{width: `${progress}%`}"></div>
      </div>
    </div>
    <div class="info-text" v-if="isContinue">
      <span class="bold">{{title}}</span>
      <span>{{top}}</span>
    </div>
    <div class="layer-dark"></div>
    <div class="card-content">
      <div class="card-content-inside">
        <div class="top-animation">
          <a :href="urlLanding">
            <span class="continue-animation">
              <img v-show="!isContinueWatching && !isContinue" src="/content/img/action-svg/play_now.svg" />
              <img v-show="isContinueWatching || isContinue" src="/content/img/action-svg/continue_watching.svg" />
            </span>
            <fragment v-if="isContinue">Continue watching · {{minutes}} min left</fragment>
            <fragment v-else-if="isContinueWatching && !isContinue && contentType === 'movie'">Continue watching · {{minutes}} min left</fragment>
            <fragment v-else-if="isContinueWatching && !isContinue && contentType !== 'movie'">Continue watching</fragment>
            <fragment v-else>Play now</fragment>
          </a>
        </div>
        <div class="bottom">
          <div class="text">
            <!-- <div class="top">{{ top }}</div>
            <div class="title">{{ title }}</div>-->
            <slot></slot>

            <ul class="tags">
              <li class="outline" v-if="classification">{{ classification }}</li>
              <li class="outline" v-if="isCC">CC</li>
              <li class="primary" v-if="isHD">HD</li>
            </ul>
          </div>
          <button class="close" v-if="!hideRemove" @click="actionBookmarkList">
            <i class="icon-close"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
