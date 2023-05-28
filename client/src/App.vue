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

export default {
  name: 'App',
  mixins: [KeyEventManager],
  created(){
    this.init();
  },
  data() {
    return {
      KeyEventManager: null,
    }
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