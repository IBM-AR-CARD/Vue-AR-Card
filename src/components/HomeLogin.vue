<template>
  <div>
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
    <div class="container-loginstate">
      <md-checkbox>Remember me</md-checkbox>
      <md-button class="container-loginstate-forgot" :md-ripple="false">Forgot Password</md-button>
    </div>
    <div class="container-buttons">
      <a href class="container-buttons-login">Login</a>
      <a href class="container-buttons-signup">Sign up</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
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
a:link {
  text-decoration: none;
}

a:hover,
a:focus {
  text-decoration: none;
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

input:focus {
  outline: none;
}
md-button {
  font-size: 2rem;
}
.container-inputfield {
  margin-top: 2em;
}

.container-inputfield {
  display: flex;
  flex-direction: column;
}

.container-loginstate {
  display: flex;
  justify-content: space-between;
}

.container-loginstate-a {
  font-size: 1.2rem;
}
.container-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
}
.container-loginstate-forgot {
  /* font-family: Roboto, Noto Sans, -apple-system, BlinkMacSystemFont, sans-serif !important; */
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}
.container-buttons a {
  font-size: 1rem;
  display: block;
  padding: 0.8em 3em;
  border-radius: 4px;
  user-select: none;
}
.container-buttons-login,
.container-buttons-login:link,
.container-buttons-login:focus,
.container-buttons-login:hover {
  color: white !important;
  background-color: #43425d;
}

.container-buttons-signup {
  color: #4d4f5c;
  border: 1px solid #4d4f5c;
}

#screen-main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>