<script>
import { BritboxContentApi } from '../../../lib/sdk';

import card from '../shared/Card.vue';

import animationData from '../../../../animations/load.json';
import { getUrlImageStatic, getUrlVars } from '../../../lib/global';
import constants from '../../../lib/constants';

const apiInstance = new BritboxContentApi.ListsApi();

export default {
  components: {
    card
  },
  data() {
    return {
      loading: false,
      isUpdated: false,
      isActive: false,
      animationData,
      items: [],
      replaceTitle: undefined
    };
  },
  created() {
    global.bodyVm.$on('update:type', value => {
      this.clearPagination();
      this.loadMoreData();
      if (this.replaceTitle) {
        this.replaceTitle.text(value);
      }
    });
    global.bodyVm.$on('update:order', value => {
      this.clearPagination();
      this.loadMoreData();
    });
  },
  mounted() {
    const replaceTitle = $(".title:contains('@title')");

    if (replaceTitle) {
      this.replaceTitle = replaceTitle;
      replaceTitle.text('All');
    }

    $(window).scroll(() => {
      if (
        !this.isActive &&
        $(window).scrollTop() >=
          $(document).height() -
            $(window).height() -
            $('footer').height() -
            $('.animation.load-more').height()
      ) {
        this.loadMoreData(true);
      }
    });

    $('.alphabeth a').click(e => {
      let { letter } = $(e.currentTarget)[0].dataset;
      let { count } = $(e.currentTarget)[0].dataset;

      if (count !== '0') {
        if (letter === '<') {
          $('.alphabeth .back a').removeClass('active');
          letter = '';
        } else {
          $('.alphabeth .back a').addClass('active');
        }

        $('.animation.load-more')
          .removeClass('hidden')
          .attr({ 'data-more': 'true', 'data-next': '', 'data-letter': letter });
        $(e.currentTarget)
          .closest('.alphabeth')
          .find('.letter a.active')
          .removeClass('active');
        if (letter !== '') $(e.currentTarget).addClass('active');

        this.clearPagination();
        this.loadMoreData(false);
      }
    });
  },
  methods: {
    clearPagination() {
      this.items = [];
      $('.animation.load-more')
        .removeClass('hidden')
        .attr({ 'data-more': 'true', 'data-next': '' });
    },
    loadMoreData: function(scroll = false) {
      const { more, next, id, letter } = $('.animation.load-more')[0].dataset;
      this.isActive = true;

      $('.title.replace').text(letter);

      if (JSON.parse(more)) {
        const itemType = $('#type').val();
        const orderBy = $('#order').val();
        const order = orderBy === 'date-added' ? 'desc' : 'asc';

        const { page_size: pageSize, page, sub } = getUrlVars(next);

        const opts = {
          page,
          pageSize,
          sub,
          order,
          orderBy,
          // itemType: itemType === 'All' ? '' : itemType,
          itemType: '',
          param: typeof letter === 'undefined' ? '' : `TitleGroupKey:${letter}`,
          device: 'web_browser',
          segments: [global.Country],
          useCustomId: constants[constants.environment].useBBCCustomID
        };

        const callback = (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            const { paging, items } = data.externalResponse;

            const elements = items.map(item => {
              const classification = this.classification(item);

              const {
                id,
                path,
                contextualTitle,
                shortDescription,
                images,
                type,
                customFields,
                offers,
                badge
              } = item;
              return {
                id,
                showId: id,
                type: type,
                classification,
                contextualTitle,
                shortDescription,
                path,
                images,
                isHD: this.isHD(item),
                isCC: this.isCC(item),
                customFields,
                offers,
                badge,
                hasClassification: classification !== ''
              };
            });

            if (scroll) {
              this.items.push(...elements);
            } else {
              this.items = elements;
              this.$slots.item = null;
            }

            if (paging) {
              $('.animation.load-more')
                .attr('data-more', paging.total !== paging.page)
                .attr('data-next', paging.next);
            }

            if (paging.total === paging.page) {
              $('.animation.load-more').addClass('hidden');
            }

            this.isActive = false;

            if (document.runImpressionTracker) {
              document.runImpressionTracker();
            }
          }
        };

        apiInstance.getList(id, opts, callback);
      }
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
    }
  }
};
</script>

<template>
  <fragment>
    <slot></slot>
    <slot name="item"></slot>
    <fragment v-if="items.length > 0">
      <div data-name-component="GridVue" class="row wrapper-items md-layout">
        <div class="item columns small-11 medium-6 large-4" v-for="item in items" :key="item.id">
          <card
            v-bind="{
            data: item,
            imageType: {
              type: 'tile',
              size: 'tile'
            },
            fullData: item,
            playNowText: ''
          }"
          >
            <fragment slot="bottom">
              <div class="title">{{ item.contextualTitle }}</div>
              <div class="description">{{ item.shortDescription }}</div>
            </fragment>
          </card>
        </div>
      </div>
    </fragment>
  </fragment>
</template>

<style scoped>
.loading {
  margin: 40px auto;
}
</style>
