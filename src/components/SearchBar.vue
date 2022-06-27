<template>
  <van-search
    class="searchbar"
    v-model="value"
    show-action
    placeholder="请输入小区或地址"
  >
    <template #label>
      <router-link to="/city">
        <span class="address"
          >深圳<i class="iconfont icon-xiajiantou"></i
        ></span>
      </router-link>
    </template>
    <template #action> <i class="iconfont icon-ditu"> </i> </template>
  </van-search>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      value: ''
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style lang="less" scoped>
.searchbar {
  position: fixed;
  z-index: 2;
  width: 100%;
  padding-top: 20px;
  background: transparent;
  .address {
    padding-right: 15px;
    color: #666;
    border-right: 1px solid #ccc;
    i {
      margin-left: 5px;
      font-size: 12px;
    }
  }
  /deep/.icon-ditu {
    font-size: 30px;
    color: #fff;
  }
}
.van-search__content {
  background-color: #fff;
}
</style>
