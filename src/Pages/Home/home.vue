<template>
  <div id="screen-main">
    <div class="left"></div>
    <div class="right">
      <div class="container">
        <HomeLogin></HomeLogin>
      </div>
    </div>
  </div>
</template>

<script>
import HomeLogin from "../../components/HomeLogin";
export default {
  name: "home",
  components: {
    HomeLogin
  }
};
</script>

<style scoped>
.container {
  width: 60%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  padding-bottom: 20em;
  vertical-align: middle;
}

input:focus {
  outline: none;
}

.left {
  width: 50%;
  display: inline-block;
  background-color: #1f2234;
}

.right {
  width: 50%;
  align-items: center;
  display: flex;
}
@media screen and (max-width: 1190px) {
  .left {
    width: 20;
  }
  .right {
    width: 80%;
  }
  .container {
    width: 80%;
  }
}
@media screen and (max-width: 720px) {
  .left {
    width: 0;
  }
  .right {
    width: 100%;
  }
  .container {
    width: 90%;
  }
}

#screen-main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>