<template>
    <MapView />
    <SideBar />
</template>

<script>
import SideBar from '../components/SideBar.vue'
import MapView from '../components/MapView.vue'

export default {
    components: {
        SideBar,
        MapView
    },
    name: 'HomeView',
    data (){
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