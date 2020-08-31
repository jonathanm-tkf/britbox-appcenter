<script>
  // import playAnimation from '../../../../animations/play.json';
  // import animationDataTrailer from '../../../../animations/trailer.json';
  // import animationDataContinue from '../../../../animations/continue.json';
  // import animationDataPlay from '../../../../animations/play.json';

  import { getUrlImageStatic, getPathURL } from '../../../lib/global';
  import store from '../../store';
  import { BritboxAccountApi } from '../../../lib/sdk/';
  import { getVideoIdAndClassification, checkParentalControl } from '../../services';

  export default {
    props: {
      data: {
        itemid: String,
        path: String,
        isDetail: {
          type: Boolean,
          default: false
        },
        isEpisodeTabs: {
          type: Boolean,
          default: false
        },
        autoPlay: {
          type: Boolean,
          default: false
        },
        hideWatchlist: {
          type: Boolean,
          default: false
        },
        isBonusFeatures: {
          type: Boolean,
          default: false
        },
        isLiveStream: {
          type: Boolean,
          default: false
        },
        hideDiscover: {
          type: Boolean,
          default: false
        },
        hideMinLeft: {
          type: Boolean,
          default: false
        },
        forceContinueWatching: {
          type: Boolean,
          default: false
        },
        forceMinutes: {
          type: Number,
          default: 0
        },
        duration: {
          type: Number,
          default: 0
        },
        fullData: {
          type: Object,
          default: {}
        },
        actionClicked: {
          type: Boolean,
          default: false
        },
      },
      playNowText: {
        type: String,
        default: 'Play now'
      },
      continueWatchlingText: {
        type: String,
        default: 'Continue watching'
      },
      playTrailerText: {
        type: String,
        default: 'Watch Trailer'
      },
      hover: {
        type: Boolean,
        default: false
      },
      hoverType: {
        type: String,
        default: 'vue'
      }
    },
    mounted() {
      if (this.$el.parentNode.offsetParent) {
        let card = this.$el.parentNode.offsetParent;

        for (let index = 0; index < 3; index++) {
          if (card.classList.contains('card')) {
            this.hoverAnimation(card);
            break;
          } else {
            card = card.offsetParent;
          }
        }
      }
    },
    beforeCreate() {
      // console.log('Actions beforeCreate');
    },
    data() {
      return {
        animationSpeed: 1,
        loaded: false,
        // animationDataTrailer,
        // animationDataContinue,
        // animationDataPlay,
        isContinue: '',
        isInWatchingList: 1
      };
    },
    computed: {
      urlLanding: function () {
        return this.data.path === undefined ? null : getPathURL(this.data.path);
      },
      urlLandingWatch: function () {
        if (this.data.fullData.type === 'episode' || this.data.fullData.type === 'movie') {
          let path = this.data.path === undefined ? null : getPathURL(this.data.path);
          if (path !== null) {
            return path + '?autoplay=true';
          }
        }
        //else if (!this.isLogged && this.data.isDetail === 'true') {

        //  console.log('Not logged');

        //}
        else {
          return this.data.path === undefined ? null : getPathURL(this.data.path);
        }

        // return this.data.path === undefined ? null : getPathURL(this.data.path);
      },
      isLogged: function () {
        return store.state.auth.isLogged;
      },
      canStream: function () {
        return store.state.userData.canStream;
      },
      item: function () {
        if (typeof store.state.userData.watchedList === 'undefined') {
          return false;
        }
        const element = store.state.userData.watchedList.items.filter(
          item => Number(item.id) === Number(this.data.itemid)
        );
        return element.length > 0 ? element.reduce(item => item) : {};
      },
      watched: function () {
        if (typeof store.state.userData.watched === 'undefined') {
          return false;
        }
        const element = store.state.userData.watched.filter(
          item => Number(item.id) === Number(this.data.itemid)
        );
        return element.length > 0 ? element.reduce(item => item) : {};
      },
      minutes: function () {
        return Math.abs(
          Math.round((parseInt(this.item.duration || 0) - parseInt(this.watched.position)) / 60)
        );
      },
      duration: function () {
        return Math.round(parseInt(this.data.duration / 60));
      },
      fullData: function () {
        return this.item.fullData;
      },
      trailer: function () {
        // REMOVED TO TEST PERFORMANCE

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
      isTrailer: function () {
        let trailer = false;

        // REMOVED TO TEST PERFORMANCE
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
      },
      showButtonsPlayAndAddBookmark: function () {
        let visible = false;

        if (this.data.hasOwnProperty('fullData')) {
          if (
            this.data.fullData.type === 'show' ||
            this.data.fullData.type === 'episode' ||
            this.data.fullData.type === 'movie' ||
            this.data.fullData.type === 'season' ||
            this.data.fullData.type === 'program'
          ) {
            visible = true;
          }
        }

        return visible;
      },
      showButtonAddBookmark: function () {
        let visible = false;

        if (this.data.hasOwnProperty('fullData')) {
          if (this.data.fullData.type === 'show' || this.data.fullData.type === 'movie') {
            visible = true;
          }
        }

        // Hero
        if (this.data.isDetail) {
          visible = true;
        }

        return visible;
      },
      animationPlay() {
        return this.$refs.animationPlay;
      },
      animationContinue() {
        return this.$refs.animationContinue;
      },
      animationTrailer() {
        return this.$refs.animationTrailer;
      }
    },
    methods: {
      hoverAnimation(card) {
        // REMOVED TO TEST PERFORMANCE - Need to create and detroy when used.
        // if (this.hoverType !== 'vue') {
        //  $(card).hover(
        //    () => {
        //      if (this.isContinue) {
        //        setTimeout(() => {
        //          if (this.animationContinue) {
        //            this.animationContinue.goToAndStop(0);
        //            this.animationContinue.play();
        //          }
        //        }, 350);
        //      } else {
        //        if (this.animationPlay) {
        //          this.animationPlay.play();
        //        }
        //      }
        //    },
        //    () => {
        //      this.handleAnimationPause();
        //    }
        //  );
        // }
        //this.handleAnimationPause();
      },
      checkIsContinueWatching: function (itemid) {
        // TODO: Why is undefined ¿?

        // REMOVED TO TEST PERFORMANCE

        if (
          this.data.hasOwnProperty('fullData') &&
          typeof store.state.userData.watchedList !== 'undefined'
        ) {
          if (this.data.fullData.type === 'season' || this.data.fullData.type === 'show') {
            let showIdToUse = 0;
            // To make hero of home and detail work
            if (this.data.fullData.type === 'episode' || this.data.fullData.type === 'season') {
              showIdToUse = this.data.fullData.showId;
            } else if (this.data.fullData.type === 'show') {
              showIdToUse = this.data.fullData.id;
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
          } else {
            // If no FULL DATA IS AVAILABLE JUST CHECK EPISODE => FALLBACK
            const { duration } = this.item;
            return duration
              ? store.state.userData.watched.filter(item => parseInt(item.id) === parseInt(itemid))
                .length > 0
              : false;
          }
        } else {
          // console.log('NO FULL DATA AVAILABLE');

          // NO FULL DATA AVAILABLE => Return always false.
          return false;
        }
        return false;
      },
      checkIsInWatchingList: function (itemid) {
        if (store.state.userData.bookmarks?.length > 0) {
          return store.state.userData.bookmarks.filter(
            item => parseInt(item?.id) === parseInt(itemid)
          ).length > 0
            ? 3
            : 1;
        } else {
          return 1;
        }
      },
      handleAnimationPause() {
        if (this.isContinue) {
          if (this.animationContinue) {
            this.animationContinue.pause();
          }
        } else {
          if (this.animationPlay) {
            this.animationPlay.pause();
          }
        }
      },
      showVideo: function (event) {
        // QUICK FIX PREVENT MULTIPLE CLICKS
        if (!this.actionClicked) {
          this.actionClicked = true;

          // RESET CLICKED STATUS AFTER 5 SECONDS
          setTimeout(() => {
            this.actionClicked = false;
          }, 5000);


          if (event != null) {
            event.preventDefault();
          }

          if (this.isLogged && this.canStream) {
            // Bonus features open the video without restriction
            if (this.data.isBonusFeatures) {
              if (store.state.userData.parentalControl) {
                //Check ParentalCotrol => From Services/index.js
                if (this.data.fullData.classification) {
                  checkParentalControl(this.data.fullData.classification.name).then(response => {
                    // If can play just open de player
                    if (response.canStream) {
                      $('.modal-overlay, .modal').addClass('active');
                      $('body').addClass('overflow');
                      // Open Video Player

                      global.buildVideo(this.data.fullData.id);
                    } else {
                      // if not,  show the modal to add the pin
                      this.$modal.show('modal-Logged-parental-control', {
                        videoId: this.data.fullData.id,
                        isNextVideo: false
                      });
                    }
                  });
                } else {
                  // PARENTAL CONTROL NOT ACTIVATED. JUST OPEN THE PLAYER

                  $('.modal-overlay, .modal').addClass('active');
                  $('body').addClass('overflow');
                  // Open Video Player
                  global.buildVideo(this.data.fullData.id);
                }
              } else {
                // PARENTAL CONTROL NOT ACTIVATED. JUST OPEN THE PLAYER

                $('.modal-overlay, .modal').addClass('active');
                $('body').addClass('overflow');
                // Open Video Player
                global.buildVideo(this.data.fullData.id);
              }
            } else if (this.trailer !== '') {
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
                          $('.modal-overlay, .modal').addClass('active');
                          $('body').addClass('overflow');
                          // Open Video Player

                          global.buildVideo(values.videoId);
                        } else {
                          // if not,  show the modal to add the pin
                          this.$modal.show('modal-Logged-parental-control', {
                            videoId: values.videoId,
                            isNextVideo: false
                          });
                        }
                      });
                    } else {
                      // PARENTAL CONTROL NOT ACTIVATED. JUST OPEN THE PLAYER

                      $('.modal-overlay, .modal').addClass('active');
                      $('body').addClass('overflow');

                      // Open Video Player
                      global.buildVideo(values.videoId);
                    }
                  } // END if (store.state.userData.parentalControl)
                } // END if (values.type !== 'episode') {
              ); // END getVideoIdAndClassification(this.data.fullData).then(values => {
            }
          } else if (this.isLogged && !this.canStream) {
            // LOGGED BUT Can't Stream . No subscription Active (Payment, no plan selected or Trial Expired)
            // this.$modal.show('modal-Logged-NOTcanStream');

            var path = window.location.pathname;
            var querystring = window.location.search;
            let parameters = '';
            if (querystring.toLowerCase().indexOf('autoplay=true') != -1) {
              parameters = '?autoplay=true';
            }

            window.location.href = getPathURL('/account/SelectPlan?returnURL=' + path + parameters);
          } else {
            // USER NOT LOGGED
            // this.$modal.show('modal-login');

            var path = window.location.pathname;
            var querystring = window.location.search;
            let parameters = '';
            if (querystring.toLowerCase().indexOf('autoplay=true') != -1) {
              parameters = '?autoplay=true';
            }
            window.location.href = getPathURL('/account/login?returnURL=' + path + parameters);
          }
        }
      },
      checkDeepLinks: function () {
        let isReload = false;
        if (window.performance) {
          if (performance.navigation.type == 1) {
            isReload = true;
          }
        }

        // Opens a video player if ?autoplay=true param is present.
        if (this.data.isDetail === 'true' && isReload === false) {
          // && this.data.isEpisodeTabs !== 'true') {
          var url = window.location.href;
          if (
            url.toLowerCase().indexOf('autoplay=true') != -1 &&
            url.toLowerCase().indexOf('action=signincancel') == -1 && // => LOGIN CANCEL
            url.toLowerCase().indexOf('authcode=null') == -1 && // => SELECT PLAN CANCEL
            url.toLowerCase().indexOf('action=selectplansuccess') == -1 && // => SELECT PLAN UPDATE
            url.toLowerCase().indexOf('action=selectplancancel') == -1 // => SELECT PLAN CANCEL
          ) {
            this.showVideo(null);
          }
        }
      },
      showBackgroundAndActions: function () {
        const rootInternal = setInterval(() => {
          this.loaded = true;

          if (global.bLazy) {
            global.bLazy.revalidate();
          }

          const background = $('.image-wrapper').addClass('loaded');

          let checkseconds = 0;
          const interval = setInterval(() => {
            const element = background.find('.image-background');

            if (element.hasClass('checking-data')) {
              element.removeClass('checking-data');

              // console.log('Show Background image');

              clearInterval(interval);
            }

            if (checkseconds === 5) {
              clearInterval(interval);
            }

            checkseconds++;
          }, 1000);
          clearInterval(rootInternal);
        }, 1000);
      },

      isLoading: function () {
        return store.state.auth.loading;
      },

      // Add or remove to Watchlist
      actionBookmarkList: function () {
        const { preInstanceStatus } = Object.assign({}, { preInstanceStatus: this.isInWatchingList });

        // Add or Remove only Shows or Movies NOT seasons or episodes
        let itemId = 0;

        // If is movie or show just add to watchlist the item

        if (this.data.hasOwnProperty('fullData')) {
          if (this.data.fullData.type === 'movie' || this.data.fullData.type === 'show') {
            itemId = this.data.fullData.id;
          }
          // If episode or season MUST add the parent Show
          else if (this.data.fullData.type === 'episode' || this.data.fullData.type === 'season') {
            itemId = this.data.fullData.showId;
          }
        }

        this.isInWatchingList = 2; // Loading

        const callback = (error, data, response) => {
          if (error) {
            this.isInWatchingList = 4; // Loading
            console.error(error);
          } else {
            // removed
            if (preInstanceStatus === 3) {
              this.isInWatchingList = 1;
              store.commit('removeBookmark', { id: itemId });
              if (global.dataLayer) {
                global.dataLayer.push({
                  event: 'eventSend',
                  actionType: 'click',
                  actionName: 'Navigation',
                  eventLabels: {
                    eventType: 'atc',
                    campaignId: 'Page',
                    creation: 'watchlist~remove',
                    container: 'page',
                    status: 'success',
                    url: this.data.path
                  }
                });
              }
              // added
            } else if (preInstanceStatus === 1) {
              this.isInWatchingList = 3;
              store.commit('addBookmark', { response: response.body });
              if (global.dataLayer) {
                global.dataLayer.push({
                  event: 'eventSend',
                  actionType: 'click',
                  actionName: 'Navigation',
                  eventLabels: {
                    eventType: 'atc',
                    campaignId: 'Page',
                    creation: 'watchlist~add',
                    container: 'page',
                    status: 'success',
                    url: this.data.path
                  }
                });
              }
            }
          }
        };

        const opts = {
          segments: [global.Country]
        };

        if (itemId != 0) {
          const apiInstance = new BritboxAccountApi.ProfileApi();

          // Remove Items from Watchlist
          if (preInstanceStatus === 3) {
            apiInstance.deleteItemBookmark(itemId, opts, callback);
          }
          // Add item to Watchlist
          else if (preInstanceStatus === 1) {
            apiInstance.bookmarkItem(itemId, opts, callback);
          }
        }
      }
    },
    created() {
      // if is LiveStream, need other flow.
      if (this.data.isLiveStream) {
        this.showBackgroundAndActions();
      } else {
        // OTHER CONTENT => Movies/shows/episodes/season
        let itemId = 0;

        if (this.data.hasOwnProperty('fullData')) {
          // If is movie or show just add to watchlist the item
          if (this.data.fullData.type === 'movie' || this.data.fullData.type === 'show') {
            itemId = this.data.fullData.id;
          }
          // If episode or season MUST add the parent Show
          else if (this.data.fullData.type === 'episode' || this.data.fullData.type === 'season') {
            itemId = this.data.fullData.showId;
          }
        }

        this.$store.subscribe((mutation, state) => {
          if (
            mutation.type === 'setUserData' ||
            mutation.type === 'setUserDataError' ||
            mutation.type === 'setUserDataWatched'
          ) {
            if (mutation.type === 'setUserData' || mutation.type === 'setUserDataError') {
              // GOOGLE Deeplinks
              // if autoplay = true then open the video player
              if (!this.isLoading()) {
                this.checkDeepLinks();
              }

              //this.loaded = true;
              //global.bLazy.revalidate();
              //const background = $('.image-wrapper').addClass('loaded');

              //const interval = setInterval(() => {
              //  const element = background.find('.image-background');
              //  if (element.hasClass('checking-data')) {
              //    element.removeClass('checking-data');
              //    clearInterval(interval);
              //  }
              //}, 500);
            }

            this.isContinue = this.checkIsContinueWatching(this.data.itemid); // TODO: Check if only show or movie logic apply here too.
            this.isInWatchingList = this.checkIsInWatchingList(itemId);
          }
          // Remove or add to Watchlist.
          if (mutation.type === 'removeBookmark' || mutation.type === 'addBookmark') {
            this.isInWatchingList = this.checkIsInWatchingList(itemId);
          }

          if (mutation.type === 'removeContinueWatching') {
            this.isContinue = this.checkIsContinueWatching(this.data.itemid);
          }
        });

        // TODO: Check if only show or movie logic apply here too.
        // TRY TO AVOID SETTIMEOUT :-( => this.data.itemid is different inside .$store.subscribe => Refactor data:
        setTimeout(() => {
          this.isInWatchingList = this.checkIsInWatchingList(itemId);
          this.isContinue = this.checkIsContinueWatching(this.data.itemid);

          this.showBackgroundAndActions();
        }, 1000);
      }
    },
    watch: {
      isContinue: function (newIsContinue, oldIsContinue) {
        // REMOVED TO TEST PERFORMANCE - Need to create and detroy when used.
        // if (this.showButtonsPlayAndAddBookmark) {
        //  if (newIsContinue && this.animationContinue) {
        //    this.animationContinue.play();
        //  }
        // }
      },
      hover: function (value) {
        // REMOVED TO TEST PERFORMANCE - Need to create and detroy when used.
        // if (this.showButtonsPlayAndAddBookmark) {
        //  if (value) {
        //    if (this.isContinue) {
        //      setTimeout(() => {
        //        if (this.animationContinue) {
        //          // this.animationContinue.goToAndStop(0);
        //            console.log('ACTIONS => animationContinue.play');
        //          this.animationContinue.play();
        //        }
        //      }, 350);
        //    } else {
        //      if (this.animationPlay) {
        //        console.log('ACTIONS => animationPlay.play');
        //        this.animationPlay.play();
        //      }
        //    }
        //  } else {
        //    if (this.isContinue && this.animationContinue) {
        //      this.animationContinue.pause();
        //    } else {
        //      if (this.animationPlay) {
        //        this.animationPlay.pause();
        //      }
        //    }
        //  }
        // }
      }
    }
  };
