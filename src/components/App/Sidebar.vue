<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      custom
      v-slot="{ href, navigate, isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a
          :href="href"
          @click="navigate"
          class="waves-effect waves-orange pointer"
          >{{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isOpen: Boolean,
  },
  computed: {
    links() {
      return [
        { title: this.$t("sidebar.bill"), to: "/" },
        { title: this.$t("sidebar.history"), to: "/history" },
        { title: this.$t("sidebar.planning"), to: "/planning" },
        { title: this.$t("sidebar.newRecord"), to: "/record" },
        { title: this.$t("sidebar.categories"), to: "/categories" },
      ];
    },
  },
};
</script>
