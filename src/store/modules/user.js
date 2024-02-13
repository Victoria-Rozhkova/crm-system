import { child, get, ref } from "firebase/database";
import { set } from "firebase/database";
import { auth, database } from "@/main";

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
    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
    async writeUserData({}, { uid, name, email }) {
      set(ref(database, "users/" + uid + "/info"), {
        id: uid,
        bill: 0,
        name,
        email,
      });
    },
    async getUser({ dispatch, commit }) {
      const uid = await dispatch("getUid");

      const dbRef = ref(database);

      try {
        const snapshot = await get(child(dbRef, `users/${uid}/info`));
        if (snapshot.exists()) {
          commit("setUser", snapshot.val());
        }
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
  },
  getters: {
    user: (state) => state.user,
  },
};
