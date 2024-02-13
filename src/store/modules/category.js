import { v4 } from "uuid";
import { ref } from "firebase/database";
import { set } from "firebase/database";
import { database } from "@/main";

export default {
  actions: {
    async addCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const categoryId = v4();
        const category = await set(
          ref(database, `users/${uid}/categories/${categoryId}`),
          { id: categoryId, title, limit }
        );
        console.log(category);
        return { id: categoryId, title, limit };
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
  },
};
