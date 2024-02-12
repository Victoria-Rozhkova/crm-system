<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  name: "AuthLayout",
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError.code);
      this.$error(messages[fbError.code] || messages.error);
    },
  },
};
</script>

<style></style>
