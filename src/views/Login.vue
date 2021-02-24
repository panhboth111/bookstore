<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-0>
        <v-card flat color="transparent">
          <v-card-title class="d-flex justify-center display-2">
            <span>BOO</span><span class="green--text">KER</span>
          </v-card-title>
          <v-card-text class="pt-4">
            <div>
              <v-form @submit.prevent="login">
                <v-text-field
                  label="Enter your e-mail address"
                  name="email"
                  v-model="email"
                  required
                  outlined
                  color="green"
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  name="password"
                  type="password"
                  v-model="password"
                  required
                  outlined
                  color="green"
                ></v-text-field>
                <v-btn block color="green" type="submit" dark>Login</v-btn>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async login() {
      try {
        const data = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace({ name: "Books" });
        localStorage.setItem("loggedIn", 1);
      } catch (error) {
        alert("Incorrect credentials provided");
      }
    },
  },
};
</script>

<style></style>
