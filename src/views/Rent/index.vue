<template>
  <div>
    <NavBar title="房屋管理" to="/myinfo"></NavBar>
    <van-empty
      class="custom-image"
      image="/imgs/not-found.png"
      description="描述文字"
    >
      <template #description>
        <span>您还没有房源，去发布房源吧~</span>
      </template>
    </van-empty>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { NavBar }
}
</script>

<style scoped lang='less'>
/deep/.custom-image .van-empty__image {
  width: 150px;
  height: 98px;
  margin-top: 50px;
}
</style>
