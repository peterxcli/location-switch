<template>
    <div class="video-container">
        <iframe src="https://www.youtube.com/embed/S17dSa1Vups?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&t=764"></iframe>
    </div>
    <div class="register-form">
        <h1>Register</h1>
        <form>
            <label for="username-input">User Name : </label>
            <br>
            <input id="username-input" type="text" placeholder="Your Username" v-model="username"/>
            <br>
            <label for="userId">User Id : </label>
            <br>
            <span id="userId">{{ userId }}</span>
            <br>
            <button @click="register">Register</button>
        </form>
    </div>
</template>

<script>

export default {
    name: 'RegisterView',
    data (){
      return {
        username: '',
        userId : '',
      }
    },
    mounted(){
        this.userId = this.generateUUID();
    },
    methods: {
      register() {
        if( this.username === '' ){
            alert('Please enter your username');
            return;
        }
        
        localStorage.setItem('username', this.username);
        localStorage.setItem('userId', this.userId);
        this.$router.push('/');
      },
      generateUUID(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
      }
    },
}
</script>

<style>
.video-container{
  width: 100vw;
  height: 100vh;
}

iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.register-form{
    color: rgb(34, 39, 43);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.register-form label{
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
}
.register-form input{
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(34, 39, 43);
    padding: 5px;
    margin: 5px;
    font-family: 'Roboto', sans-serif;
}
#userId{
    background: #dedede;
    display: block;
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(34, 39, 43);
    padding: 5px;
    margin: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: small;
    line-height: 30px;
}
.register-form button{
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(34, 39, 43);
    padding: 5px;
    margin: 5px;
    font-family: 'Roboto', sans-serif;
    background-color: rgb(34, 39, 43);
    color: white;
    cursor: pointer;
    margin-bottom: 30px;
}
</style>