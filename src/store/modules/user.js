import { child, get, getDatabase, ref } from "firebase/database";
import { set } from "firebase/database";
import { auth, database, i18n } from "@/main";

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
    async writeUserData({ commit }, { uid, name, email }) {
      try {
        set(ref(database, "users/" + uid + "/info"), {
          id: uid,
          bill: 0,
          name,
          email,
          locale: "ru-Ru",
        });
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async getUser({ dispatch, commit }) {
      const uid = await dispatch("getUid");

      const dbRef = ref(database);

      try {
        const snapshot = await get(child(dbRef, `users/${uid}/info`));
        if (snapshot.exists()) {
          commit("setUser", snapshot.val());
          localStorage.setItem("crm-locale", snapshot.val().locale);
        }
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async updateUser({ dispatch, commit, getters }, updatedFields) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const updatedData = { ...getters.user, ...updatedFields };
        set(ref(db, `users/${uid}/info`), updatedData);
        commit("setUser", updatedData);
        if (updatedFields?.locale) {
          i18n.locale = updatedFields.locale;
          localStorage.setItem("crm-locale", updatedFields.locale);
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
