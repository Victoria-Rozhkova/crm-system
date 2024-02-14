<template>
  <div class="center">
    <p>
      <strong>{{ text || "404 Страница не найдена" }}</strong>
    </p>
    <img src="../assets/images/404.gif" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: ["text"],
};
</script>
