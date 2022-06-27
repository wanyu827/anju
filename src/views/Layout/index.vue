<template>
  <div>
    <router-view></router-view>
    <!-- 底部标签栏 -->

    <van-tabbar active-color="rgb(33, 185, 122)" route>
      <van-tabbar-item replace to="/home" class="iconfont icon-shouye"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        replace
        to="/searchhouse"
        class="iconfont icon-chazhaofangyuan"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace to="/information" class="iconfont icon-zixun"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/myinfo" class="iconfont icon-31wode"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped></style>
