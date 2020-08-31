<script>
import store from '../../store';
import swiper from './components/Swiper.vue';
import animationData from '../../../../animations/load.json';
import take from 'lodash/take';
import uniqBy from 'lodash/unionBy';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';

export default {
  components: {
    swiper
  },
  methods: {
    getElementWatchingList: function(item) {
      const { id, position } = item;

      const items = store.state.userData.watchedList.items.filter(
        item => parseInt(item?.id) === parseInt(id)
      );
      const element = items.reduce(item => item);
      return {
        ...element,
        position
      };
    },
    getElementShowList: function(item) {
      const { id, position } = item;

      const items = store.state.userData.bookmarkList.items.filter(
        item => parseInt(item?.id) === parseInt(id)
      );
      const element = items.reduce(item => item);
      return {
        ...element,
        position
      };
    },
    swiperWatching: function() {
      let watchingTryTimes = 1;
      const watchingInterval = setInterval(() => {
        const continueWatching = take(store.state.userData.watched, 25);

        if (continueWatching.length > 0) {
          const elements = [];

          continueWatching.forEach(element => {
            const item = this.getElementWatchingList(element);
            elements.push(item);
          });
          this.swiperContinueWatchingSlides = elements;
        } else {
          this.tabActive = '#panel2';
        }

        if (continueWatching.length > 0 || watchingTryTimes === 3) {
          clearInterval(watchingInterval);
        }

        watchingTryTimes += 1;
      }, 1000);
    },
    swiperShows: function() {
      let showsTryTimes = 1;
      const showsInterval = setInterval(() => {
        const continueWatching = take(store.state.userData.watched, 25);

        if (continueWatching.length > 0) {
          const bookmarks = store.state.userData.bookmarkList.items;
          const elements = [];

          bookmarks.forEach(element => {
            const items = continueWatching.filter(
              item => parseInt(item?.id) === parseInt(element.id)
            );

            if (items.length > 0) {
              const positionElement = items.reduce(item => item);
              element.position = positionElement.position;
            }

            // console.log(element);
            elements.push(element);
          });

          this.swiperShowsSlides = elements;

          clearInterval(showsInterval);
        }
        else {
          this.swiperShowsSlides = take(store.state.userData.bookmarkList.items, 25);

          if (this.swiperShowsSlides.length > 0 || showsTryTimes === 3) {
            clearInterval(showsInterval);
          }
        }

        showsTryTimes += 1;
      }, 1000);
    },
    changeTab: function (event) {
      event.preventDefault();
      this.tabActive = `#${event.target.dataset.tabsTarget}`;
    }
  },
  data() {
    return {
      swiperContinueWatchingSlides: [],
      swiperShowsSlides: [],
      animationData,
      tabActive: '#panel1',
      counterTab: {
        continue: 1,
        shows: 0
      }
    };
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setUserData' || mutation.type === 'setUserDataError') {
        this.swiperWatching();
        this.swiperShows();
      }

      if (mutation.type === 'setUserDataWatched') {
        this.swiperWatching();
      }
    });
  },
  created() {
    // On Store Updated
    this.$store.subscribe((mutation, state) => {
      // When remove or add a item to Watchlist.
      if (mutation.type === 'removeBookmark' || mutation.type === 'addBookmark') {

        this.swiperShowsSlides = take(store.state.userData.bookmarkList.items, 25);

        if (this.swiperShowsSlides.length === 0) {
          this.tabActive = '#panel1';
        }
      }
      // When remove item from Continue Watching
      if (mutation.type === 'removeContinueWatching') {
        const elements = [];

        store.state.userData.watched.forEach(element => {
          const item = this.getElementWatchingList(element);
          elements.push(item);
        });

        this.swiperContinueWatchingSlides = elements;

        if (elements.length === 0) {
          this.tabActive = '#panel2';
        }
      }
    });
  }
};
</script>

<template>
  <div class="tabs-wrapper" v-if="swiperContinueWatchingSlides.length || swiperShowsSlides.length">
    <div class="row">
      <div class="columns">
        <ul class="tabs" data-tabs id="tabs">
          <li
            class="tabs-title"
            :class="{ 'is-active': tabActive === '#panel1' }"
            v-if="swiperContinueWatchingSlides.length"
          >
            <a
              href="#panel1"
              data-tabs-target="panel1"
              aria-selected="true"
              @click="changeTab($event)"
            >Continue Watching</a>
          </li>
          <li
            class="tabs-title"
            :class="{ 'is-active': tabActive === '#panel2' }"
            v-if="swiperShowsSlides.length"
          >
            <a
              href="#panel2"
              data-tabs-target="panel2"
              @click="changeTab($event)"
            >Watchlist</a>
          </li>
        </ul>
        <div class="swiper-pagination">
          <div class="dot">
            <ul></ul>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs-content" data-tabs-content="tabs">
      <div
        class="tabs-panel"
        :class="{ 'is-active': tabActive === '#panel1' }"
        id="panel1"
        v-show="tabActive === '#panel1'"
      >
        <div data-name-component="HomeTabsVue" class="swiper watching">
          <div class="row">
            <div class="columns">
              <swiper
                :data="swiperContinueWatchingSlides"
                :type="'continue'"
                :update="tabActive === '#panel1'"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="tabs-panel"
        :class="{ 'is-active': tabActive === '#panel2' }"
        id="panel2"
        v-show="tabActive === '#panel2'"
      >
        <div data-name-component="HomeTabsVue" class="swiper watching swiper-your-shows">
          <div class="row">
            <div class="columns">
              <swiper
                :data="swiperShowsSlides"
                :type="'episodes'"
                :update="tabActive === '#panel2'"
                :options="{
                  slidesPerView: 3,
                  spaceBetween: 10,
                  slidesPerGroup: 3
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="swiperContinueWatchingSlides.length==0 && swiperShowsSlides.length==0"></div>
  <div class="row" v-else>
    <div class="columns small-12">
      <div class="animation loading">
        <lottie :data="animationData" :autoplay="true" :loop="true" :height="91" :width="94" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  margin: 0 auto 100px;
}
</style>
