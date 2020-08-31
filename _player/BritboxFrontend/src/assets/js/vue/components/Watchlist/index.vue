<script>
import store from '../../store';
import animationData from '../../../../animations/load.json';
import card from '../shared/Card.vue';
import sortBy from 'lodash/sortBy';

export default {
  components: {
    card
  },
  data() {
    return {
      loaded: false,
      animationData,
      watchlistElements: [],
      filterType: {
        selected: 'all',
        options: [
          { text: 'All', value: 'all', disabled: false },
          { text: 'Movie', value: 'movie', disabled: false },
          { text: 'Show', value: 'show', disabled: false }
        ]
      },
      filterOrder: {
        selected: 'date-added',
        options: [
          { text: 'Recently Added', value: 'date-added' },
          { text: 'A - Z', value: 'a-z' }
        ]
      }
    };
  },
  watch: {
    // Check watchlist length to add class to main
    watchlistElements: function(newList, oldList) {
      if (newList !== oldList && newList.length === 0) {
        document.getElementsByTagName('main')[0].classList.add('watchlist-empty--visible');
      }

      // If the watchlist is empty but in a particular type, change the filter to all
      if (newList.length === 0 && this.filterType.selected !== 'all') {
        this.filterType.selected = 'all';
        this.evaluateFilters();
        this.onFilter();
      }
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (!this.loaded && mutation.type === 'setUserData') {
        this.loaded = true;
        this.watchlistElements = store.state.userData.bookmarkList.items.map(item => {
          const classification = this.classification(item);

          return {
            ...item,
            classification,
            isHD: this.isHD(item),
            isCC: this.isCC(item)
          };
        });
      }

      if (mutation.type === 'removeBookmark' || mutation.type === 'addBookmark') {
        this.watchlistElements = store.state.userData.bookmarkList.items.map(item => {
          const classification = this.classification(item);

          return {
            ...item,
            classification,
            isHD: this.isHD(item),
            isCC: this.isCC(item)
          };
        });

        this.onFilter();
      }
    });

    this.evaluateFilters();

    global.bodyVm.$on('update:watchtype', value => {
      this.filterType.selected = value;
      this.onFilter();
    });

    global.bodyVm.$on('update:watchorder', value => {
      this.filterOrder.selected = value;
      this.onFilter();
    });
  },
  updated() {
    // Dispatch a custom event to refresh the filters with SelectBoxIt
    document.querySelector('#watchtype').dispatchEvent(new CustomEvent('watchlist'));
  },
  methods: {
    minutes: function(duration, position) {
      return Math.round((parseInt(duration || 0) - parseInt(position)) / 60);
    },
    isHD(item) {
      const hd = item?.customFields?.HDFlag || 'False';
      return Boolean(hd);
    },
    isCC(item) {
      const cc = item?.customFields?.CCFlag || 'False';
      return Boolean(cc);
    },
    classification(item) {
      return item?.classification?.name || '';
    },
    getSeasons: function(item) {
      if (item.type === 'show') {
        let seasons = item?.availableSeasonCount || '';
        if (seasons !== '') {
          seasons = ' · ' + seasons + ' ' + 'Seasons';
        }

        return seasons;
      } else {
        return 'la paparula';
      }
    },
    onFilter() {
      this.watchlistElements = store.state.userData.bookmarkList.items;

      if (this.filterType.selected !== 'all') {
        this.watchlistElements = this.watchlistElements.filter(
          item => item.type === this.filterType.selected
        );
      }

      if (this.filterOrder.selected !== 'date-added') {
        this.watchlistElements = sortBy(this.watchlistElements, ['contextualTitle'], ['asc']);
      }
    },
    evaluateFilters() {
      this.filterType.options = this.filterType.options.map(option => {
        const elements = store.state.userData.bookmarkList.items;
        const hits = elements.filter(element => element.type === option.value);

        if (option.value !== 'all' && hits.length === 0) {
          option.disabled = true;
        }
        return option;
      });
    }
  }
};
</script>

<template>
  <fragment>
    <div class="row">
      <div class="columns">
        <div class="top-wrapper">
          <h2
            class="title"
            v-if="watchlistElements.length"
          >{{ watchlistElements.length }} Programmes</h2>
          <div class="filters" v-show="loaded && watchlistElements.length !== 0">
            <label>
              Type:
              <div class="custom-select black">
                <select id="watchtype" v-model="filterType.selected">
                  <option
                    v-for="option in filterType.options"
                    v-bind:value="option.value"
                    v-bind:disabled="option.disabled"
                    :key="option.value"
                  >{{ option.text }}</option>
                </select>
              </div>
            </label>
            <label>
              Order:
              <div class="custom-select black">
                <select id="watchorder" v-model="filterOrder.selected">
                  <option
                    v-for="option in filterOrder.options"
                    v-bind:value="option.value"
                    :key="option.value"
                  >{{ option.text }}</option>
                </select>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="!loaded">
      <div class="columns small-12">
        <div class="animation loading">
          <lottie :data="animationData" :autoplay="true" :loop="true" :height="91" :width="94" />
        </div>
      </div>
    </div>
    <div class="row wrapper-items" v-else>
      <div
        class="item columns small-12 medium-6 large-4 watching"
        v-for="item of watchlistElements"
        :key="item.customId"
      >
        <card
          v-bind="{
            data: item,
            imageType: {
              type: 'tile',
              size: 'tile'
            },
            removable: true,
            hideWatchlist: true,
            hideDiscover: true,
            hideMinLeft : true,
            playNowText: `Play now ${item.type === 'show' ? `${getSeasons(item)}` : ''}`,
          }"
        >
          <fragment slot="bottom">
            <div class="title">{{ item.contextualTitle }}</div>
            <div class="description">{{ item.shortDescription }}</div>
          </fragment>
        </card>
      </div>

      <fragment v-if="watchlistElements.length % 3 === 1">
        <div class="item columns small-12 medium-6 large-4 watching"></div>
        <div class="item columns small-12 medium-6 large-4 watching"></div>
      </fragment>

      <div
        v-if="watchlistElements.length % 3 === 2"
        class="item columns small-12 medium-6 large-4 watching"
      ></div>
    </div>

    <div class="Box-watchlist-empty" v-if="loaded && watchlistElements.length === 0">
      <div class="row">
        <div class="columns small-12">
          <div class="watchlist-empty">
            <div class="info-box">
              <h2>Your Watchlist is empty!</h2>
              <p
                class="pad-b"
              >Your watchlist let's you return to your favourite programmes really quickly, and it works across all of your devices.</p>
              <p>
                Just hit the
                <i class="icon-wishlist"></i>
                <b>Watchlist</b> button on any programme page.
              </p>
            </div>
            <div class="cta-box">
              <a href="/" class="button big shadow">Start Browsing</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<style scoped>
.loading {
  margin: 40px auto;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.no-items {
  margin-bottom: 40px;
}
</style>
