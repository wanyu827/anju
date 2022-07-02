<template>
  <div>
    <NavBar title="发布房源" to="/home"></NavBar>
    <div class="main">
      <van-cell-group>
        <van-cell title="房源信息" title-style="color:#21b97a" />
        <van-cell title="小区名称" is-link value="请输入小区名称" />
        <van-field v-model="price" label="租 金" placeholder="请输入租金/月">
          <template #extra>
            <span>￥/月</span>
          </template>
        </van-field>
        <van-field
          v-model="price"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <template #extra>
            <span>m²</span>
          </template>
        </van-field>
        <van-cell title="户  型" is-link value="请选择" />
        <van-cell title="所在楼层" is-link value="请选择" />
        <van-cell title=" 朝  向" is-link value="请选择" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  created () { },
  data () {
    return {
      price: ''
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { NavBar }
}
</script>

<style scoped lang='less'>
.main {
  margin-top: 46px;
}
</style>
