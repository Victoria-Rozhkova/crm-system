import auth from "./modules/auth";

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
  modules: {
    auth,
  },
};
