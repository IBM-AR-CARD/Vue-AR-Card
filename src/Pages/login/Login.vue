<template>
  <div id="screen-main">
    <div class="left">
      <img class="left-logo" src="../../assets/logo.png" />
    </div>
    <div class="right">
      <div v-if="state == 'login'" class="container">
        <div class="container-title">
          <h1 class="md-title md-headline">IBM AR Business Card</h1>
          <h2>Welcome back! Please login to your account.</h2>
          <p class="error-message">{{errorMsg}}</p>
        </div>
        <form class="container-inputfield">
          <md-field>
            <label>Email</label>
            <md-input v-model="loginEmail"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="loginPassword" type="password"></md-input>
          </md-field>
        </form>
        <div class="loginstate">
          <md-checkbox v-model="remember">Remember me</md-checkbox>
          <!-- <md-button
            v-on:click="toForgot()"
            class="loginstate-forgot"
            :md-ripple="false"
          >Forgot Password</md-button>-->
        </div>
        <div class="container-buttons">
          <a v-on:click="onLogin()" class="buttons-login">Login</a>
          <a v-on:click="toRegister()" class="buttons-signup">Sign up</a>
        </div>
      </div>
      <div v-if="state == 'register'" class="container">
        <div class="main-container">
          <div class="container-title">
            <h1 class="md-title md-headline">IBM AR Business Card</h1>
            <h2>Please complete to create your account.</h2>
            <p class="error-message">{{errorMsg}}</p>
          </div>
          <form class="container-inputfield">
            <md-field>
              <label>UserName</label>
              <md-input v-model="registerUserName"></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="registerEmail"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input type="password" v-model="registerPassword"></md-input>
            </md-field>
            <md-field>
              <label>Comfirm Password</label>
              <md-input type="password" v-model="registerPasswordConfirm"></md-input>
            </md-field>
          </form>
          <!-- <md-checkbox v-model="agree">I agree with terms and conditions</md-checkbox> -->
          <a class="container-buttons-skip" v-on:click="onRegister()">Sign up</a>
          <a v-on:click="toLogin()" class="buttons-Already">Already have an account? Sign in.</a>
        </div>
      </div>
      <div v-if="state == 'forgot'" class="container">
        <div class="container-title">
          <h1 class="md-title md-headline">IBM AR Business Card</h1>
          <h2>Enter your email and we send you a password reset link.</h2>
          <p class="error-message">{{errorMsg}}</p>
        </div>
        <md-field>
          <label>Email</label>
          <md-input></md-input>
        </md-field>
        <div class="container-buttons">
          <a v-on:click="sendRequest()" class="buttons-login">Send request</a>
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
      this.errorMsg = "";
      this.state = "register";
    },
    toLogin() {
      this.errorMsg = "";
      this.state = "login";
    },
    toForgot() {
      this.state = "forgot";
    },
    sendRequest() {
      console.log("send request");
    },
    async onLogin() {
      try {
        let data = (
          await this.$http.post(this.$globalConfig.baseUrl + "/user/login", {
            email: this.loginEmail,
            password: this.loginPassword
          })
        ).data;
        this.errorMsg = "";
        this.$globalData.userData._id = data._id;
        this.$globalData.userData.token = data.token;
        this.$cookies.set("_id", data._id, "2147483647");
        this.$cookies.set("token", data.token, "2147483647");
        if (this.remember) {
          this.$cookies.set("email", this.loginEmail, "2147483647");
          this.$cookies.set("password", this.loginPassword, "2147483647");
          this.$cookies.set("remember", true, "2147483647");
        } else {
          this.$cookies.remove("email");
          this.$cookies.remove("password");
        }
        // console.log(this.$globalData.userData);
        // let profile = (
        //   await this.$http.post(this.$globalConfig.baseUrl + "/profile/get", {
        //     _id: this.$globalData.userData._id
        //   })
        // ).data;
        // Object.assign(this.$globalData.userData, profile);
        // console.log(this.$globalData.userData);
        this.$router.push("MyCards");
      } catch (error) {
        console.log(error);
        this.errorMsg = error.response.data.error;
      }
    },
    async onRegister() {
      this.errorMsg = "";
      if (!this.agree) {
        this.errorMsg = "please agree the term and conditions";
        return;
      } else if (
        !this.registerPassword &&
        this.registerPassword != this.registerPasswordConfirm
      ) {
        this.errorMsg = "password does not match";
        return;
      }
      try {
        await this.$http.post(this.$globalConfig.baseUrl + "/user/register", {
          username: this.registerUserName, // min length 3, max length 25
          email: this.registerEmail,
          password: this.registerPassword // min length 5, max length 25
        });
        this.errorMsg = "";
        let dataRegister = (
          await this.$http.post(this.$globalConfig.baseUrl + "/user/login", {
            email: this.registerEmail,
            password: this.registerPassword
          })
        ).data;
        this.$globalData.userData._id = dataRegister._id;
        this.$globalData.userData.token = dataRegister.token;
        this.$cookies.set("_id", dataRegister._id, "2147483647");
        this.$cookies.set("token", dataRegister.token, "2147483647");
        this.$cookies.set("email", this.registerEmail, "2147483647");
        this.$cookies.set("password", this.registerPassword, "2147483647");
        this.$cookies.set("remember", true, "2147483647");
        this.$router.push("MyCards");
      } catch (error) {
        console.log(error);
        this.errorMsg = error.response.data.error;
      }
    }
  },
  data: function() {
    return {
      state: "login",
      errorMsg: "",
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPasswordConfirm: "",
      registerPassword: "",
      registerUserName: "",
      remember: false,
      agree: true
    };
  },
  created: async function() {
    this.loginEmail = this.$cookies.get("email") ?? "";
    this.loginPassword = this.$cookies.get("password") ?? "";
    this.remember = this.$cookies.get("remember") == "true" ?? false;
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
.left-logo {
  margin-top: 15%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  min-width: 200px;
  width: 30%;
  display: none;
}
.left {
  background-image: url("../../assets/loginbackground.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
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
  /* padding-bottom: 20em; */
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

.error-message {
  color: deeppink;
  font-size: 1rem;
  text-align: center;
  display: block;
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
  margin: 0 auto;
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
    display: none;
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
