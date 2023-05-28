<template>
  <div id="AppView">
    <router-view />
  </div>
</template>


<script>
import SideBar from './components/SideBar.vue'
import MapView from './components/MapView.vue'
import { onMounted } from 'vue'
import {KeyEventManager} from './utils/keyevent';
import {mixinWebsocket} from './utils/socket.js';

export default {
  name: 'App',
  mixins: [KeyEventManager, mixinWebsocket],
  created(){
    this.init();
    mixinWebsocket.methods.initWebsocket();
  },
}
</script>

<style>
#AppView {
  display: flex;
  justify-content:space-evenly;
  height: 100vh;
  width: 100vw;
}
</style>