<template>
  <div id="SideBar">
    <div class="nav-bg">
      <h1 style="color: #fff; text-align: center; margin: 0;">{{ username }}</h1>
    </div>
    <!-- postion form -->
    <div class="row">
      <div class="icon-col">
        <svg style="fill: rgb(63, 79, 104);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"/></svg>
      </div>
      <div class="form-col">
        <form class="pos-form">
          <label for="lat-input">lat:</label>
          <input id="lat-input" type="text" placeholder="25.042474"/>
          <label for="lon-input">lon:</label>
          <input id="lon-input" type="text" placeholder="121.513729"/>
          <button type="button" @click="updatePosition">Go</button>
        </form>
      </div>
    </div>

    <!-- check in form -->
    <div class="row">
      <div class="icon-col">
        <svg style="fill: rgb(211, 0, 0);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
      </div>
      <div class="form-col">
        <form class="check-in-form">
          <label for="url-input">image url:</label>
          <br>
          <input id="url-input" type="text" placeholder="https://img.url.com/321"/>
          <br>
          <label for="content-input">content:</label>
          <br>
          <input id="content-input" type="text" placeholder="check in post ..."/>
          <br>
          <button type="button" @click="updatePosition">check in</button>
        </form>
      </div>
    </div>

    <!-- broadcast form -->
    <div class="row">
      <div class="icon-col">
        <svg style="fill: rgb(63, 79, 104);height: 40px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
      </div>
      <div class="form-col">
        <form class="broadcast-form">
          <input id="lon-input" type="text" placeholder="Aa"/>
          <button type="button" @click="updatePosition">Send</button>
        </form>
      </div>
    </div>

    <div class="nav-bg">
      <h5 style="color: #fff;text-align: center; margin: 0;">location switcher</h5>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NavBar',
    data (){
      return {
        username : localStorage.getItem('username') || 'Jason',
      }
    },
    methods: {
      async func() {
        // do something
      }
    },
});
</script>

<style>
#SideBar {
  flex: 1 1 0;
  color: #353535;
}
#SideBar .nav-bg{
  background-color: #353535;
  padding: 20px;
}
#SideBar .row{
  display: flex;
  justify-content: space-between;
}
#SideBar .icon-col{
  flex: 1 1 0;
  background-color: #f2f2f2;
  text-align: center;
}
#SideBar .form-col{
  flex: 5 1 0;
  background-color: #f2f2f2;
  padding-left: 5px;
}

.form-col label{
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.form-col input{
  height: 20px;
  border-radius: 5px;
  border: 1px solid rgb(72, 73, 75);
  padding: 5px;
  margin: 5px;
  font-family: 'Roboto', sans-serif;
}
.form-col button{
  color: #fff;
  height: 30px;
  border-radius: 5px;
  background-color: #353535;
  border: 1px solid rgb(72, 73, 75);
  padding: 5px 10px;
  margin: 5px;
  font-family: 'Roboto', sans-serif;
}

.icon-col{
  padding-top: 20px;
}
.icon-col svg{
  width: 18px;
  margin: 0 auto;
}

#SideBar form{
  padding: 20px 0px;
}
.pos-form input{
  margin-left: 10px;
  width: 50px;
  margin-right: 10px;
}
.pos-form button{
  margin-left: 10px;
}

</style>
