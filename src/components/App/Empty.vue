<template>
  <p class="center">{{ text || "Ничего не найдено" }}</p>
</template>
<script>
export default {
  name: "Empty",
  props: ["text"],
};
</script>
