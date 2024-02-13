import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/main";

export default {
  actions: {
    async register({ dispatch, commit }, data) {
      const { email, password, name } = data;
      try {
        await createUserWithEmailAndPassword(auth, email, password, name);
        const uid = await dispatch("getUid");
        await dispatch("writeUserData", { uid, name, email });
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("clearUser");
    },
  },
};
