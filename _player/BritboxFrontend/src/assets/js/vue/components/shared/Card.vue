<script>
import { BritboxAccountApi } from '../../../lib/sdk/';
import { calculateSizeImage, getPathURL, getUrlImageStatic } from '../../../lib/global';
import store from '../../store';

export default {
  props: {
    data: Object,
    imageType: {
      type: Object,
      default: function() {
        return {
          type: 'wallpaper',
          size: 'tile'
        };
      }
    },
    removable: {
      type: Boolean,
      default: false
    },
    hideWatchlist: {
      type: Boolean,
      default: false
    },
    hideDiscover: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    isEpisodeTabs: {
      type: Boolean,
      default: false
    },
    hideMinLeft: {
      type: Boolean,
      default: false
    },
    playNowText: {
      type: String,
      default: 'Play now'
    },
    continueWatchlingText: {
      type: String,
      default: 'Continue watching'
    }
  },
  components: {
    lottie
  },
  data() {
    return {
      hover: false,
      animationSpeed: 1,
      isContinue: false,
      loaded: false,
      position: 0,
      progress: 0
    };
  },
  computed: {
    urlLanding: function() {
      return this.data.path === undefined ? null : getPathURL(this.data.path);
    },
    isHD: function() {
      const hd = this.data?.customFields?.HDFlag === 'True' ? true : false;
      return Boolean(hd);
    },
    isBadgeAvailable: function() {
      const badge = this.data?.badge;
      return typeof badge !== 'undefined';
    },
    badge: function() {
      const badge = this.data?.badge;
      return badge;
    },
    isCC: function() {
      const cc = this.data?.customFields?.CCFlag === 'True' ? true : false;
      return Boolean(cc);
    },
    classification: function() {
      if (this.data.type != 'movie') {
        if (this.data.type === 'episode') {
          return this.data?.classification;
        } else {
          return '';
        }
      } else {
        if (this.data?.classification.hasOwnProperty('name')) {
          return this.data?.classification.name;
        } else {
          return this.data?.classification || '';
        }
      }
    },
    minutes: function() {
      return Math.round((parseInt(this.data.duration) - parseInt(this.position)) / 60);
    },
    image: function() {
      return typeof this.data.images !== 'undefined'
        ? calculateSizeImage(this.data.images[this.imageType.type], this.imageType.size)
        : '';
    },
    isLogged: function() {
      return store.state.userData.isLogged;
    }
  },
  methods: {
    // NOT USED ANYMORE
    // showVideo: function() {
    //  if (this.isLogged) {
    //    $('.modal-overlay, .modal').addClass('active');
    //    global.buildVideo(this.data.itemid);
    //  } else {
    //    this.$modal.show('modal-login');
    //  }
    // },

    // Only for episodes tab cards =>
    checkIsContinueWatching: function(itemid) {
      if (this.isEpisodeTabs) {
        // If episode tab check all user history (FULLY WATCHED INCLUDED)

        const filter = this.$store.state.userAdditionalData.watchedHistoryList.filter(
          item => parseInt(item.id) === parseInt(itemid)
        );

        if (filter.length > 0) {
          const { isFullyWatched } = filter.reduce(item => item);
          if (typeof isFullyWatched !== 'undefined') {
            this.position = 0;
            this.progress = 100;
          } else {
            // NOT FULLY WATCHED PROGRESS
            const { position } = filter.reduce(item => item);
            this.position = position;
            this.progress = Math.round((parseInt(position) * 100) / parseInt(this.data.duration));
          }
        }

        return filter.length > 0;
      } else {
        // If NOT episode tab check profile (ONLY CONTINUE WATCHING INCLUDED)
        if (this.$store.state.userData.watched?.length > 0) {
          const filter = this.$store.state.userData.watched.filter(
            item => parseInt(item.id) === parseInt(itemid)
          );
          if (filter.length > 0) {
            const { position } = filter.reduce(item => item);
            this.position = position;
            this.progress = Math.round((parseInt(position) * 100) / parseInt(this.data.duration));
          }

          return filter.length > 0;
        } else {
          return false;
        }
      }
    },

    // Used for Watchlist Page => REMOVE
    actionBookmarkList: function() {
      this.isInWatchingList = 2; // Loading
      const apiInstance = new BritboxAccountApi.ProfileApi();
      const callback = (error, data, response) => {
        if (error) {
          this.isInWatchingList = 4; // Loading
          console.error(error);
        } else {
          this.isInWatchingList = 1;
          store.commit('removeBookmark', { id: this.data.id });
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
        }
      };

      const opts = {
        segments: [global.Country]
      };

      apiInstance.deleteItemBookmark(this.data.id, opts, callback);
    }
  },
  mounted() {
    setTimeout(() => {
      global.bLazy.revalidate();
      this.isContinue = this.checkIsContinueWatching(this.data.id);
    }, 100);
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setWatchingHistoryData') {
        this.isContinue = this.checkIsContinueWatching(this.data.id);
      }
    });
  }
};
</script>

<template>
  <div class="card" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="ribbon Blue-normal" v-if="isBadgeAvailable">{{badge}}</div>
    <div class="image pulsate">
      <img class="b-lazy" :data-src="image" />
      <div class="bar" v-if="isContinue">
        <div class="color-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-inside">
        <div class="top-animation">
          <div class="actions">
            <actions
              :data="{ itemid: data.id, path: data.path, duration: data.duration, hideWatchlist, hideDiscover, isDetail, fullData: data, isEpisodeTabs: isEpisodeTabs, hideMinLeft: hideMinLeft, forceContinueWatching: isContinue && progress !== 100, forceMinutes: minutes }"
              :hover="hover"
              :playNowText="playNowText"
              :continueWatchlingText="continueWatchlingText"
            ></actions>
          </div>
          <ul class="tags">
            <li class="outline" v-if="classification">{{ classification }}</li>
            <li class="outline" v-if="isCC">CC</li>
            <li class="primary" v-if="isHD">HD</li>
            <!-- <li class="ribbon Blue-normal" v-if="isBadgeAvailable">{{badge}}</li> -->
          </ul>
        </div>
        <div class="bottom">
          <div class="season">
            <a :href="urlLanding" v-if="!isDetail">
              <slot name="bottom"></slot>
            </a>
            <slot name="bottom" v-else></slot>
          </div>

          <button class="close" v-if="removable" @click="actionBookmarkList">
            <i class="icon-close"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="text" v-if="imageType.type === 'wallpaper'">
      <span>E{{ data.episodeNumber }} · {{ data.episodeName }}</span>
    </div>
  </div>
</template>

<style scoped>
.bottom {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}

.close {
  font-size: 24px;
}
</style>
