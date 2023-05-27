<script setup>
import SideBar from './components/SideBar.vue'
import MapView from './components/MapView.vue'
import { onMounted } from 'vue'
onMounted(() => {
  if (window.localStorage.getItem('userId') == null) {
    window.localStorage.setItem('userId', Math.random().toString(36).substr(2, 9))
  }
})
</script>

<template>
  <div id="AppView">
    <MapView />
    <SideBar />
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
