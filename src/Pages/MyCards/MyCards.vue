<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" style="background-color: #F0F0F7 !important;">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button nav-left-menu-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <!-- <span class="md-title">IBM AR BUSINESS CARD</span> -->

        <div class="md-toolbar-section-end">
          <span class="toolbar-toprght-name">{{ firstname }} {{ lastname }}</span>
          <img
            v-on:click="showLogoutMessage = true"
            class="toolbar-toprght-icon"
            v-if="profile"
            v-bind:src="profile"
          />
          <div>
            <md-icon class="toolbar-toprght-icon" v-if="!profile">person</md-icon>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="showNavigation" md-swipeable md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title nav-title">IBM AR CARD</span>
        </md-toolbar>

        <md-list class="nav-list">
          <md-list-item
            v-on:click="toProfile()"
            v-bind:class="{ 'nav-list-item-onselect': state == 'profile' }"
            class="nav-list-item"
          >
            <md-icon color="white" class="nav-list-icon">person</md-icon>
            <span class="md-list-item-text nav-list-item-text">Profile</span>
          </md-list-item>

          <md-list-item
            v-on:click="toHistory()"
            v-bind:class="{ 'nav-list-item-onselect': state == 'history' }"
            class="nav-list-item"
          >
            <md-icon color="white" class="nav-list-icon">history</md-icon>
            <span class="md-list-item-text nav-list-item-text">Scan history</span>
          </md-list-item>

          <md-list-item
            class="nav-list-item"
            v-on:click="toFavourite()"
            v-bind:class="{ 'nav-list-item-onselect': state == 'favourite' }"
          >
            <md-icon color="white" class="nav-list-icon">favorite_outline</md-icon>
            <span class="md-list-item-text nav-list-item-text">Favourite</span>
          </md-list-item>
        </md-list>

        <md-list class="nav-list log-out-button">
          <md-list-item
            class="nav-list-item"
            onclick="window.location = 'http://ar-card.henryz.cc/'"
            style="user-select:none; cursor:pointer;"
          >
            <md-icon color="white" class="nav-list-icon">system_update</md-icon>
            <span class="md-list-item-text nav-list-item-text">Get the App</span>
          </md-list-item>
          <md-list-item class="nav-list-item" v-on:click="showLogoutMessage = true">
            <md-icon color="white" class="nav-list-icon">exit_to_app</md-icon>
            <span class="md-list-item-text nav-list-item-text">Log out</span>
          </md-list-item>
        </md-list>
        <!-- <md-button class="log-out-button">
          <md-icon color="white" class="nav-list-icon">exit_to_app</md-icon>
          <span class="md-list-item-text nav-list-item-text">Log out</span>
        </md-button>-->
      </md-app-drawer>
      <md-app-content class="md-scrollbar" style="background-color: #F0F0F7 !important;">
        <component v-bind:is="currentComponent"></component>
        <md-snackbar
          :md-duration="isInfinity ? Infinity : 4000"
          :md-active.sync="showSnackbar"
          md-persistent
        >
          <span>
            {{
              isInfinity
                ? "You haven't login, Please login"
                : "Network Error. please retry or try to login again!"
            }}
          </span>
          <md-button class="retry-button" @click="isInfinity ? toLogin() : onRetry()">{{
            isInfinity ? "Login" : "Retry"
          }}</md-button>
        </md-snackbar>
        <md-dialog-confirm
          :md-active.sync="showLogoutMessage"
          md-title="Would you like to logout of the system?"
          md-confirm-text="Logout"
          md-cancel-text="Cancel"
          @md-confirm="onConfirmLogout"
        />
        <md-dialog-alert
          :md-active.sync="logoutUnsuccess"
          md-content="Network error, please try again."
          md-confirm-text="OK"
        />
      </md-app-content>
    </md-app>
    <!-- </div> -->
    <!-- <md-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.</md-content> -->
  </div>
</template>

