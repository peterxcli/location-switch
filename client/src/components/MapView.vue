<template>
    <div id="MapView">
        <div id="map"></div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import L from 'leaflet';


export default defineComponent({
    data() {
        return {
            streetMap: null,
        }
    },
    mounted() {
        this.streetMap = L.map('map', {
            center: [25.042474, 121.513729],
            zoom: 18,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 20,
        }).addTo(this.streetMap);
    },
    name: 'MapView',
    methods: {
        async func() {
            // do something
        }
    },
});
</script>
  
<style>
#MapView {
    flex: 3 1 0;
    color: #959595;
}
#map { height: 100vh; }
</style>
  