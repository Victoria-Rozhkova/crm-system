import { v4 } from "uuid";
import { set, ref, get, child, getDatabase } from "firebase/database";
import { database } from "@/main";

export default {
  actions: {
    async getCategories({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(database);
      try {
        const snapshot = await get(child(dbRef, `users/${uid}/categories`));
        if (snapshot.exists()) {
          return Object.keys(snapshot.val()).map((key) => ({
            ...snapshot.val()[key],
            id: key,
          }));
        }
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async getCategoryById({ dispatch, commit }, id) {
      const uid = await dispatch("getUid");
      const dbRef = ref(database);
      try {
        const snapshot = await get(
          child(dbRef, `users/${uid}/categories/${id}`)
        );
        if (snapshot.exists()) {
          return { ...snapshot.val(), id };
        }
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async addCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const categoryId = v4();
        set(ref(database, `users/${uid}/categories/${categoryId}`), {
          title,
          limit,
        });
        return { id: categoryId, title, limit };
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async editCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        set(ref(db, `users/${uid}/categories/${id}`), {
          title,
          limit,
        });
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
  },
};
