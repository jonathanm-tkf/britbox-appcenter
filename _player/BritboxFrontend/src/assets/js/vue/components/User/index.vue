<script>
import { BritboxContentApi } from '../../../lib/sdk';
import { getPathURL } from '../../../lib/global';

import animationData from '../../../../animations/load.json';
import store from '../../store';

export default {
  data() {
    return {
      items: [],
      watchlistItem: false,
      windowWidth: window.innerWidth,
      animationData
    };
  },
  methods: {
    refreshLogin() {
      const watchlistElement = document.getElementById('watchlistlink');
      const { isLogged } = store.state.auth;
      if (isLogged && watchlistElement.children.length === 0) {
        const a = document.createElement('a');
        const link = document.createTextNode('Watchlist');
        a.appendChild(link);
        a.href = getPathURL('/account/watchlist');
        watchlistElement.appendChild(a);
        if (document.body.classList.contains('Watchlist-page')) {
          a.classList.add('active');
        }
      }
    }
  },
  computed: {
    loading() {
      return store.state.auth.loading;
    },
    isLogged() {
      const { isLogged } = store.state.auth;
      if (isLogged) {
        this.refreshLogin();
        this.items = [
          {
            id: 3,
            isLogged: true
          }
        ];
      } else {
        this.items = [
          {
            id: 1,
            isLogged: false,
            text: 'Sign In',
            path: getPathURL('/account/login?returnURL=' + window.location.pathname),
            outline: true
          },
          {
            id: 2,
            isLogged: false,
            text: 'Free Trial',
            path: getPathURL('/account/signup?returnURL=' + window.location.pathname),
            outline: false
          }
        ];
      }
      return store.state.auth.isLogged;
    },
    firstName() {
      return store.state.auth.firstName;
    }
  },
  mounted() {
    this.refreshLogin();
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'clearAuth') {
        $('.menu.profile').removeClass('active');
        document.getElementById('watchlistlink').innerHTML = '';
      }
    });
  },
  watch: {
    isLogged() {}
  }
};
</script>

<template>
  <fragment>
    <li v-if="loading">
      <div class="animation loading">
        <lottie :data="animationData" :loop="true" :autoplay="true" :height="45" :width="60" />
      </div>
    </li>
    <fragment v-else>
      <li v-for="item in items" :key="item.id" class="profile">
        <a href="#" data-menu="data-login" v-if="item.isLogged">
          <i class="icon-profile"></i>
          <span>{{firstName}}</span>
          <i class="icon-more"></i>
        </a>
        <a v-else :href="item.path" class="button" :class="{outline: item.outline}">{{item.text}}</a>
      </li>
      <li class="sign show-for-small" v-if="!isLogged">
        <a href="#" data-menu="data-nologged">
          <i class="icon-more"></i>
        </a>
      </li>
      <li class="profile-description show-for-small" v-if="isLogged && windowWidth <= 480">
        <i class="icon-profile"></i>
        <span>
          {{firstName}}
          <span>
            Manage Profiles
            <i class="icon-edit"></i>
          </span>
        </span>
      </li>
    </fragment>
  </fragment>
</template>

<style scoped>
.loading {
  margin-left: -20px;
  margin-bottom: -5px;
}
</style>
