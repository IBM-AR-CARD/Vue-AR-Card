<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">IBM AR BUSINESS CARD</span>

        <div class="md-toolbar-section-end">
          <span class="toolbar-toprght-name">{{firstName }} {{lastName}}</span>
          <img class="toolbar-toprght-icon" v-bind:src="profile" />
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title nav-title">Menu</span>
        </md-toolbar>

        <md-list class="nav-list">
          <md-list-item class="nav-list-item nav-list-item-onselect">
            <md-icon color="white" class="nav-list-icon">person</md-icon>
            <span class="md-list-item-text nav-list-item-text">Profile</span>
          </md-list-item>

          <md-list-item class="nav-list-item">
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
      <md-app-content class="md-scrollbar card-container">
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
    state: "",
    firstname: "",
    lastname: "",
    description: "",
    experience: "",
    education: "",
    gender: 0
  }),
  created: function() {
    let userData = this.$globalData.userData;
    this.profile = userData.profile;
    this.firstName = userData.firstname;
    this.lastName = userData.lastname;
    this.description = userData.description;
    this.experience = userData.experience;
    this.education = userData.experience;
  }
};
</script>

<style lang="scss" scoped>
// .page-container {
//   // height: 100%;
//   overflow: hidden;
//   // position: relative;
//   // border: 1px solid rgba(#000, 0.12);
// }

// Demo purposes only
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
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  padding: 2em;
  justify-content: flex-start;
  overflow: auto;
}
.md-content {
  background-color: white !important;
}
.card {
  width: 32%;
  margin-bottom: 2em;
  max-width: 620px !important;
}

@media screen and (min-width: 821px) {
  .card {
    width: 30%;
    // max-width: 600px;
  }
}
@media screen and (max-width: 820px) {
  .card {
    width: 47%;
    // max-width: 600px;
  }
}
@media screen and (max-width: 720px) {
  .card {
    width: 100%;
  }
}
</style>