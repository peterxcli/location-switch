<template>
  <div id="SideBar">
    <h1>This is SideBar</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NavBar',
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
</style>
