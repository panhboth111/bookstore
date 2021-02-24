import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBhOGRVdFbjPSmzx0b2gNNUFk26J-c2mDM",
  authDomain: "bookstore-e0f28.firebaseapp.com",
  projectId: "bookstore-e0f28",
  storageBucket: "bookstore-e0f28.appspot.com",
  messagingSenderId: "678150220573",
  appId: "1:678150220573:web:f927a44f5dc7e26110cff4",
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
firebase.auth().onAuthStateChanged(async (user) => {
  const account = await db
    .collection("accounts")
    .doc(user.uid)
    .get();
  store.dispatch("fetchUser", { ...user, ...account.data() });
});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
