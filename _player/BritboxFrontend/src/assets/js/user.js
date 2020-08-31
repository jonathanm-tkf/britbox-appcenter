// /* eslint-disable no-underscore-dangle */
import { Plugin } from 'vue-fragment';
import VModal from 'vue-js-modal';
import store from './vue/store';
import Actions from './vue/components/shared/Actions.vue';
import Card from './vue/components/shared/Card.vue';
import Lottie from './vue/components/shared/Lottie.vue';
import { getData } from './vue/services';
import { BritboxAccountApi } from './lib/sdk';

import Button from './vue/components/shared/Next.vue';

Vue.use(Plugin);
Vue.use(VModal);

global.NextComponentClass = null;
const ComponentClass = Vue.extend(Button);
global.NextComponentClass = ComponentClass;

Vue.component('actions', Actions);
Vue.component('card', Card);
Vue.component('lottie', Lottie);

global.headerVM = new Vue({
  el: '.main-header',
  components: {
    user: () => import('./vue/components/User/index.vue')
  },
  store
});

global.bodyVm = new Vue({
  el: '.main-content',
  components: {
    'episode-tabs': () => import('./vue/components/EpisodeTabs/index.vue'),
    'home-tabs': () => import('./vue/components/HomeTabs/index.vue'),
    watchlist: () => import('./vue/components/Watchlist/index.vue'),
    grid: () => import('./vue/components/Grid/index.vue')
  },
  data: {
    videoId: 0,
    isNextVideo: false
  },
  beforeCreate() {
    getData();
  },
  store,
  // computed: {
  //  item: function () {
  //    return this.data;
  //  }
  // },
  methods: {
    beforeClose: event => {
      global.bodyVm.$root.$data.isNextVideo = false;
      $('.modal-overlay').removeClass('hide');
    },
    beforeOpen: event => {
      global.bodyVm.$root.$data.videoId = event.params.videoId;
      global.bodyVm.$root.$data.isNextVideo = event.params.isNextVideo;
    },
    parentalControlModalOpened(event) {

      // if Next video
      $('body').removeClass('overflow');
      $('.modal-overlay, .modal').removeClass('active move playing splash');
      $('.player-next-episode').remove();

      let intent = 0;

      const loginpin = new global.libs.Pinlogin(document.querySelector('#loginpin'), {
        fields: 4,
        reset: true,
        hideinput: true,
        pattern: '^[0-9]$',
        autofocus: true,
        type: 'tel',
        input: (e, field, nr) => {
          $('#parentalControlPIN-message').removeClass('active');
        },

        complete: pin => {
          // Remove Invalid PIN MESSAGE
          $('#parentalControlPIN-message').removeClass('active');
          const validateParentalControlPINCallback = (error, data) => {
            if (error) {
              // Error Trying to check the Parental Control
              intent = 0;
            } else {
              // Check Response:
              const { response, token } = data;
              const { validateParentalControlPINResponseMessage } = response;
              const { responseCode } = validateParentalControlPINResponseMessage;
              // responseCode = 1 => Valid PIN
              // responseCode = 0 => Invalid PIN
              if (responseCode === '1') {
                if (intent === 0) {
                  $('.modal-overlay, .modal').addClass('active');
                  $('body').addClass('overflow');
                  // Open Video Player
                  global.buildVideo(global.bodyVm.$root.$data.videoId, false, token);
                  this.$modal.hide('modal-Logged-parental-control');

                  intent = 1;
                }
              } else {
                // PIN ERROR : SHow error Message
                $('#parentalControlPIN-message').addClass('active');

                intent = 0;
              }
            }
          };
          // Call Validate PIN
          const apiInstance = new BritboxAccountApi.ProfileApi();
          const opts = {
            request: `{ ParentalControlPin:${pin}, ItemId: ${global.bodyVm.$root.$data.videoId}}` // string
          };
          apiInstance.validateParentalControlPIN(opts, validateParentalControlPINCallback);
        }
      });
    }
  }
});
