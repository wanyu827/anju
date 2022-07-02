<template>
  <div class="main">
    <NavBar title="收藏列表" to="/myinfo"></NavBar>
    <HouseList
      v-for="(item, index) in collectionList"
      :key="index"
      :list="item"
    ></HouseList>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { watchCollection } from '@/api/user'
import HouseList from '@/components/HouseList.vue'
export default {
  name: 'Favorites',
  created () {
    this.getCollectionList()
  },
  data () {
    return {
      collectionList: []
    }
  },
  methods: {
    async getCollectionList () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      })
      try {
        const token = this.$store.state.token
        const res = await watchCollection(token)
        console.log('res', res)
        this.collectionList = res.data.body
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
.main {
  margin-top: 46px;
}
</style>
