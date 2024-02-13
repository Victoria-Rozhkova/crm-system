<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @open="open" />
      <Sidebar :isOpen="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link to="/record" class="btn-floating btn-large blue">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/App/Navbar.vue";
import Sidebar from "@/components/App/Sidebar.vue";
export default {
  name: "MainLayout",
  components: { Navbar, Sidebar },
  data: () => ({
    loading: true,
    isOpen: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.user).length) {
      await this.$store.dispatch("getUser");
    }
    this.loading = false;
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
