import auth from "./modules/auth";
import user from "./modules/user";

export default {
  namespaced: true,
  state: {
    error: null,
  },
  getters: { error: (state) => state.error },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async getCurrency() {
      const res = await fetch(
        "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/rub.json"
      );
      return await res.json();
    },
  },
  modules: {
    auth,
    user,
  },
};
