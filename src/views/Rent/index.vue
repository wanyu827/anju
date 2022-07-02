<template>
  <div>
    <NavBar title="房屋管理" to="/myinfo"></NavBar>
    <div class="main">
      <van-empty
        v-if="rentHouseList.length === 0"
        class="custom-image"
        image="/imgs/not-found.png"
        description="描述文字"
      >
        <template #description>
          <span>您还没有房源，去发布房源吧~</span>
        </template>
      </van-empty>
      <HouseList
        v-else
        v-for="(item, index) in rentHouseList"
        :key="index"
        :list="item"
      ></HouseList>
    </div>
  </div>
</template>

<script>
import { rentHouse } from '@/api/user'
import HouseList from '@/components/HouseList.vue'
import NavBar from '@/components/NavBar.vue'
export default {
  created () {
    this.getRentHouseList()
  },
  data () {
    return {
      rentHouseList: []
    }
  },
  methods: {
    async getRentHouseList () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      })
      try {
        const token = this.$store.state.token
        const res = await rentHouse(token)
        console.log(res)
        this.rentHouseList = res.data.body
        this.$toast.clear()
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { NavBar, HouseList }
}
</script>

<style scoped lang='less'>
/deep/.custom-image .van-empty__image {
  width: 150px;
  height: 98px;
  margin-top: 50px;
}
.main {
  padding-top: 46px;
}
</style>
