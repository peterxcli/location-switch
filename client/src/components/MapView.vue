<template>
    <div id="MapView">
        <div id="map"></div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import L from 'leaflet';

var mapObject = null;
var posX = 25.042474;
var posY = 121.513729;
const step = 0.0001;

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
    data() {
        return {
            streetMap: null,
        }
    },
    mounted() {

        mapObject = L.map('map', {
            center: [ posX , posY ],
            zoom: 18,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 20,
        }).addTo(mapObject);
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
  