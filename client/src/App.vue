<template>
  <div id="AppView">
    <router-view />
  </div>
</template>


<script>
import SideBar from './components/SideBar.vue'
import MapView from './components/MapView.vue'
import { onMounted } from 'vue'
// import {KeyEventManager} from './utils/keyevent';
// import {mixinWebsocket} from './utils/socket.js';

export default {
  name: 'App',
  // mixins: [KeyEventManager, mixinWebsocket],
  created() {
    // this.init();
    // mixinWebsocket.methods.initWebsocket();
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.$store.dispatch("myself/setPos", [latitude, longitude]);

      // Do something with the position
    };

    const error = (err) => {
      console.log(error)
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error);
  },
}
</script>

<style>
#AppView {
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  width: 100vw;
}
</style>