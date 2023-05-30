<template>
    <div class="MapView" id="map">
        <l-map ref="map" v-model:zoom="zoom" :center="myself">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>

            <template v-for="user in users" :key="user.id">
                <l-marker v-if="user.pos && user.id != myUserId" :key="user.id" :lat-lng="user.pos" ref="userMarker" :options="{ id: user.id }">
                    <l-icon :icon-url="icon.type.black" :shadow-url="icon.shadowUrl" :icon-size="icon.iconSize"
                        :icon-anchor="icon.iconAnchor" :popup-anchor="icon.popupAnchor" :shadow-size="icon.shadowSize" />
                    <l-popup ref="userPopup">
                        <svg style="width: 10px;margin-left: -5px; margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        <strong>{{ user.username }}</strong>
                        <br>
                        <span>{{ user.message }}</span>
                    </l-popup>
                </l-marker>
            </template>

            <!-- myself -->
            <l-marker :lat-lng="myself">
                <l-icon :icon-url="icon.type.red" :shadow-url="icon.shadowUrl" :icon-size="icon.iconSize"
                    :icon-anchor="icon.iconAnchor" :popup-anchor="icon.popupAnchor" :shadow-size="icon.shadowSize" />
            </l-marker>

            <!-- check_in -->
            <template v-for="checkIn in checkInList" :key="checkIn.id">
                <l-marker v-if="checkIn.pos" :key="checkIn.id" :lat-lng="checkIn.pos">
                    <l-icon :icon-url="(checkIn.user == myUserName ? icon.type.green : icon.type.gold)"
                        :shadow-url="icon.checkInConfig.shadowUrl" :icon-size="icon.checkInConfig.iconSize"
                        :icon-anchor="icon.checkInConfig.iconAnchor" :popup-anchor="icon.checkInConfig.popupAnchor"
                        :shadow-size="icon.checkInConfig.shadowSize" />
                    <l-popup style="width: 300px;">
                        <p>
                            <strong>{{ checkIn.username }}</strong>
                            <span> at </span>
                            <span>( </span>
                            <strong>{{ checkIn.pos[0].toFixed(2) }}</strong>
                            <span>,</span>
                            <strong>{{ checkIn.pos[1].toFixed(2) }}</strong>
                            <span> )</span>
                            <br>
                            <span style="color: gray;">{{ checkIn.created_at.substr(0, 10).replace('-', '/') }}</span>
                        </p>
                        <p>{{ checkIn.content }}</p>
                        <div style="display: flex;justify-content: center;">
                            <img :src="checkIn.img" :alt="checkIn.img" style="width:80%;margin: auto 0;" />
                        </div>

                    </l-popup>
                </l-marker>
            </template>


        </l-map>

    </div>
</template>
  
<script>
import L from "leaflet";
import { defineComponent, ref } from 'vue';
import { mapState, mapActions } from 'vuex';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
import { mixinWebsocket } from '../utils/socket.js';

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
    mixins: [mixinWebsocket],
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
            myself: state => state.myself.pos,
            checkInList: state => state.users.checkIn,
        })
    },
    data() {
        return {
            myUserId: localStorage.getItem('userId') || 'fftgvghyuhuijikk',
            myUserName: localStorage.getItem('username') || 'Jason',
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
                    green:
                        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                },
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
                checkInConfig: {
                    iconSize: [22, 34],
                    iconAnchor: [10, 34],
                    popupAnchor: [1, -27],
                    shadowSize: [34, 34],
                }
            },
        };
    },
    watch: {
        '$store.state.users.message': {
            handler(newVal, oldVal) {
                console.log(this.$refs.userMarker)
                if (!this.$refs.userMarker) return;
                let marker = this.$refs.userMarker.find((marker) => marker.options.id === newVal.id);
                console.log('target marker', marker)
                marker.leafletObject.openPopup();
            },
        },
        '$store.state.myself.pos': {
            handler(newVal, oldVal) {
                console.log('myself pos change', newVal, oldVal)
                let data = {
                    'event': 'move',
                    'pos': newVal
                };
                // this.$refs.map.leafletObject.setView(newVal, this.zoom);
                mixinWebsocket.methods.websocketsend(JSON.stringify(data));
            }
        }
    },
    mounted() {
    },
    name: 'MapView',
    methods: {
        async func() {
            // do something
        },
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