</script>

<template>
  <fragment>
    <!--<a
      v-if="showButtonsPlayAndAddBookmark || data.isLiveStream"
      href="#"
      class="play-now"
      @click="showVideo($event)"
    >-->

    <a v-if="showButtonsPlayAndAddBookmark"
       :href="showButtonsPlayAndAddBookmark && data.isDetail ? '#' : urlLandingWatch"
       @click="data.isDetail ? showVideo($event) : null"
       class="play-now"
       :data-itemid="data.itemid">
      <span class="play-animation">
        <img v-show="!isContinue && !isTrailer && !data.forceContinueWatching"
             src="/content/img/action-svg/play_now.svg" />
        <img v-show="isContinue || data.forceContinueWatching"
             src="/content/img/action-svg/continue_watching.svg" />
        <img v-show="isTrailer && !isContinue" src="/content/img/action-svg/trailer.svg" />

        <!--
        <lottie :data="animationDataPlay"
                :loop="true"
                :autoplay="true"
                :height="99"
                :width="105"
                v-show="!isContinue && !isTrailer"
                :settings="{renderer: 'canvas'}"
                ref="animationPlay" />

        <lottie :data="animationDataContinue"
                :height="99"
                :width="105"
                :autoplay="true"
                :loop="false"
                v-show="isContinue && !isTrailer"
                :settings="{renderer: 'canvas'}"
                ref="animationContinue" />

          <lottie
          :data="animationDataTrailer"
          :height="99"
          :width="105"
          :autoplay="true"
          :loop="true"
          v-show="isTrailer"
          :settings="{renderer: 'canvas'}"
          ref="animationTrailer"
        />-->
      </span>

      <span v-if="data.isLiveStream">Watch now</span>

      <span v-else-if="data.forceContinueWatching">
        <div>{{ continueWatchlingText }}</div>
        <span>· {{ data.forceMinutes }} min left</span>
      </span>

      <span v-else-if="(isTrailer && !isContinue && data.isDetail)">{{ playTrailerText }}</span>

      <span v-else-if="!isContinue">{{ playNowText }}</span>

      <span v-else-if="isContinue && !data.hideMinLeft">
        <div>{{ continueWatchlingText }}</div>
        <span>· {{ minutes }} min left</span>
      </span>

      <span v-else-if="isContinue && data.hideMinLeft">{{ continueWatchlingText }}</span>

      <span v-else>{{ playNowText }}</span>
    </a>

    <a v-if="showButtonsPlayAndAddBookmark && !data.hideWatchlist && isLogged && showButtonAddBookmark"
       href="#"
       class="watchlist"
       @click.prevent="actionBookmarkList()"
       :style="{ 'pointer-events': isInWatchingList === 2 ? 'none' : 'inherit' }">
      <i class="icon-wishlist" v-if="isInWatchingList === 1"></i>
      <div class="dots" v-if="isInWatchingList === 2">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <i class="icon-tick" v-if="isInWatchingList === 3"></i>
      <i class="icon-close" v-if="isInWatchingList === 4"></i>
      <span>
        <fragment v-if="isInWatchingList === 1">Watchlist</fragment>
        <fragment v-if="isInWatchingList === 2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</fragment>
        <fragment v-if="isInWatchingList === 3">Remove from Watchlist</fragment>
        <fragment v-if="isInWatchingList === 4">Try again</fragment>
      </span>
    </a>
    <a :href="urlLanding" class="discover" v-if="!data.hideDiscover">
      <i class="icon-discover-more"></i>
      <span>Discover more</span>
    </a>
  </fragment>
</template>
