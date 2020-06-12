<template>
  <div class="wrapper" ref="root">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "app",
  components: {
    "app-header": Header
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.wrapper {
  width: 750px;
  height: 1462px;
  background: rgba(255, 255, 255, 1);
}
</style>
