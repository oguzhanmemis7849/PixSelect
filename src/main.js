import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueVideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'

import PopUp from './components/PopUp.vue'
import Video from './components/Video.vue'


Vue.config.productionTip = false
Vue.use(VueVideoPlayer)

Vue.component("Video",Video)
Vue.component("PopUp", PopUp)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
