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
  data: () => ({
    links: [
      { title: "Счет", to: "/" },
      { title: "История", to: "/history" },
      { title: "Планирование", to: "/planning" },
      { title: "Новая запись", to: "/record" },
      { title: "Категории", to: "/categories" },
    ],
  }),
};
</script>
