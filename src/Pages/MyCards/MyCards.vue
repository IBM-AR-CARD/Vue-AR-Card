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
          <img class="toolbar-toprght-icon" v-if="profile" v-bind:src="profile" />
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
            <md-icon color="white" class="nav-list-icon">star_outline</md-icon>
            <span class="md-list-item-text nav-list-item-text">Favourite</span>
          </md-list-item>
        </md-list>
        <md-list class="nav-list log-out-button">
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
      <!-- <div class="card-container"> -->
      <md-app-content class="md-scrollbar" style="background-color: #F0F0F7 !important;">
        <div v-if="state == 'profile'">
          <md-card class="card-container-profile">
            <md-card-header>
              <div class="card-header-container" v-if="!onEditName">
                <div class="md-title">
                  <h1>
                    {{ firstname | capitalize }} {{ lastname | capitalize }}
                    <md-button
                      class="md-icon-button name-icon-edit"
                      @click="onEditName = !onEditName"
                    >
                      <md-icon>edit</md-icon>
                    </md-button>
                  </h1>

                  <h2>@{{ username }}</h2>
                </div>
              </div>
              <div class="card-header-container" v-if="onEditName">
                <div class="md-title col-2">
                  <!-- <md-field> -->
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label>First Name</label>
                        <md-input v-model="firstname" />
                      </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label>Last Name</label>
                        <md-input v-model="lastname" />
                      </md-field>
                    </div>
                    <md-button
                      class="md-icon-button name-icon-edit"
                      @click="onEditName = !onEditName"
                    >
                      <md-icon>done_all</md-icon>
                    </md-button>
                  </div>
                  <!-- </md-field> -->
                </div>
              </div>
            </md-card-header>
            <div class="top-detail-container">
              <div class="col-2">
                <md-card-content class="content-line">
                  <h3>Avatar:</h3>
                  <input
                    type="image"
                    v-bind:src="profile"
                    class="profile-image"
                    @click="$refs.imageUpload.click()"
                    v-if="profile"
                  />
                  <div v-if="!profile" @click="$refs.imageUpload.click()">
                    <md-icon class="profile-image md-size-4x">person</md-icon>
                  </div>
                  <input
                    type="file"
                    ref="imageUpload"
                    v-on:change="handleImageUpload()"
                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    style="display: none;"
                  />
                </md-card-content>
                <md-card-content class="content-line">
                  <md-field class="on-select">
                    <label class="select-label">Gender</label>
                    <md-select v-model="gender">
                      <md-option value="0">Male</md-option>
                      <md-option value="1">Female</md-option>
                      <md-option value="2">Perfer not to say</md-option>
                    </md-select>
                  </md-field>
                </md-card-content>
                <md-card-content class="content-line">
                  <md-field class="on-select">
                    <label class="select-label">Model</label>
                    <md-select v-model="model">
                      <md-option
                        v-for="item in $globalData.modalList"
                        v-bind:key="item"
                        v-bind:value="item"
                      >{{ item }}</md-option>
                    </md-select>
                  </md-field>
                </md-card-content>
              </div>
              <div class="col-2 start-from-bottom">
                <md-card-content class="content-line">
                  <md-field class="content-field">
                    <label class="content-field-label">Website</label>
                    <md-textarea v-model="website" md-autogrow></md-textarea>
                  </md-field>
                </md-card-content>
                <md-card-content class="content-line">
                  <md-field class="content-field">
                    <label class="content-field-label">Phone</label>
                    <md-textarea v-model="phone" md-autogrow></md-textarea>
                  </md-field>
                </md-card-content>
                <md-card-content class="content-line">
                  <md-field class="content-field">
                    <label class="content-field-label">Email</label>
                    <md-textarea v-model="email" md-autogrow></md-textarea>
                  </md-field>
                </md-card-content>
              </div>
            </div>
            <md-card-content class="content-line">
              <md-field class="content-field">
                <label class="content-field-label">Description</label>
                <md-textarea v-model="description" md-autogrow></md-textarea>
              </md-field>
            </md-card-content>
            <md-card-content class="content-line">
              <md-field class="content-field">
                <label class="content-field-label">Education</label>
                <md-textarea v-model="education" md-autogrow></md-textarea>
              </md-field>
            </md-card-content>
            <md-card-content class="content-line">
              <md-field class="content-field">
                <label class="content-field-label">Experience</label>
                <md-textarea v-model="experience" md-autogrow></md-textarea>
              </md-field>
            </md-card-content>
            <md-card-actions>
              <md-button @click="profileUpdate()" class="md-raised md-primary">Done</md-button>
              <md-button @click="getProfileData()" class="md-raised card-action-cancel">Cancel</md-button>
            </md-card-actions>
          </md-card>
          <md-snackbar :md-duration="4000" :md-active.sync="showSaveSnackbar">
            <span>
              {{
              updateProfileSuccess
              ? "You have successful update you profile"
              : "Connection timeout. please retry!"
              }}
            </span>
            <md-button
              class="retry-button"
              @click="profileUpdate()"
              v-if="!updateProfileSuccess"
            >Retry</md-button>
          </md-snackbar>
        </div>
        <div v-if="state == 'history'">
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
                    @click="onFavourite_History(dialogUser, dialogUser._id)"
                  >
                    <md-icon>favorite_border</md-icon>
                  </md-button>
                  <md-button
                    v-if="dialogUser && dialogUser.isFav"
                    class="md-icon-button"
                    @click="onNotFavourite_History(dialogUser, dialogUser._id)"
                  >
                    <md-icon>favorite</md-icon>
                  </md-button>
                  <md-button
                    class="md-icon-button"
                    @click="showDeleteDialog_History(dialogUser._id)"
                  >
                    <md-icon>delete</md-icon>
                  </md-button>
                  <md-button class="md-primary" @click="showDetailDialog = false">Close</md-button>
                </md-dialog-actions>
              </md-dialog-content>
            </md-dialog>
            <md-dialog-confirm
              :md-active.sync="confirmDeleteUser_History"
              md-title="'Do you whant to delete this user?'"
              md-confirm-text="Agree"
              md-cancel-text="Disagree"
              @md-confirm="onConfirmDelete_History"
            />
            <div class="search-field">
              <md-field>
                <label>Search</label>
                <md-input v-model.trim="searchText_History" @input="searchOnChange_History()"></md-input>
                <md-icon>search</md-icon>
              </md-field>
            </div>
            <md-card
              class="card"
              v-for="item in (historyDisplayList.slice(historyPageNumber*cards_per_page,(historyPageNumber*cards_per_page+cards_per_page)>=historyDisplayList.length?historyDisplayList.length:historyPageNumber*cards_per_page+cards_per_page))"
              v-bind:key="item._id"
              md-with-hover
            >
              <div @click="showUserDetail_History(item)">
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
                  @click="onNotFavourite_History(item, item.userid)"
                >
                  <md-icon>favorite</md-icon>
                </md-button>
                <md-button
                  class="md-icon-button"
                  v-if="!item.isFav"
                  @click="onFavourite_History(item, item.userid)"
                >
                  <md-icon>favorite_border</md-icon>
                </md-button>
                <md-button class="md-icon-button" @click="showDeleteDialog_History(item.userid)">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-card-actions>
            </md-card>
            <div class="page-list-numbers">
              <a
                class="page-list-number-each"
                v-for=" index in Array.from({ length: historyPageMaximum }, (x, i) => i)"
                v-bind:key="index"
                @click="historyPageNumber = index"
              >{{index}}</a>
            </div>
          </div>
          <md-snackbar :md-duration="1000" :md-active.sync="showHistorySnackbar">
            <span>{{ historySnackbarMessage }}</span>
          </md-snackbar>
        </div>
        <div v-if="state == 'favourite'">
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
                  <md-button
                    class="md-icon-button"
                    @click="showDeleteDialog_Favourite(dialogUser._id)"
                  >
                    <md-icon>delete</md-icon>
                  </md-button>
                  <md-button class="md-primary" @click="showDetailDialog = false">Close</md-button>
                </md-dialog-actions>
              </md-dialog-content>
            </md-dialog>
            <md-dialog-confirm
              :md-active.sync="confirmDeleteUser_Favourite"
              md-title="'Do you whant to delete this user?'"
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
        <md-snackbar
          :md-duration="isInfinity ? Infinity : 4000"
          :md-active.sync="showSnackbar"
          md-persistent
        >
          <span>
            {{
            isInfinity
            ? "You haven't login, Please login"
            : "Connection timeout. please retry!"
            }}
          </span>
          <md-button
            class="retry-button"
            @click="isInfinity ? toLogin() : onRetry()"
          >{{ isInfinity ? "Login" : "Retry" }}</md-button>
        </md-snackbar>
        <md-dialog-confirm
          :md-active.sync="showLogoutMessage"
          md-title="'Do you whant to logout?'"
          md-confirm-text="Yes"
          md-cancel-text="Cancel"
          @md-confirm="onConfirmLogout"
        />
        <md-dialog-alert
          :md-active.sync="logoutUnsuccess"
          md-content="Network error please try again"
          md-confirm-text="OK"
        />
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
    logoutUnsuccess: false,
    // history
    historyList: null,
    showDetailDialog: false,
    onRequest: false,
    showHistorySnackbar: false,
    historySnackbarMessage: "",
    confirmDeleteUser_History: false,
    onDeleteUserID: null,
    historyDisplayList: null,
    historyPageNumber: 0,
    historyPageMaximum: 0,
    searchText_History: "",
    searching_History: false,
    cards_per_page: 9,
    // favourite
    favouriteList: null,
    favouriteDisplayList: null,
    showFavouriteSnackbar: false,
    favouriteSnackbarMessage: "",
    confirmDeleteUser_Favourite: false,
    favouritePageNumber: 0,
    favouritePageMaximum: 0,
    searchText_Favourite: "",
    searching_Favourite: false
  }),
  created: async function() {
    await this.getProfileData();
    this.fetchFavouriteList();
    this.fetchHistoryList();
  },
  methods: {
    distoryHistory() {
      this.historyList = null;
      this.showDetailDialog = false;
      this.onRequest = false;
      this.showHistorySnackbar = false;
      this.historySnackbarMessage = "";
      this.confirmDeleteUser_History = false;
      this.onDeleteUserID = null;
      this.historyDisplayList = null;
      this.historyPageNumber = 0;
      this.historyPageMaximum = 0;
      this.searchText_History = "";
      this.searching_History = false;
    },
    destoryFavourite() {
      this.favouriteList = null;
      this.favouriteDisplayList = null;
      this.showFavouriteSnackbar = false;
      this.favouriteSnackbarMessage = "";
      this.confirmDeleteUser_Favourite = false;
      this.favouritePageNumber = 0;
      this.favouritePageMaximum = 0;
      this.searchText_Favourite = "";
      this.searching_Favourite = false;
    },
    toProfile() {
      console.log("toProfile");
      this.showNavigation = false;
      this.state = "profile";
      this.fetchFavouriteList();
      this.fetchHistoryList();
      this.searchText_Favourite = "";
      this.searchText_History = "";
      // this.historyList = null;
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
          await this.$http.post(
            this.$globalConfig.baseUrl + "/profile/get?_id=" + _id,
            {
              _id: _id
            }
          )
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
        this.$router.push("/");
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
        let response = await this.$http.post(
          this.$globalConfig.baseUrl + "/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
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
        await this.$http.post(
          this.$globalConfig.baseUrl + "/profile/update",
          parseObject,
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        this.updateProfileSuccess = true;
        this.showSaveSnackbar = true;
      } catch (error) {
        this.updateProfileSuccess = false;
        this.showSaveSnackbar = true;
      }
    },
    async fetchHistoryList() {
      let response;
      try {
        response = await this.$http.get(
          this.$globalConfig.baseUrl + "/history/get",
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
      } catch (err) {
        if (err.response.status == 401) {
          this.toLogin();

          return;
        } else {
          this.fetchHistoryList();
          return;
        }
      }
      this.historyList = response.data.list;
      this.historyDisplayList = response.data.list;
      let maximumNumber = this.historyList.length / this.cards_per_page;
      if (Math.floor(maximumNumber) < maximumNumber) {
        this.historyPageMaximum = Math.floor(maximumNumber) + 1;
      } else {
        this.historyPageMaximum = Math.floor(maximumNumber);
      }
    },
    async showUserDetail_History(user) {
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
    async onFavourite_History(user, id) {
      console.log("favourite");
      console.log(id);
      try {
        let response = await this.$http.post(
          this.$globalConfig.baseUrl + "/favorite/add",
          {
            userid: id
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        console.log(response);
        if (response.status == 200) {
          this.historySnackbarMessage = "success add to favourite";
          this.showHistorySnackbar = true;
          if (this.dialogUser) {
            this.dialogUser.isFav = true;
          }
          this.historyList.map((item, index) => {
            if (item.userid) {
              if (item.userid == id) {
                this.historyList[index].isFav = true;
              }
            } else {
              if (item._id == id) {
                this.historyList[index].isFav = true;
              }
            }
          });
          this.addIntoFavourite(id);
        } else {
          this.historySnackbarMessage = "fail to add to favourite";
          this.showHistorySnackbar = true;
        }
      } catch (error) {
        this.historySnackbarMessage = "fail to add to favourite";
        this.showHistorySnackbar = true;
        console.error(error);
      }
    },
    async onNotFavourite_History(user, id) {
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
          this.historySnackbarMessage = "success remove from favourite";
          this.showHistorySnackbar = true;
          if (this.dialogUser) {
            this.dialogUser.isFav = false;
          }
          this.historyList.map((item, index) => {
            if (item.userid) {
              if (item.userid == id) {
                this.historyList[index].isFav = false;
              }
            } else {
              if (item._id == id) {
                this.historyList[index].isFav = false;
              }
            }
          });
          console.log(response);
          this.deleteFromFavourite(id);
        } else {
          this.historySnackbarMessage = "fail to remove from favourite";
          this.showHistorySnackbar = true;
        }
      } catch (error) {
        this.historySnackbarMessage = "fail to remove from favourite";
        this.showHistorySnackbar = true;
        console.error(error);
      }
    },
    showDeleteDialog_History(id) {
      console.log(id);

      this.onDeleteUserID = id;
      this.confirmDeleteUser_History = true;
    },
    deleteFromHistory(userid) {
      let removeIndex = -1;
      let removeDisplayIndex = -1;
      for (let item of this.historyList) {
        if (item.userid == userid) {
          removeIndex = this.historyList.indexOf(item);
        }
      }
      for (let item of this.historyDisplayList) {
        if (item.userid == userid) {
          removeDisplayIndex = this.historyList.indexOf(item);
        }
      }
      if (removeIndex != -1) {
        this.historyList.splice(removeIndex, 1);
        this.historyDisplayList.splice(removeDisplayIndex, 1);
        this.showDetailDialog = false;
        this.historySnackbarMessage = "success delete this user";
        this.showHistorySnackbar = true;
      } else {
        this.historySnackbarMessage = "fail to delete this user";
        this.showHistorySnackbar = true;
      }
    },
    async onConfirmDelete_History() {
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
          this.deleteFromHistory(this.onDeleteUserID);
          this.deleteFromFavourite(this.onDeleteUserID);
        } else {
          this.historySnackbarMessage = "fail to delete this user";
          this.showHistorySnackbar = true;
        }
        this.onDeleteUserID = null;
      } catch (error) {
        this.onDeleteUserID = null;
        console.log(error);

        this.historySnackbarMessage = "fail to delete this user";
        this.showHistorySnackbar = true;
      }
    },
    async onCancelDelete_History() {
      this.onDeleteUserID = null;
    },
    searchOnChange_History() {
      if (this.searching_History) {
        return;
      }
      this.searching_History = true;
      this.historyPageNumber = 0;
      let searchString = this.searchText_History.toLowerCase();
      this.historyDisplayList = this.historyList.filter(user => {
        if (this.searchText_History == "") {
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

      this.searching_History = false;
    },
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
          this.toLogin();
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
      let removeDisplayIndex = -1;
      for (let item of this.favouriteList) {
        console.log(item.userid + userid);

        if (item.userid == userid) {
          removeIndex = this.favouriteList.indexOf(item);
        }
      }
      for (let item of this.favouriteDisplayList) {
        if (item.userid == userid) {
          removeDisplayIndex = this.favouriteDisplayList.indexOf(item);
        }
      }
      if (removeIndex != -1) {
        this.favouriteList.splice(removeIndex, 1);
        if (removeDisplayIndex != -1) {
          this.favouriteDisplayList.splice(removeDisplayIndex, 1);
        }
        this.showDetailDialog = false;
        this.favouriteSnackbarMessage = "success remove from favourite";
        this.showFavouriteSnackbar = true;
      } else {
        console.log("removeIndex == -1");

        this.favouriteSnackbarMessage = "fail to remove from favourite";
        this.showFavouriteSnackbar = true;
      }
    },
    addIntoFavourite(userid) {
      for (let item of this.historyList) {
        if (item.userid == userid) {
          this.favouriteList.push(item);
        }
      }

      this.searchOnChange_Favourite();
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

          this.deleteFromHistory(this.onDeleteUserID);
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
.top-detail-container {
  display: flex;
}
.nav-list-item-end {
  background-color: #43425d;
  // border: 1px solid red;
}
.name-edit-left {
  width: 5em;
}
.name-icon-edit {
  display: inline-block;
}
.select-label {
  font-size: 1.3rem !important;
  font-weight: bold;
}
.log-out-button {
  position: absolute;
  width: 100%;
  // left: calc(50% - 9em / 2);
  bottom: 3em;
}
.md-button-content {
  display: flex !important;
}
.main-content-header {
  font-size: 1.5rem;
}
.card-action-cancel {
  margin-left: 3em !important;
}
.content-line {
  display: flex;
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
.search-field {
  width: 100%;
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
.on-select {
  width: 100%;
}
.md-dialog-title {
  display: flex;
  justify-content: space-between;
}
.start-from-bottom {
  // align-content: flex-end;
  padding-top: 21px;
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
.retry-button {
  color: white !important;
  font-weight: bold;
}
.md-app-content {
  width: 100%;
  height: auto !important;
}
.card-container-profile {
  padding: 3em 10%;
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
  .card-container-profile {
    padding: 3em 0%;
  }
  .top-detail-container {
    flex-direction: column;
  }
  .col-2 {
    width: 100%;
  }
  h3 {
    margin-right: 3em;
  }
  .start-from-bottom {
    // align-content: flex-end;
    padding-top: 0;
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
