<template>
  <MapView />
  <SideBar />
</template>

<script>
import SideBar from '../components/SideBar.vue'
import MapView from '../components/MapView.vue'
import { KeyEventManager } from '../utils/keyevent';
import { mixinWebsocket } from '../utils/socket.js';

export default {
  mixins: [KeyEventManager, mixinWebsocket],
  created() {
    this.init();
    mixinWebsocket.methods.initWebsocket();
  },
  components: {
    SideBar,
    MapView
  },
  name: 'HomeView',
  data() {
    return {
      // data
    }
  },
  methods: {
    async func() {
      // do something
    }
  },
}
</script>