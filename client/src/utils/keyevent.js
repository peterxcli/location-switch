import { mapMutations } from 'vuex';


export const KeyEventManager = {
    data(){
        return{
            lat: 25.042474,
            lon: 121.513729,
            speed : 0.0001,
            isUp: false,
            isDown: false,
            isLeft: false,
            isRight: false,
        }
    },
    mounted() {
        const pos = this.$store.getters['myself/getPos'];
        this.lat = pos[0];
        this.lon = pos[1];
    },
    methods: {
        ...mapMutations('myself', ['updPos']),
        init() {
            document.addEventListener(`keydown`, e => {
                if (e.code != `KeyW` && e.code != `ArrowUp` && e.code != `KeyS` && e.code != `ArrowDown` && e.code != `KeyA` && e.code != `ArrowLeft` && e.code != `KeyD` && e.code != `ArrowRight`) return;
                if (e.code == `KeyW` || e.code == `ArrowUp`) {
                    this.lat += this.speed;
                } else if (e.code == `KeyS` || e.code == `ArrowDown`) {
                    this.lat -= this.speed;
                }
            
                if (e.code == `KeyA` || e.code == `ArrowLeft`) {
                    this.lon -= this.speed;
                } else if (e.code == `KeyD` || e.code == `ArrowRight`) {
                    this.lon += this.speed;
                }
            
                if (e.code == `KeyW` || e.code == `ArrowUp`) {
                    this.isUp = true;
                } else if (e.code == `KeyS` || e.code == `ArrowDown`) {
                    this.isDown = true;
                }
            
                if (e.code == `KeyA` || e.code == `ArrowLeft`) {
                    this.isLeft = true;
                } else if (e.code == `KeyD` || e.code == `ArrowRight`) {
                    this.isRight = true;
                }
            
                this.lat += this.isUp ? this.speed : 0;
                this.lat -= this.isDown ? this.speed : 0;
                this.lon -= this.isLeft ? this.speed : 0;
                this.lon += this.isRight ? this.speed : 0;

                this.$store.dispatch("myself/setPos", [ parseFloat(this.lat) , parseFloat(this.lon) ] );
            
            });
            
            document.addEventListener(`keyup`, e => {
                if (e.code == `KeyW` || e.code == `ArrowUp`) {
                    this.isUp = false;
                } else if (e.code == `KeyS` || e.code == `ArrowDown`) {
                    this.isDown = false;
                }
            
                if (e.code == `KeyA` || e.code == `ArrowLeft`) {
                    this.isLeft = false;
                } else if (e.code == `KeyD` || e.code == `ArrowRight`) {
                    this.isRight = false;
                }
            });
        },
    }
}