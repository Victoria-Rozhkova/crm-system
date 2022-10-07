<template>
  <div>
    <div class="app-main-layout">
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
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "MainLayout",
  components: { Navbar, Sidebar },
  data: () => ({
    isOpen: true,
  }),
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
