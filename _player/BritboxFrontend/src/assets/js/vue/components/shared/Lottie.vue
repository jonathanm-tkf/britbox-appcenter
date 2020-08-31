<template>
  <div :style="style" ref="lavContainer"></div>
</template>

<script>
  let lottieWeb;
  if (!Vue.prototype.$isServer) {
    lottieWeb = require('lottie-web/build/player/lottie_light.js');
  }
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      loop: Boolean,
      autoplay: {
        type: Boolean,
        default: true
      },
      settings: Object,
      height: Number,
      width: Number
    },
    data() {
      return {
        animation: null
      };
    },
    computed: {
      style() {
        let style = {};
        if (this.width) {
          style.width = this.width + 'px';
        }
        if (this.height) {
          style.height = this.height + 'px';
        }
        return style;
      }
    },
    methods: {
      play() {


         this.$nextTick(() => {
          if (this.animation === null) {
            // this.initialize();
          }
         });
          this.$nextTick(() => {
          if (this.animation) {
              // console.log('play Lottie');
            this.animation.play();
          }
         });
      },
      pause() {
        if (this.animation) {
          // console.log('pause lottie');
          this.animation.pause();

          this.$nextTick(() => {
            this.animation.destroy()
            this.animation = null
          });

          
         
        }
      },
      stop() {
        if (this.animation) {
          // console.log('stop lottie');
          this.animation.stop();
          this.animation.destroy()
          this.animation = null
          
        }




      },
      setSpeed(val) {
        if (this.animation) {
          this.animation.setSpeed(val);
        }
      },
      goToAndStop(val) {

        if (this.animation) {
          this.animation.goToAndStop(val);
        }
      },
      initialize() {
        if (lottieWeb) {
          this.animation = lottieWeb.loadAnimation({
            container: this.$refs.lavContainer,
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.autoplay,
            animationData: JSON.parse(JSON.stringify(this.data)),
            rendererSettings: this.settings
          });
        }
      }

    },
    mounted() {
      this.initialize();
      // console.log('initialize lootie');
    }
  };
</script>
