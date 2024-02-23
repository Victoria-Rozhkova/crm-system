<template>
  <div class="center">
    <p>
      <strong>{{ text || $t("common.404") }}</strong>
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
