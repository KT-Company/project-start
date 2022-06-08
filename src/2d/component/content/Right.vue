<template>
  <section class="right">
    <slot></slot>
  </section>
</template>

<script>

export default {
  name: "Right",
};
</script>

<style scoped>
.right {
  position: absolute;
  right: 0;
}
</style>