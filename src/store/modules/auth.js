import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../main";

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
    async login({ dispatch, commit }, { email, password }) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async logout() {
      await signOut(auth);
    },
  },
};
