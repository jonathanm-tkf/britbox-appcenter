<script>
import watching from './Watching.vue';
import card from './CardItem.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

function updateSwiper(slides, activeIndex, slidesPerView) {
  $(slides)
    .removeClass('active')
    .addClass('out')
    .css('opacity', 0.05);

  $(slides[activeIndex])
    .css('opacity', 1)
    .removeClass('out')
    .next()
    .removeClass('out')
    .css('opacity', 1)
    .next()
    .removeClass('out')
    .css('opacity', 1);

  $(slides[activeIndex])
    .prev()
    .css('opacity', 0.2)
    .addClass('out')
    .prev()
    .css('opacity', 0.1)
    .addClass('out');

  $(slides[activeIndex + Number(slidesPerView)])
    .next()
    .css('opacity', 0.2)
    .addClass('out')
    .next()
    .css('opacity', 0.1)
    .addClass('out');

  $(slides[activeIndex])
    .nextAll(`*:lt(${Number(slidesPerView)})`)
    .css('opacity', 1)
    .removeClass('out');
}

export default {
  components: {
    watching,
    card,
    swiper,
    swiperSlide
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'continue'
    },
    update: Boolean,
    options: {
      type: Object,
      default: function() {
        return {
          slidesPerView: 4,
          // spaceBetween: 15,
          slidesPerGroup: 4
        };
      }
    },
    imageType: Object
  },
  data() {
    return {
      swiperOption: {
        loop: false,
        loopFillGroupWithBlank: true,
        slidesPerView: 'auto',
        // slidesPerView: this.options.slidesPerView,
        // spaceBetween: this.options.spaceBetween,
        slidesPerGroup: 3, //this.options.slidesPerGroup,
        navigation: {
          clickable: true,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        breakpoints: {
          // when window width is >= 768px
          768: {
            slidesPerGroup: 1,
            freeMode: true
          },
          1200: {
            slidesPerGroup: 2
          }
        },
        on: {
          init() {
            $(this.slides)
              .removeClass('active')
              .addClass('out')
              .css('opacity', 0.05);

            $(this.slides[this.activeIndex])
              .css('opacity', 1)
              .removeClass('out')
              .next()
              .removeClass('out')
              .css('opacity', 1)
              .next()
              .removeClass('out')
              .css('opacity', 1);

            $(this.slides[this.activeIndex])
              .prev()
              .css('opacity', 0.2)
              .addClass('out')
              .prev()
              .css('opacity', 0.1)
              .addClass('out');

            $(this.slides[this.activeIndex + this.params.slidesPerView])
              .next()
              .css('opacity', 0.2)
              .addClass('out')
              .next()
              .css('opacity', 0.1)
              .addClass('out');

            $(this.slides[this.activeIndex])
              .nextAll(`*:lt(${this.params.slidesPerView})`)
              .css('opacity', 1)
              .removeClass('out');
          },
          update() {
            updateSwiper(this.slides, this.activeIndex, this.params.slidesPerView);
          },
          slideChangeTransitionStart() {
            updateSwiper(this.slides, this.activeIndex, this.params.slidesPerView);
          },
          slideChangeTransitionEnd() {
            global.bLazy.revalidate();
          }
        }
      }
    };
  },
  watch: {
    update: function() {
      this.swiper.update();
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(slide) in data" :key="slide.customId">
      <watching :data="slide" v-if="type === 'continue'">
        <a :href="slide.path">
          <div class="title">{{slide.type === 'episode' ? slide.showTitle : slide.title}}</div>
        </a>
        <div
          class="top"
        >{{slide.type === 'episode' ? `${slide.seasonTitle} - ${slide.episodeName}` : slide.type}}</div>
      </watching>
      <watching :data="slide" type="show" v-else>
        <a :href="slide.path">
          <div class="title">{{slide.type === 'episode' ? slide.showTitle : slide.title}}</div>
        </a>
        <div
          class="top"
        >{{slide.type === 'episode' ? `${slide.seasonTitle} - ${slide.episodeName}` : slide.type}}</div>
      </watching>
      <!-- <card :data="slide" v-else></card> -->
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
