import { v4 } from "uuid";
import { child, ref, set, get } from "firebase/database";
import { database } from "@/main";

export default {
  actions: {
    async getRecords({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(database);
      try {
        const snapshot = await get(child(dbRef, `users/${uid}/records`));
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
