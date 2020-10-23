<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.path"
      :collapse="collapse"
      background-color="#04294b"
      text-color="#eee"
      active-text-color="#fff"
      router
    >
      <el-menu-item index="/UserManages">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <el-menu-item index="/CustomerManages">
        <i class="el-icon-s-home"></i>
        <span slot="title">客户管理</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-box"></i>
          <span>箱子管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/BoxManages">箱子规格</el-menu-item>
          <el-menu-item index="/Box1Manages">箱子详情</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/OrderManages">
        <i class="el-icon-shopping-cart-1"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-menu-item index="/AdManages">
        <i class="el-icon-s-data"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>

      <el-menu-item index="/ViewManages">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">意见管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false
    };
  },
  created() {},
  methods: {},
  computed: {
    onRoutes() {},
    isCollapse() {
      return this.collapse;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  width: 205px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.side-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 100%;
}
</style>




