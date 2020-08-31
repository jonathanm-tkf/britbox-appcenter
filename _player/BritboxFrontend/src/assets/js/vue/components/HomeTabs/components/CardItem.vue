<script>
import { getUrlImageStatic } from '../../../../lib/global';

export default {
  props: {
    data: Object
  },
  computed: {
    type: function() {
      return this.data.type === 'episode'
        ? `${this.data.seasonTitle} - ${this.data.episodeName}`
        : this.data.type;
    },
    title: function() {
      return this.data.type === 'episode' ? this.data.showTitle : this.data.title;
    },
    classification: function() {
      return this.data.classification.name;
    },
    offer: function() {
      return this.data.offers.length > 0 ? this.data.offers.reduce(item => item).resolution : null;
    },
    isBadgeAvailable: function() {
      const badge = this.data?.badge;
      return typeof badge !== 'undefined';
    },
    badge: function() {
      const badge = this.data?.badge;
      return badge;
    },
    image: function() {
      return typeof this.data.images !== 'undefined'
        ? calculateSizeImage(this.data.images.poster, 'poster')
        : '';
    }
  }
};
</script>

<template>
  <div class="box">
    <div class="card">
      <div class="ribbon Blue-normal" v-if="isBadgeAvailable">{{badge}}</div>

      <div class="image pulsate">
        <img class="b-lazy" :data-src="image" />
      </div>
      <div class="card-content">
        <div class="card-content-inside">
          <div class="description">
            <div class="top-animation">
              <a href="#">
                <div class="top">Murder, Mystery, and My Family</div>
                <div class="inner-content">
                  <div class="season">
                    <div class="description">
                      The unlikely detective duo of Frank and Lu discover that not all is as
                      peaceful as it seems in the picturesque Stratford-upon-Avon, where fact is
                      stranger than fiction and low-life criminals get caught up in deliciously high
                      drama.
                    </div>
                    <div class="more-info">{{ type }} · S1 · E1</div>
                  </div>
                </div>
              </a>
            </div>
            <div class="actions bottom">
              <actions :data="{ itemid: 0, path: '/show/Absolutely_Fabulous_5930' }"></actions>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
