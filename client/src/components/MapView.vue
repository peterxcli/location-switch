<template>
    <div id="MapView">
        <div id="map"></div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import L from 'leaflet';

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

	mapObject.panTo([ posX , posY ]);
    userMarker.setLatLng([ posX , posY ]).update();
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
    computed: {
        ...mapState({
            users: state => state.users.all
        })
    },
    data() {
        return {
            streetMap: null,
        }
    },
    mounted() {
        mapObject = L.map('map', {
            center: [posX, posY],
            zoom: 18,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 20,
        }).addTo(mapObject);

        userMarker = L.marker([posX,posY]).addTo(mapObject);
    },
    name: 'MapView',
    methods: {
        async func() {
            // do something
        }
    },
    async created() {
        await this.$store.dispatch('users/getAllUsers')
        let users = this.$store.state.users.all;
        for (let id in users) {
            const user = {...users[id]};
            console.log(user);
            if (!user.hasOwnProperty('pos')) continue;
            const pos = Object.values(user.pos);
            console.log(pos);
            L.marker([pos[0], pos[1]]).addTo(mapObject);
        }
    }
});
</script>

<style>
#MapView {
    flex: 3 1 0;
    color: #959595;
}

#map {
    height: 100vh;
}
</style>