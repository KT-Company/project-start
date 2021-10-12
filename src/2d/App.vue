<template>
  <div id="app">
    <left>
      <component :is="leftComponent"></component>
    </left>

    <right>
      <component :is="rightComponent"></component>
    </right>
  </div>
</template>

<script>
import Left from "./component/content/Left.vue";
import Right from "./component/content/Right.vue";

// Home
import HomeLeft from "./views/home/HomeLeft";
import HomeRight from "./views/home/HomeRight";

const componentList = [
  ["HomeLeft", "HomeRight"],
];

export default {
  name: "App",
  data() {
    return {
      leftComponent: "HomeLeft",
      rightComponent: "HomeRight",
    };
  },
  mounted() {
    // 使用页面监听器
    this.pageListener()
  },
  components: {Left, Right, HomeLeft, HomeRight},
  methods:{
    pageListener(){
      this.$bus.on('toPage', (index) => {
        this.leftComponent = componentList[index][0]
        this.rightComponent = componentList[index][1]
      })
    }
  }
};
</script>


<style scoped>
#app {
  color: red;
}
</style>