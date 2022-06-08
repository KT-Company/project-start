<template>
  <section class="left">
    <slot></slot>
  </section>
</template>

<script>

export default {
  name: "Left",
};
</script>

<style scoped>
.left {
  position: absolute;
  left: 0;
}
</style>