<script>
import { BritboxContentApi } from '../../../lib/sdk';

import animationData from '../../../../animations/load.json';
import card from '../shared/Card.vue';
import VueTinySlider from 'vue-tiny-slider';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import compact from 'lodash/compact';
import store from '../../store';
import { getWatchedHistoryUserData } from '../../services';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import constants from '../../../lib/constants';
import { calculateSizeImage } from '../../../lib/global';

export default {
  components: {
    card,
    'tiny-slider': VueTinySlider,
    swiper,
    swiperSlide
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  data() {
    return {
      loading: true,
      profile: false,
      animationData,
      activePath: '',
      sliders: this.data,
      episodes: [],
      slider: null,
      swiperOption: {
        loop: false,
        loopFillGroupWithBlank: true,
        slidesPerView: 6,
        spaceBetween: 5,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          // when window width is >= 320px
          640: {
            slidesPerView: 2,
            slidesPerGroup: 1
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            slidesPerGroup: 2
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 6,
            slidesPerGroup: 1
          }
        },
        on: {
          init: () => {
            // if (this.swiper) {
            //   this.swiper.slideTo(index);
            // }
          },
          update() {},
          slideChangeTransitionStart() {},
          slideChangeTransitionEnd() {},
          breakpoint: () => {
            if (this.swiper) {
              this.swiper.update();
            }
          }
        }
      },
      seasonSelected: ''
    };
  },

  mounted() {
    setTimeout(() => {
      const index = this.findWithAttr(this.sliders, 'active', true);
      this.goToSlide(index);
    }, 1000);
  },

  methods: {
    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    getSeasonEpisodes(path) {
      

      const opts = {
        path, // String |
        listPageSize: 100, // Number |
        maxListPrefetch: 15, // Number |
        itemDetailExpand: 'all', // String |
        textEntryFormat: 'html', // String |
        device: 'web_browser', // String |
        sub: 'Subscriber', // String |
        segments: [global.Country], // [String] |
        useCustomId: constants[constants.environment].useBBCCustomID
      };
      // this.activePath = path;
      const apiInstance = new BritboxContentApi.PageApi();
      const callback = (error, data, response) => {
        if (error) {
          this.loading = false;
        } else {
          const { entries } = response.body.externalResponse;
          if (entries.length > 0) {
            const { items } = entries.reduce(entriesElements => entriesElements).item.episodes;
            // Add to the collection of episodes
            this.episodes = items.map(item => {
              const classification = this.classification(item);
              return {
                ...item,
                classification,
                isHD: this.isHD(item),
                isCC: this.isCC(item)
              };
            });

            // TODO: change Image, Description, Season Title.

            try {
              if (this.activePath !== entries[0].item.path && this.activePath !== '') {

                document.title = entries[0].title + ' | BritBox';

                try {

               
                  let year = '';
                  if (entries[0].item?.releaseYear) {
                    year = ' Year: ' + entries[0].item?.releaseYear;
                  }
                  let contextualTitle = ' ·  ' + entries[0].item?.contextualTitle
                  let episode = '';
                  if (entries[0].item?.episodeCount) {
                    episode = ' ·  Episodes: ' + entries[0].item?.episodeCount;
                  }

                  $('.notes').empty();
                  $('.notes').text(year + contextualTitle + episode);
                } catch{

                }



                let image = '';
                const { hero3x1, wallpaper } = entries[0].item.images;

                if (typeof hero3x1 !== 'undefined') {
                  image = hero3x1;
                } else {
                  if (typeof wallpaper !== 'undefined') {
                    image = wallpaper;
                  }
                }

                if (image !== '') {
                  // $('.top-banner .image-wrapper').removeClass('loaded');
                  $('.top-banner p.description').text(entries[0].item.shortDescription);
                  $('.top-banner .image-wrapper .image-background').removeClass('b-loaded');
                  $('.top-banner .image-wrapper .image-background').attr(
                    'data-src',
                    calculateSizeImage(image, 'wallpaper', 85, 600, 1400)
                  );

                  setTimeout(function() {
                    $('.top-banner p.description').text(entries[0].item.shortDescription);

                    // global.bLazy.revalidate();
                  }, 500);

                  setTimeout(function() {
                    // global.bLazy.revalidate();
                  }, 1500);
                }
              }
            } catch {}
            this.activePath = path;

            //global.bLazy.revalidate();
          }
        }
        // Remove Status = Loading (if error or success)
        this.loading = false;
      };
      apiInstance.getPage(opts, callback);
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
    goToSlide(index) {
      let path = '';
      this.sliders = this.sliders.map((item, key) => {
        item.active = index === key;

        if (index === key) {
          // this.activePath = item.path;
          path = item.path;
        }
        return item;
      });
      this.swiper.slideTo(index);
      this.seasonSelected = path;
      this.loading = true;
      this.getSeasonEpisodes(path);
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setUserData' || mutation.type === 'setUserDataError') {
        this.profile = true;

        if (mutation.type === 'setUserData') {
          //Get all watched History of the user => Continue Watching and Full Watched
          getWatchedHistoryUserData();
        }
      }
    });

    global.bodyVm.$on('update:seasonSelected', value => {
      const index = this.findWithAttr(this.sliders, 'path', value);
      this.goToSlide(index);
    });
  },
  watch: {
    seasonSelected: () => {
      setTimeout(() => {
        $('#seasonSelected')
          .data('selectBox-selectBoxIt')
          .refresh();
      }, 300);
    }
  }
};
</script>

<template>
  <div data-name-component="GridEpisodeVue" class="tabs-wrapper">
    <div class="row">
      <div class="columns">
        <div class="swiper seasons">
          <div class="custom-select black">
            <select id="seasonSelected" v-model="seasonSelected">
              <option
                v-for="(item, key) in sliders"
                v-bind:value="item.path"
                :key="key"
              >{{ item.text }}</option>
            </select>
          </div>
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-no-swiping">
            <swiper-slide v-for="(item, key) in sliders" :key="key">
              <div class="item">
                <a
                  :class="{ active: item.active }"
                  :data-path="item.path"
                  @click.prevent="activePath !== item.path ? goToSlide(key) : null"
                >{{ item.text }}</a>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </div>

    <div class="row" v-show="loading">
      <div class="columns small-12">
        <div class="animation loading">
          <lottie :data="animationData" :autoplay="true" :loop="true" :height="91" :width="94" />
        </div>
      </div>
    </div>

    <div class="items wrapper-items" v-show="!loading">
      <div class="row">
        <div
          class="columns small-12 medium-6 large-4"
          v-for="item of episodes"
          :key="item.customId"
        >
          <card
            v-bind="{data: item, hideWatchlist: true, hideDiscover: true, playNowText: `Play now · ${Math.round(item.duration / 60)} min`, isDetail: true, fullData: item, isEpisodeTabs: true }"
          >
            <fragment slot="bottom">
              <div class="top">E{{ item.episodeNumber }} · {{ item.episodeName }}</div>
              <div class="title">{{ item.shortDescription }}</div>
            </fragment>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  margin: 10px auto;
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
</style>
