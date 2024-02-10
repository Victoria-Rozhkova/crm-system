<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AuthLayout from "./layouts/AuthLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
export default {
  name: "App",
  components: {
    AuthLayout,
    MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "auth") + "-layout";
    },
  },
};
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/styles/index.css";
</style>
