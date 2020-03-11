<template>
  <div id="screen-main">
    <div class="left"></div>
    <div class="right">
      <div v-if="state == 'login'" class="container">
        <div class="container-title">
          <h1 class="md-title md-headline">IBM AR Business Card</h1>
          <h2>Welcome back! Please login to your account.</h2>
        </div>
        <form class="container-inputfield">
          <md-field>
            <label>UserName</label>
            <md-input></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input></md-input>
          </md-field>
        </form>
        <div class="loginstate">
          <md-checkbox>Remember me</md-checkbox>
          <md-button class="loginstate-forgot" :md-ripple="false">Forgot Password</md-button>
        </div>
        <div class="container-buttons">
          <a href class="buttons-login">Login</a>
          <a v-on:click="toRegister()" class="buttons-signup">Sign up</a>
        </div>
      </div>
      <div v-if="state == 'register'" class="container">
        <div class="main-container">
          <div class="container-title">
            <h1 class="md-title md-headline">IBM AR Business Card</h1>
            <h2>Please complete to create your account.</h2>
          </div>
          <form class="container-inputfield">
            <md-field>
              <label>FirstName</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>LastName</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>UserName</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>Comfirm Password</label>
              <md-input></md-input>
            </md-field>
          </form>
          <md-checkbox>I agree with terms and conditions</md-checkbox>
          <a class="container-buttons-skip">Skip</a>
          <a v-on:click="toLogin()" class="buttons-Already">Already have an account? Sign in.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    toRegister() {
      this.state = "register";
    },
    toLogin() {
      this.state = "login";
    }
  },
  data: function() {
    return {
      state: "login"
    };
  }
};
</script>
<style lang="scss" scoped>
a:link,
a:hover,
a {
  text-decoration: none !important;
  color: black !important;
}
</style>
<style scoped>
#screen-main {
  display: flex;
  width: 100%;
  height: 100%;
}
h1 {
  font-size: 2rem;
  text-align: center;
  line-height: 2rem;
  color: #43425d;
  font-weight: bold;
}

a {
  color: #43425d;
}

h2 {
  font-weight: normal;
  font-size: 1rem;
  text-align: center;
  opacity: 0.7;
}
form {
  display: block;
}
label {
  /* font-size: 0.5rem; */
  user-select: none;
}

input {
  font-size: 1.5rem;
  border: none;
  border-bottom: 1px solid grey;
  margin-bottom: 1em;
}

md-button {
  font-size: 2rem;
}
div {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-duration: 1s;
}
@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.container {
  width: 60%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  padding-bottom: 20em;
  vertical-align: middle;
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

.container-inputfield {
  margin-top: 2em;
}

.container-inputfield {
  display: flex;
  flex-direction: column;
}

/* for login */

.loginstate {
  display: flex;
  justify-content: space-between;
}

.container-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
}
.loginstate-forgot {
  /* font-family: Roboto, Noto Sans, -apple-system, BlinkMacSystemFont, sans-serif !important; */
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}

.buttons-login,
.buttons-login:link,
.buttons-login:focus,
.buttons-login:hover {
  font-size: 1rem;
  display: block;
  padding: 0.8em 3em;
  border-radius: 4px;
  user-select: none;
  color: white !important;
  background-color: #43425d;
}

.buttons-signup {
  color: #4d4f5c;
  border: 1px solid #4d4f5c;
  font-size: 1rem;
  display: block;
  padding: 0.8em 3em;
  border-radius: 4px;
  user-select: none;
}

/* for register */

.container-buttons-skip {
  font-size: 1rem;
  display: block;
  user-select: none;
  padding: 1em 3em;
  color: white !important;
  background-color: #43425d;
  border-radius: 3px;
  text-align: center;
  margin: 2em auto;
  align-self: center;
}

.buttons-Already {
  color: #43425d !important;
  align-self: center;
}

.main-container {
  display: flex;
  flex-direction: column;
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
    /* padding-top: 5em; */
    padding-bottom: 0;
    width: 90%;
  }
  .right {
    align-items: flex-start;
  }
}
</style>