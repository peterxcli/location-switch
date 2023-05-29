<template>
    <div class="MapView" id="map">
        <l-map ref="map" v-model:zoom="zoom" :center="myself">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>

            <template v-for="user in users" :key="user.id">
                <l-marker v-if="user.pos" :key="user.id" :lat-lng="user.pos">
                    <l-icon :icon-url="icon.type.black" :shadow-url="icon.shadowUrl" :icon-size="icon.iconSize"
                        :icon-anchor="icon.iconAnchor" :popup-anchor="icon.popupAnchor" :shadow-size="icon.shadowSize" />
                    <!-- 彈出視窗 -->
                    <l-popup>
                        {{ user.username }}
                    </l-popup>
                </l-marker>
            </template>

            <!-- check_in -->
            <l-marker :lat-lng="myself">
                <l-icon :icon-url="icon.type.red" :shadow-url="icon.shadowUrl" :icon-size="icon.iconSize"
                    :icon-anchor="icon.iconAnchor" :popup-anchor="icon.popupAnchor" :shadow-size="icon.shadowSize" />
                <!-- 彈出視窗 -->
                <l-popup>
                    {{ myself }}
                </l-popup>
            </l-marker>

        </l-map>

    </div>
</template>
  
<script>
import L from "leaflet";
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";

var mapObject = null;
var userMarker = null;
var posX = 25.042474;
var posY = 121.513729;
const step = 0.00005;

var isUp = false;
var isDown = false;
var isLeft = false;
var isRight = false;



export default defineComponent({
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LIcon
    },
    computed: {
        ...mapState({
            users: state => state.users.all,
            myself: state => state.myself.pos
        })
    },
    data() {
        return {
            streetMap: null,
            zoom: 18,
            icon: {
                type: {
                    black:
                        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
                    gold:
                        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
                    red:
                        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                },
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            checkInList: [],
        };
    },
    watch:{
		'$store.state.users.checkIn'(newVal, oldVal){
			this.checkInList = newVal;
	    },
    },
    mounted() {
    },
    name: 'MapView',
    methods: {
        async func() {
            // do something
        }
    },
    async created() {
        await this.$store.dispatch('users/getAllUsers')
    }
});
</script>

<style>
.MapView {
    flex: 3 1 0;
    color: #959595;
}

.map {
    height: 100vh;
}
</style>