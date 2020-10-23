<template>
  <div class="wrapper">
    <v-Sidebar></v-Sidebar>
    <div class="content-box">
      <v-head></v-head>
      <div class="app-wrap">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VHead from "./Header.vue";
import VSidebar from "./SideBar.vue";
export default {
  name: "home",
  components: {
    VHead,
    VSidebar
  },
  data() {
    return {
      collapse: true
    };
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.app-wrap {
  height: 96%;
}
.content {
  width: 84%;
  height: 100%;
  margin: 10px;
  display: block;
  position: absolute;
  left: 200px;
  top: 60px;
  bottom: 0;
}
</style>
