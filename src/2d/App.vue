<template>
  <section v-if="SHOW2D">
    <div id="canvas-insert"></div>
    <left></left>
    <right></right>
  </section>
  <!-- 此处canvas会插入到指定id的div处。 -->
  <teleport :to="SHOW2D ? '#canvas-insert' : '#app'">
    <scene />
  </teleport>
</template>

<script setup lang="ts">
import { inject } from "vue";
import scene from "@/3d/views/scene1.vue";
const SHOW2D = inject("SHOW2D"); // index入口配置是否显示二维界面；然后以此确定canvas元素的位置
</script>

<style lang="less" scoped>
#canvas-insert {
  position: absolute;
  left: 200px;
  right: 200px;
  top: 100px;
  height: 600px;
  background-color: grey;
}
</style>
