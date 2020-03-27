<template>
  <div>
    <div v-if="!historyList" class="card-container">
      <md-card
        class="card"
        v-for="index in Array.from({ length: 9 }, (x, i) => i)"
        v-bind:key="index"
      >
        <md-card-content>
          <md-progress-bar md-mode="indeterminate"></md-progress-bar>
        </md-card-content>
        <md-card-content>
          <md-progress-bar md-mode="indeterminate"></md-progress-bar>
        </md-card-content>
        <md-card-content>
          <md-progress-bar md-mode="indeterminate"></md-progress-bar>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>
    <div v-if="historyList" class="card-container">
      <md-dialog
        :md-active.sync="showDetailDialog"
        :md-fullscreen="false"
        @md-closed="
                () => {
                  this.dialogUser = null;
                }
              "
      >
        <md-dialog-content class="md-scrollbar">
          <md-dialog-title v-if="dialogUser">
            <div class="md-dialog-title-left" v-if="dialogUser">
              <div class="md-title">{{ dialogUser.firstname }} {{ dialogUser.lastname }}</div>
              <div class="md-subhead">@{{ dialogUser.username }}</div>
            </div>
            <img
              v-if="dialogUser"
              class="profile-image md-dialog-title-right"
              v-bind:src="dialogUser.profile"
            />
            <md-progress-bar v-if="!dialogUser" md-mode="indeterminate"></md-progress-bar>
          </md-dialog-title>
          <md-divider></md-divider>
          <md-content v-if="dialogUser">
            <label class="md-body-2">Gender:</label>
            <span v-if="dialogUser.gender == 0">Male</span>
            <span v-if="dialogUser.gender == 1">Female</span>
            <span v-if="dialogUser.gender == 2">Perfer not to say</span>
          </md-content>
          <md-content v-if="dialogUser">
            <label class="md-body-2">Model:</label>
            {{ dialogUser.model }}
          </md-content>
          <md-content v-if="dialogUser && dialogUser.email">
            <span class="md-body-2">Email:</span>
            {{ dialogUser.email }}
          </md-content>
          <md-content v-if="dialogUser && dialogUser.website">
            <span class="md-body-2">Website:</span>
            <a v-bind:href="dialogUser.website">
              {{
              dialogUser.website
              }}
            </a>
          </md-content>
          <md-content v-if="dialogUser && dialogUser.phone">
            <span class="md-body-2">Phone:</span>
            {{ dialogUser.phone }}
          </md-content>
          <md-content v-if="dialogUser && dialogUser.description != ''">
            <label class="md-body-2">Description:</label>
            <p>{{ dialogUser.description }}</p>
          </md-content>
          <md-content v-if="dialogUser && dialogUser.experience != ''">
            <label class="md-body-2">Experience:</label>
            <p>{{ dialogUser.experience }}</p>
          </md-content>
          <md-content v-if="dialogUser && dialogUser.education != ''">
            <label class="md-body-2">Education:</label>
            <p>{{ dialogUser.education }}</p>
          </md-content>
          <md-content v-if="!dialogUser">
            <md-progress-bar md-mode="indeterminate"></md-progress-bar>
          </md-content>
          <md-content v-if="!dialogUser">
            <md-progress-bar md-mode="indeterminate"></md-progress-bar>
          </md-content>
          <md-content v-if="!dialogUser">
            <md-progress-bar md-mode="indeterminate"></md-progress-bar>
          </md-content>
          <md-dialog-actions>
            <md-button
              v-if="dialogUser && !dialogUser.isFav"
              class="md-icon-button"
              @click="onFavourite(dialogUser, dialogUser._id)"
            >
              <md-icon>favorite_border</md-icon>
            </md-button>
            <md-button
              v-if="dialogUser && dialogUser.isFav"
              class="md-icon-button"
              @click="onNotFavourite(dialogUser, dialogUser._id)"
            >
              <md-icon>favorite</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="showDeleteDialog(dialogUser._id)">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button class="md-primary" @click="showDetailDialog = false">Close</md-button>
          </md-dialog-actions>
        </md-dialog-content>
      </md-dialog>
      <md-dialog-confirm
        :md-active.sync="confirmDeleteUser"
        md-title="'Do you whant to delete this user?'"
        md-confirm-text="Agree"
        md-cancel-text="Disagree"
        @md-confirm="onConfirmDelete"
      />
      <md-card class="card" v-for="item in historyList" v-bind:key="item._id" md-with-hover>
        <div @click="showUserDetail(item)">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ item.name }}</div>
              <div class="md-subhead">@{{ item.username }}</div>
            </md-card-header-text>

            <md-card-media>
              <img v-bind:src="item.profile" alt="People" />
            </md-card-media>
          </md-card-header>
        </div>
        <md-card-actions>
          <md-button
            class="md-icon-button"
            v-if="item.isFav"
            @click="onNotFavourite(item, item.userid)"
          >
            <md-icon>favorite</md-icon>
          </md-button>
          <md-button
            class="md-icon-button"
            v-if="!item.isFav"
            @click="onFavourite(item, item.userid)"
          >
            <md-icon>favorite_border</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="showDeleteDialog(item.userid)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>
    <md-snackbar :md-duration="4000" :md-active.sync="showHistorySnackbar">
      <span>{{ historySnackbarMessage }}</span>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: "HistoryList"
};
</script>


<style lang="scss" scoped>
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
.md-dialog-title-left {
  margin-right: 2em;
}
.md-dialog-title-right {
  margin-left: 2em;
}
.profile-image {
  width: 96px;
  height: 96px;
  // clip-path: circle(64px at center);
  // display: block;
  vertical-align: text-top;
}
.content-line {
  display: flex;
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
  .card-container-profile {
    padding: 3em 2%;
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
  .card-container {
    padding: 0 !important;
  }
  .card-container-profile {
    padding: 3em 0%;
  }
  .top-detail-container {
    flex-direction: column;
  }
  h3 {
    margin-right: 3em;
  }
  .md-dialog-title {
    flex-direction: column;
  }
  .md-dialog-title-right {
    margin-left: 0;
    margin-top: 1em;
  }
}
</style>