<script setup>
import SideBar from './components/SideBar.vue'
import MapView from './components/MapView.vue'
import { onMounted } from 'vue'

</script>

<template>
  <div id="AppView">
    <router-view />
  </div>
</template>

<style>
#AppView {
  display: flex;
  justify-content:space-evenly;
  height: 100vh;
  width: 100vw;
}
</style>
