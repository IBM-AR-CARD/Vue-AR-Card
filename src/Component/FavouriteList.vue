<template>
  <div>
    <div v-if="!favouriteList" class="card-container">
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
    <div v-if="favouriteList" class="card-container">
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
              @click="onFavourite_Favourite(dialogUser, dialogUser._id)"
            >
              <md-icon>favorite_border</md-icon>
            </md-button>
            <md-button
              v-if="dialogUser && dialogUser.isFav"
              class="md-icon-button"
              @click="onNotFavourite_Favourite(dialogUser, dialogUser._id)"
            >
              <md-icon>favorite</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="showDeleteDialog_Favourite(dialogUser._id)">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button class="md-primary" @click="showDetailDialog = false">Close</md-button>
          </md-dialog-actions>
        </md-dialog-content>
      </md-dialog>
      <md-dialog-confirm
        :md-active.sync="confirmDeleteUser_Favourite"
        md-title="Do you whant to delete this user?"
        md-confirm-text="Yes"
        md-cancel-text="Cancel"
        @md-confirm="onConfirmDelete_Favourite"
      />
      <div class="search-field">
        <md-field>
          <label>Search</label>
          <md-input v-model.trim="searchText_Favourite" @input="searchOnChange_Favourite()"></md-input>
          <md-icon>search</md-icon>
        </md-field>
      </div>
      <md-card
        class="card"
        v-for="item in (favouriteDisplayList.slice(favouritePageNumber*cards_per_page,(favouritePageNumber*cards_per_page+cards_per_page)>=favouriteList.length?favouriteList.length:favouritePageNumber*cards_per_page+cards_per_page))"
        v-bind:key="item._id"
        md-with-hover
      >
        <div @click="showUserDetail_Favourite(item)">
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
            @click="onNotFavourite_Favourite(item, item.userid)"
          >
            <md-icon>favorite</md-icon>
          </md-button>
          <md-button
            class="md-icon-button"
            v-if="!item.isFav"
            @click="onFavourite_Favourite(item, item.userid)"
          >
            <md-icon>favorite_border</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="showDeleteDialog_Favourite(item.userid)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
      <div class="page-list-numbers">
        <a
          class="page-list-number-each"
          v-for=" index in Array.from({ length: favouritePageMaximum }, (x, i) => i)"
          v-bind:key="index"
          @click="favouritePageNumber = index"
        >{{index}}</a>
      </div>
    </div>
    <md-snackbar :md-duration="1000" :md-active.sync="showFavouriteSnackbar">
      <span>{{ favouriteSnackbarMessage }}</span>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: "FavouriteList",
  data: () => ({
    favouriteList: null,
    favouriteDisplayList: null,
    showFavouriteSnackbar: false,
    favouriteSnackbarMessage: "",
    confirmDeleteUser_Favourite: false,
    favouritePageNumber: 0,
    favouritePageMaximum: 0,
    searchText_Favourite: "",
    searching_Favourite: false,
    dialogUser: null,
    showDetailDialog: false,
    cards_per_page: 9
  }),
  created: async function() {
    await this.fetchFavouriteList();
  },
  methods: {
    async fetchFavouriteList() {
      let response;
      try {
        response = await this.$http.get(
          this.$globalConfig.baseUrl + "/favorite/get",
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
      } catch (err) {
        if (err.response.status == 401) {
          this.$router.go(-1)
          return;
        } else {
          this.fetchFavouriteList();
          return;
        }
      }
      console.log(response);
      this.favouriteList = response.data.list;
      this.favouriteDisplayList = response.data.list;
      let maximumNumber = this.favouriteList.length / this.cards_per_page;
      if (Math.floor(maximumNumber) < maximumNumber) {
        this.favouritePageMaximum = Math.floor(maximumNumber) + 1;
      } else {
        this.favouritePageMaximum = Math.floor(maximumNumber);
      }
    },
    async showUserDetail_Favourite(user) {
      let id = user.userid;
      this.showDetailDialog = true;
      let response = await this.$http.post(
        this.$globalConfig.baseUrl + "/profile/get?_id=" + id
      );
      setTimeout(() => {
        this.dialogUser = response.data;
        this.dialogUser.isFav = user.isFav;
      }, 1000);
      console.log(response.data);
    },
    deleteFromFavourite(userid) {
      let removeIndex = -1;
      for (let item of this.favouriteList) {
        console.log(item.userid + userid);
        if (item.userid == userid) {
          removeIndex = this.favouriteList.indexOf(item);
        }
      }
      if (removeIndex != -1) {
        this.favouriteList.splice(removeIndex, 1);
        this.searchOnChange_Favourite();
        this.showDetailDialog = false;
        this.favouriteSnackbarMessage = "success remove from favourite";
        this.showFavouriteSnackbar = true;
      } else {
        console.log("removeIndex == -1");

        this.favouriteSnackbarMessage = "fail to remove from favourite";
        this.showFavouriteSnackbar = true;
      }
    },
    async onNotFavourite_Favourite(user, id) {
      console.log("not favourite");
      console.log(id);
      try {
        let response = await this.$http.post(
          this.$globalConfig.baseUrl + "/favorite/remove",
          {
            userid: id
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        if (response.status == 200) {
          this.deleteFromFavourite(id);
        } else {
          console.log("response != 200");

          this.favouriteSnackbarMessage = "fail to remove from favourite";
          this.showFavouriteSnackbar = true;
        }
      } catch (error) {
        this.favouriteSnackbarMessage = "fail to remove from favourite";
        this.showFavouriteSnackbar = true;
        console.error(error);
      }
    },
    async onConfirmDelete_Favourite() {
      try {
        let response = await this.$http.post(
          this.$globalConfig.baseUrl + "/history/remove",
          {
            userid: this.onDeleteUserID
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        if (response.status == 200) {
          console.log(response);
          this.deleteFromFavourite(this.onDeleteUserID);
        } else {
          this.favouriteSnackbarMessage = "fail to delete this user";
          this.showFavouriteSnackbar = true;
        }
        this.onDeleteUserID = null;
      } catch (error) {
        this.onDeleteUserID = null;
        console.log(error);

        this.favouriteSnackbarMessage = "fail to delete this user";
        this.showFavouriteSnackbar = true;
      }
    },
    showDeleteDialog_Favourite(id) {
      console.log(id);

      this.onDeleteUserID = id;
      this.confirmDeleteUser_Favourite = true;
    },
    searchOnChange_Favourite() {
      if (this.searching_Favourite) {
        return;
      }
      this.searching_Favourite = true;
      this.favouritePageNumber = 0;
      let searchString = this.searchText_Favourite.toLowerCase();
      this.favouriteDisplayList = this.favouriteList.filter(user => {
        if (this.searchText_Favourite == "") {
          return true;
        }
        if (user.name.toLowerCase().match(searchString)) {
          return true;
        }
        if (user.userid.toLowerCase().match(searchString)) {
          return true;
        }
        if (user.username.toLowerCase().match(searchString)) {
          return true;
        }
        return false;
      });

      this.searching_Favourite = false;
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
.page-list-numbers {
  margin-top: 2em;
  width: 100%;
  display: flex;
  justify-content: center;
}
.page-list-number-each {
  display: block;
  background-color: #d9d9df;
  margin: 0.5em;
  padding: 0.6em;
}
.card-header {
  font-size: 1.5em;
  line-height: 1rem;
  margin-bottom: 0.3em;
  margin-top: 0;
}

.md-content {
  padding: 16px;
}

.search-field {
  width: 100%;
}

.card-container {
  // box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
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
.md-dialog-title {
  display: flex;
  justify-content: space-between;
}
.content-field-label {
  font-weight: bold;
  font-size: 1.5rem !important;
  margin-bottom: 1em !important;
  color: #43425d;
}
.profile-image {
  width: 96px;
  height: 96px;
  vertical-align: text-top;
}
.page-container {
  height: 100%;
  overflow: hidden;
}
.md-dialog-title-left {
  margin-right: 2em;
}
.md-dialog-title-right {
  margin-left: 2em;
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
}
@media screen and (max-width: 620px) {
  .card {
    margin: 01em 0 !important;
    width: 100%;
  }
  .card-containe {
    padding: 0 !important;
  }
  .col-2 {
    width: 100%;
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
