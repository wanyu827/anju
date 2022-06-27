<template>
  <div class="main">
    <div class="head"><img src="/imgs/avatar.png" alt="" /></div>
    <p>游客</p>
    <van-button type="primary" to="/login">去登录</van-button>
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

<style scoped lang='less'>
.main {
  position: relative;
  width: 100%;
  height: 180px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px 3px #ddd;

  .head {
    position: absolute;
    left: 50%;
    top: -35px;

    transform: translateX(-50%);
    width: 65px;
    height: 65px;
    border-radius: 50%;
    box-shadow: 0 2px 2px #bdbdbd;
    border: 5px solid #f5f5f5;
    img {
      width: 100%;
    }
  }
  p {
    font-size: 13px;
    padding-top: 70px;
    margin-top: 0;
  }
  .van-button {
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
  }
}
</style>
