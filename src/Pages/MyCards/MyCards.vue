<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">IBM AR BUSINESS CARD</span>

      <div class="md-toolbar-section-end">
        <span class="toolbar-toprght-name">{{firstName }} {{lastName}}</span>
        <img class="toolbar-toprght-icon" v-bind:src="profile" />
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>person</md-icon>
          <span class="md-list-item-text">Profile</span>
        </md-list-item>

        <md-list-item>
          <md-icon>history</md-icon>
          <span class="md-list-item-text">Scan history</span>
        </md-list-item>

        <md-list-item>
          <md-icon>star_outline</md-icon>
          <span class="md-list-item-text">Favourite</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.</md-content>
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
.page-container {
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
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
</style>