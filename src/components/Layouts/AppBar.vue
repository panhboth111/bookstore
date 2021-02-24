<template>
  <div v-if="user.data !== null">
    <v-app-bar flat fixed app>
      <v-app-bar-nav-icon light @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn outlined color="green" class="mr-4">
        {{ user.data.displayName }}
      </v-btn>
      <v-btn rounded color="red" dark outlined @click="signOut"
        ><v-icon>{{ icons.signout }}</v-icon></v-btn
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" color="#2D2D2D" dark left fixed app>
      <v-list-item-title
        class="pa-3 display-1 text-center font-weight-light white--text"
      >
        <span>BOO</span><span class="green--text">KER</span>
      </v-list-item-title>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {
  mdiBook as books,
  mdiCog as settings,
  mdiAccount as users,
  mdiFormatAlignJustify as navIcon,
  mdiPowerStandby as signout,
} from "@mdi/js";
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data: () => ({
    icons: {
      navIcon,
      signout,
    },
    drawer: true,
    items: [
      { title: "Books", icon: books, to: "/" },
      { title: "Users", icon: users, to: "/users" },
      { title: "Settings", icon: settings, to: "/settings" },
    ],
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async signOut() {
      await firebase.auth().signOut();
      this.$router.replace({ name: "Login" });
      localStorage.setItem("loggedIn", 0);
    },
  },
};
</script>

<style></style>
