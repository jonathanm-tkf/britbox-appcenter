import Vuex, { mapState } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

import sharedMutations from 'vuex-shared-mutations';

const ls = new SecureLS({ isCompression: false });

const store = new Vuex.Store({
  state: {
    userData: {
      // watched: [], // Stores Continue Watching Id, date and postion => Where isFullyWatched = false
      // watchedList: {}, // Stores continue Watching items with all massive data => watchedList.items (store.state.userData.watchedList??)  => Where isFullyWatched = false
      bookmarks: [], // Stores only the id and date of the watchlist item
      // bookmarkList: Object,       // Stores watchlist items with all massive data => bookmarkList.items,
      error: false,
      isLogged: false
      // canStream: false,           // Entitlement Check
      // country: String,            // User Country
      // isInFreeTrial: false,       //
      // subscriptionStatus: String  // Not used
    },
    auth: {
      loading: true,
      isLogged: false,
      firstName: ''
    },
    userAdditionalData: {
      watchedHistoryList: [], // Stores full watched history of the user in an array format.
      lastVideoWatched: String,
      parentalPinValidated: false,
      parentalPinNumber: Number
    }
  },
  plugins: [
    createPersistedState({
      paths: ['auth', 'userData']
    }),
    sharedMutations({
      predicate: [
        'addBookmark',
        'removeBookmark',
        'removeContinueWatching',
        'clearAuth',
        'setAuth',
        'setWatchingHistoryData',
        'setLastVideoWatchedData'
      ]
    })
  ],
  // plugins: [
  // createPersistedState({
  //     storage: {
  //       getItem: key => ls.get(key),
  //       setItem: (key, value) => ls.set(key, value),
  //       removeItem: key => ls.remove(key)
  //     }
  //   })
  // ],
  mutations: {
    setAuthLoading(state) {
      state.auth.loading = true;
    },
    clearAuth(state) {
      state.auth = {
        firstName: '',
        isLogged: false,
        loading: false
      };
    },
    setAuth(state, payload) {
      state.auth = payload;
    },
    setUserData(state, payload) {
      state.userData = { ...payload, isLogged: true };
      this.commit('setAuth', { firstName: payload.firstName, isLogged: true, loading: false });
    },
    setUserDataError(state, payload) {
      state.userData.error = payload;
      this.commit('setAuth', { firstName: '', isLogged: false, loading: false });
      this.commit('clearUserData', { bookmarks: [], error: true, isLogged: false });
    },
    clearUserData(state, payload) {
      state.userData = payload;
    },
    setUserDataWatched(state, payload) {
      const { itemId, watchedInfo, itemInfo, lastWatchedDate, seconds } = payload;

      let updated = false;
      const { watched } = state.userData;
      let watchedList = [];

      watchedList = watched.map(item => {
        if (parseInt(itemId, 10) === parseInt(item.id, 10)) {
          updated = true;
          return {
            lastWatchedDate,
            firstWatchedDate: watchedInfo.firstWatchedDate,
            position: seconds,
            id: parseInt(watchedInfo.itemId, 10)
          };
        }

        return item;
      });

      const { watchedHistoryList } = state.userAdditionalData;
      let watchedHistoryListArray = [];

      watchedHistoryListArray = watchedHistoryList.map(item => {
        if (parseInt(itemId, 10) === parseInt(item.id, 10)) {
          return {
            lastWatchedDate,
            firstWatchedDate: watchedInfo.firstWatchedDate,
            position: seconds,
            id: parseInt(watchedInfo.itemId, 10)
          };
        }

        return item;
      });

      if (watchedList.length > 0) {
        state.userData.watched = watchedList;
      }

      if (watchedHistoryListArray.length > 0) {
        state.userAdditionalData.watchedHistoryList = watchedHistoryListArray;
      }

      // in case not exist CW
      if (!updated) {
        state.userData.watched = [
          {
            lastWatchedDate,
            firstWatchedDate: watchedInfo.firstWatchedDate,
            position: seconds,
            id: parseInt(watchedInfo.itemId, 10)
          },
          ...state.userData.watched
        ];

        state.userAdditionalData.watchedHistoryList = [
          {
            lastWatchedDate,
            firstWatchedDate: watchedInfo.firstWatchedDate,
            position: seconds,
            id: parseInt(watchedInfo.itemId, 10)
          },
          ...state.userAdditionalData.watchedHistoryList
        ];

        state.userData.watchedList.items = [{ ...itemInfo }, ...state.userData.watchedList.items];
      }
    },
    removeBookmark(state, payload) {
      state.userData.bookmarks = state.userData.bookmarks.filter(
        item => parseInt(item.id, 10) !== parseInt(payload.id, 10)
      );
      state.userData.bookmarkList.items = state.userData.bookmarkList.items.filter(
        item => parseInt(item.id, 10) !== parseInt(payload.id, 10)
      );
    },
    addBookmark(state, payload) {
      const { externalResponse, itemDetail } = payload.response;
      const { itemId: id, creationDate: date } = externalResponse;
      state.userData.bookmarks = [{ id, date }, ...(state.userData.bookmarks.length ? state.userData.bookmarks : [])];
      state.userData.bookmarkList.items = [
        { date, ...itemDetail },
        ...(state.userData.bookmarkList.items || [])
      ];
    },
    // Remove from Continue Watching state a item
    removeContinueWatching(state, payload) {
      state.userData.watched = state.userData.watched.filter(
        item => parseInt(item.id, 10) !== parseInt(payload.id, 10)
      );
      state.userData.watchedList.items = state.userData.watchedList.items.filter(
        item => parseInt(item.id, 10) !== parseInt(payload.id, 10)
      );
    },
    setWatchingHistoryData(state, payload) {
      const ids = Object.keys(payload.externalResponse);
      state.userAdditionalData.watchedHistoryList = ids.map(id => ({
        id,
        ...payload.externalResponse[id]
      }));
    },
    setLastVideoWatchedData(state, payload) {
      state.userAdditionalData.lastVideoWatched = payload;
    }
  }
});

export default store;

export { mapState };
