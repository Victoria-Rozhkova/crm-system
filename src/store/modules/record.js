import { v4 } from "uuid";
import { ref, set } from "firebase/database";
import { database } from "@/main";

export default {
  actions: {
    async addRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const recordId = v4();
        await set(ref(database, `users/${uid}/records/${recordId}`), {
          ...record,
        });
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
  },
};
