import { ref, child, get } from "firebase/database";
import { database } from "@/main";

export default {
  state: { user: {} },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = {};
    },
  },
  actions: {
    async getUser({ dispatch, commit }) {
      const uid = await dispatch("getUid");

      const dbRef = ref(database);

      try {
        const snapshot = await get(child(dbRef, `users/${uid}/info`));
        if (snapshot.exists()) {
          commit("setUser", snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {}
    },
  },
  getters: {
    user: (state) => state.user,
  },
};
