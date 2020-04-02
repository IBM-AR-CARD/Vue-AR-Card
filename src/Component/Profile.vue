<template>
  <div>
    <md-card class="card-container-profile">
      <md-card-header>
        <div class="card-header-container" v-if="!onEditName">
          <div class="md-title">
            <h1>
              {{ firstname | capitalize }} {{ lastname | capitalize }}
              <md-button class="md-icon-button name-icon-edit" @click="onEditName = !onEditName">
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
              <md-button class="md-icon-button name-icon-edit" @click="onEditName = !onEditName">
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
        ? "You have successfully updated you profile"
        : "Connection timeout. please retry or try to login again."
        }}
      </span>
      <md-button class="retry-button" @click="profileUpdate()" v-if="!updateProfileSuccess">Retry</md-button>
    </md-snackbar>
  </div>
</template>
<script>
export default {
  name: "Profile",
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
  methods: {
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
        this.education = userData.education;
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
.top-detail-container {
  display: flex;
}
.name-icon-edit {
  display: inline-block;
}
.select-label {
  font-size: 1.3rem !important;
  font-weight: bold;
}
.card-action-cancel {
  margin-left: 3em !important;
}
.content-line {
  display: flex;
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
.on-select {
  width: 100%;
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
@media screen and (max-width: 945px) {
  .card {
    width: 100%;
    // max-width: 600px;
    margin-bottom: 1em;
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
  .card-container {
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
}
</style>