<script>
import Profile from "../../Component/Profile";
import HistoryList from "../../Component/HistoryList";
import FavouriteList from "../../Component/FavouriteList";
export default {
  name: "MyCards",
  components: {
    Profile,
    HistoryList,
    FavouriteList
  },
  data: () => ({
    _id: "",
    currentPage: "MyCards",
    showNavigation: false,
    showSidepanel: false,
    profile: null,
    image: "",
    state: "profile",
    firstname: "",
    lastname: "",
    description: "",
    experience: "",
    education: "",
    model: "",
    username: "",
    website: "",
    phone: "",
    dialogUser: null,
    email: "",
    gender: 0,
    showSnackbar: false,
    isInfinity: false,
    onEditName: false,
    updateProfileSuccess: true,
    showSaveSnackbar: false,
    showLogoutMessage: false,
    logoutUnsuccess: false
  }),
  created: async function() {
    await this.getProfileData();
  },
  computed: {
    currentComponent: function() {
      if (this.state == "profile") {
        return "Profile";
      } else if (this.state == "history") {
        return "HistoryList";
      } else {
        return "FavouriteList";
      }
    }
  },
  methods: {
    toProfile() {
      this.showNavigation = false;
      this.state = "profile";
    },
    toHistory() {
      console.log("to history");
      this.showNavigation = false;
      this.state = "history";
    },
    toFavourite() {
      console.log("to favourite");
      this.showNavigation = false;
      this.state = "favourite";
    },
    logOut() {
      console.log(this.$cookies);
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
      this.toLogin();
    },
    async onConfirmLogout() {
      let response = await this.$http.post(
        this.$globalConfig.baseUrl + "/user/logout",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$cookies.get("token")
          }
        }
      );
      if (response.status == 200) {
        this.logOut();
      } else {
        this.logOut();
        this.logoutUnsuccess = true;
      }
    },
    async getProfileData() {
      let _id = this.$cookies.get("_id");
      let token = this.$cookies.get("token");
      if (token == null || _id == null) {
        this.isInfinity = true;
        this.showSnackbar = true;
        return;
      }
      try {
        let profile = (
          await this.$http.post(this.$globalConfig.baseUrl + "/profile/get?_id=" + _id, {
            _id: _id
          })
        ).data;
        Object.assign(this.$globalData.userData, profile);
        let userData = this.$globalData.userData;
        this.username = userData.username;
        this._id = userData._id;
        this.profile = userData.profile;
        this.model = userData.model;
        this.website = userData.website;
        this.phone = userData.phone;
        this.email = userData.email;
        this.firstname = userData.firstname;
        this.lastname = userData.lastname;
        this.description = userData.description;
        this.experience = userData.experience;
        this.education = userData.experience;
        this.gender = userData.gender ?? 2;
      } catch (err) {
        this.isInfinity = false;
        this.showSnackbar = true;
      }
    },
    toLogin() {
      if (this.currentPage != "Login") {
        this.currentPage = "Login";
        this.$router.go(-1);
        return;
      }
    },
    async onRetry() {
      await this.getProfileData();
    },
    handleImageUpload() {
      this.image = this.$refs.imageUpload.files[0];
      this.submitFile();
      // console.log(this.image);
    },
    async submitFile() {
      let formData = new FormData();
      formData.append("file", this.image);
      try {
        let response = await this.$http.post(this.$globalConfig.baseUrl + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$cookies.get("token")
          }
        });
        this.profile = response.data.path;
      } catch (err) {
        this.isInfinity = false;
        this.showSnackbar = true;
      }
    },
    async profileUpdate() {
      try {
        this.showSaveSnackbar = false;
        let parseObject = {
          _id: this._id,
          username: this.username,
          profile: this.profile,
          firstname: this.firstname,
          lastname: this.lastname,
          description: this.description,
          experience: this.experience,
          education: this.education,
          gender: parseInt(this.gender),
          phone: this.phone,
          website: this.website,
          email: this.email,
          model: this.model
        };
        console.log(parseObject);
        await this.$http.post(this.$globalConfig.baseUrl + "/profile/update", parseObject, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("token")
          }
        });
        this.updateProfileSuccess = true;
        this.showSaveSnackbar = true;
      } catch (error) {
        this.updateProfileSuccess = false;
        this.showSaveSnackbar = true;
      }
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
h3 {
  margin-top: 0;
  font-size: 1.5rem;
  margin-right: 15%;
  color: #43425d;
}
.nav-list-item-end {
  background-color: #43425d;
  // border: 1px solid red;
}
.log-out-button {
  position: absolute;
  width: 100%;
  // left: calc(50% - 9em / 2);
  bottom: 3em;
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
  // text-transform: uppercase;
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
.md-content {
  background-color: white !important;
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
@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.retry-button {
  color: white !important;
  font-weight: bold;
}
.md-app-content {
  width: 100%;
  height: auto !important;
}
.page-container {
  height: 100%;
  overflow: hidden;
}
.md-app {
  height: 100%;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  background-color: #292b42 !important;
}
@media screen and (max-width: 945px) {
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
  .col-2 {
    width: 100%;
  }
  h3 {
    margin-right: 3em;
  }
}
</style>
