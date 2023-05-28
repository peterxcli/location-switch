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

document.addEventListener(`keydown`, e => {

    if (e.code == `KeyW` || e.code == `ArrowUp`) {
        posX += step;
    } else if (e.code == `KeyS` || e.code == `ArrowDown`) {
        posX -= step;
    }

    if (e.code == `KeyA` || e.code == `ArrowLeft`) {
        posY -= step;
    } else if (e.code == `KeyD` || e.code == `ArrowRight`) {
        posY += step;
    }

    if (e.code == `KeyW` || e.code == `ArrowUp`) {
        isUp = true;
    } else if (e.code == `KeyS` || e.code == `ArrowDown`) {
        isDown = true;
    }

    if (e.code == `KeyA` || e.code == `ArrowLeft`) {
        isLeft = true;
    } else if (e.code == `KeyD` || e.code == `ArrowRight`) {
        isRight = true;
    }

    posX += isUp ? step : 0;
    posX -= isDown ? step : 0;
    posY -= isLeft ? step : 0;
    posY += isRight ? step : 0;

    // mapObject.panTo([posX, posY]);
    // userMarker.setLatLng([posX, posY]).update();
});

document.addEventListener(`keyup`, e => {
    if (e.code == `KeyW` || e.code == `ArrowUp`) {
        isUp = false;
    } else if (e.code == `KeyS` || e.code == `ArrowDown`) {
        isDown = false;
    }

    if (e.code == `KeyA` || e.code == `ArrowLeft`) {
        isLeft = false;
    } else if (e.code == `KeyD` || e.code == `ArrowRight`) {
        isRight = false;
    }
});


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
                        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
                },
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }
        };
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