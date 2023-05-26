<script setup>
import SideBar from './components/SideBar.vue'
import MapView from './components/MapView.vue'
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
