<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" style="background-color: #F0F0F7 !important;">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button nav-left-menu-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <!-- <span class="md-title">IBM AR BUSINESS CARD</span> -->

        <div class="md-toolbar-section-end">
          <span class="toolbar-toprght-name">{{firstName }} {{lastName}}</span>
          <img class="toolbar-toprght-icon" v-bind:src="profile" />
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="showNavigation" md-swipeable md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title nav-title">IBM AR CARD</span>
        </md-toolbar>

        <md-list class="nav-list">
          <md-list-item
            v-on:click="toProfile()"
            v-bind:class="{ 'nav-list-item-onselect': state=='profile' }"
            class="nav-list-item"
          >
            <md-icon color="white" class="nav-list-icon">person</md-icon>
            <span class="md-list-item-text nav-list-item-text">Profile</span>
          </md-list-item>

          <md-list-item
            v-on:click="toHistory()"
            v-bind:class="{ 'nav-list-item-onselect': state=='history' }"
            class="nav-list-item"
          >
            <md-icon color="white" class="nav-list-icon">history</md-icon>
            <span class="md-list-item-text nav-list-item-text">Scan history</span>
          </md-list-item>

          <md-list-item class="nav-list-item">
            <md-icon color="white" class="nav-list-icon">star_outline</md-icon>
            <span class="md-list-item-text nav-list-item-text">Favourite</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <!-- <div class="card-container"> -->
      <md-app-content class="md-scrollbar" style="background-color: #F0F0F7 !important;">
        <div v-if="state == 'history'" class="card-container">
          <md-card class="card" v-for="index in [1,2,3,4,5]" v-bind:key="index">
            <md-card-header>
              <div class="md-title">Card without hover effect</div>
            </md-card-header>
            <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.</md-card-content>

            <md-card-actions>
              <md-button>Action</md-button>
              <md-button>Action</md-button>
            </md-card-actions>
          </md-card>
        </div>
        <div v-if="state == 'profile'">
          <md-card>
            <md-card-header>
              <div class="card-header-container">
                <div class="md-title col-2">
                  <h1>{{firstName | capitalize}} {{lastName | capitalize}}</h1>
                  <h2>@{{username}}</h2>
                </div>
              </div>
              <img class="card-header-image" v-bind:src="profile" />
            </md-card-header>
            <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.</md-card-content>

            <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.</md-card-content>
          </md-card>
        </div>
        <md-snackbar
          :md-duration="isInfinity ? Infinity : duration"
          :md-active.sync="showSnackbar"
          md-persistent
        >
          <span>{{isInfinity ? 'You haven\'t login, Please login' : 'Connection timeout. please retry!' }}</span>
          <md-button
            class="retry-button"
            @click="isInfinity? toLogin():onRetry()"
          >{{isInfinity ? 'Login' : 'Retry'}}</md-button>
        </md-snackbar>
      </md-app-content>
    </md-app>
    <!-- </div> -->
    <!-- <md-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.</md-content> -->
  </div>
</template>

<script>
export default {
  name: "MyCards",
  data: () => ({
    showNavigation: false,
    showSidepanel: false,
    profile: "",
    state: "profile",
    firstname: "",
    lastname: "",
    description: "",
    experience: "",
    education: "",
    username: "",
    gender: 0,
    showSnackbar: false,
    isInfinity: false
  }),
  created: async function() {
    await this.getProfileData();
  },
  methods: {
    toProfile() {
      this.state = "profile";
    },
    toHistory() {
      this.state = "history";
    },
    async getProfileData() {
      let _id = this.$cookie.get("_id");
      let token = this.$cookie.get("token");
      if (token == null || _id == null) {
        this.isInfinity = true;
        this.showSnackbar = true;
        return;
      }
      try {
        let profile = (
          await this.$http.post(this.$globalConfig.baseUrl + "/profile/get", {
            _id: _id
          })
        ).data;
        Object.assign(this.$globalData.userData, profile);
        let userData = this.$globalData.userData;
        this.username = userData.username;
        this.profile = userData.profile;
        this.firstName = userData.firstname;
        this.lastName = userData.lastname;
        this.description = userData.description;
        this.experience = userData.experience;
        this.education = userData.experience;
      } catch (err) {
        this.isInfinity = false;
        this.showSnackbar = true;
      }
    },
    toLogin() {
      this.$router.push("/");
    },
    async onRetry() {
      await this.getProfileData();
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-duration: 0.5s;
}
h1 {
  line-height: 3rem;
  margin-bottom: 0em;
  color: #43425d;
}
h2 {
  font-weight: normal;
  margin-top: 0em;
  font-size: 1rem;
}
@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.card-header-image {
  width: 90px;
  height: 90px;
  clip-path: circle(45px at center);
  display: block;
}
.retry-button {
  color: white !important;
  font-weight: bold;
}
.md-app-content {
  // height: auto !important;
  width: 100%;
  // padding: 0 !important;
  height: auto !important;
}
.page-container {
  height: 100%;
  overflow: hidden;
}
.md-app {
  // height: 100% !important;
  height: 100%;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  background-color: #292b42 !important;
}

.md-content {
  padding: 16px;
}
.toolbar-toprght-icon {
  width: 50px;
  height: 50px;
  clip-path: circle(25px at center);
}
.toolbar-toprght-name {
  font-size: 1.3rem;
  text-transform: uppercase;
  margin-right: 1em;
}

.nav-list-item {
  background-color: #43425d;
  margin-bottom: 0.5em;
}

.nav-list-item-onselect {
  background-color: #504e6d;
  margin-bottom: 0.5em;
}
.nav-list {
  background-color: #292b42 !important;
}
.nav-list-item-text {
  color: white;
}

.nav-list-icon {
  color: white !important;
}

.nav-list-icon svg {
  fill: white;
}
.nav-title {
  color: white !important;
  font-weight: bold;
}
.card-container {
  // box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
  // justify-content: ;
  overflow: auto;
}
.md-content {
  background-color: white !important;
}
.card {
  // box-sizing: border-box;
  // height: 300px;
  width: 29%;
  margin-bottom: 2em;
  margin: 0.5em 0;
  max-width: 640px !important;
  min-width: 300px;
  // max-height: 230px !important;
}
.nav-left-menu-button {
  display: none;
}
.col-1 {
  width: 23%;
}
.col-2 {
  width: 47%;
}
.col-3 {
  width: 73%;
}
.col-4 {
  width: 98%;
}
.card-header-container {
  // display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 945px) {
  .card {
    width: 100%;
    // max-width: 600px;
    margin-bottom: 1em;
  }
  .md-drawer {
    width: 60px !important;
  }
  .nav-left-menu-button {
    display: none !important;
  }
  .nav-list-item-text {
    display: none !important;
  }
  .nav-title {
    display: none !important;
  }
}
@media screen and (max-width: 620px) {
  .card {
    margin: 01em 0 !important;
    width: 100%;
  }
  .nav-left-menu-button {
    display: block !important;
  }
  .md-drawer {
    width: 220px !important;
  }
  .nav-list-item-text {
    display: block !important;
  }
  .nav-title {
    display: block !important;
  }
  .card-containe {
    padding: 0 !important;
  }
}
</style>