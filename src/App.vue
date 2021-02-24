<template>
  <v-app>
    <AppBar v-if="$route.path !== '/login'" />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/Layouts/AppBar";
import { mapGetters } from "vuex";
import firebase from "firebase";
import { db } from "./main";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  components: {
    AppBar,
  },
  data: () => ({}),
  methods: {
    async authorization() {
      const authed = localStorage.getItem("loggedIn");
      console.log(this.$route.path);
      if (this.$route.path != "/login" && authed == 0) {
        window.location.replace("/login");
      }
      console.log(authed);
    },
  },
  async created() {
    await this.authorization();
  },
};
</script>
