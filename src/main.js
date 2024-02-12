import { createApp } from "vue";
import { createStore } from "vuex";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin";
import "materialize-css/dist/js/materialize.min.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrp3hbVk6l-WHuqnUDkuSgLAquxfdgJR8",
  authDomain: "crm-system-vue-13357.firebaseapp.com",
  projectId: "crm-system-vue-13357",
  storageBucket: "crm-system-vue-13357.appspot.com",
  messagingSenderId: "3017233156",
  appId: "1:3017233156:web:b9f9052964994f5a70b651",
  measurementId: "G-P49HEDYJ80",
};

const firebase = initializeApp(firebaseConfig);
getAnalytics(firebase);
export const auth = getAuth();
export const database = getDatabase();

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(messagePlugin);
    app.use(router);
    app.use(createStore(store));

    app.mount("#app");
  }
});
