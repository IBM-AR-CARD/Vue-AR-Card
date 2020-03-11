<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
}

html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>