<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onSearch"
      />
      <van-cell-group>
        <van-cell
          :title="item.communityName"
          v-for="(item, index) in resultList"
          :key="index"
          @click="addCommunity(item)"
        />
      </van-cell-group>
    </form>
  </div>
</template>

<script>
import { getCityInfo, getCommunityList } from '@/api/city'
export default {
  name: 'RentSearch',
  async created () {
    const name = this.$store.state.currentCity
    const res = await getCityInfo({ name })
    this.cityInfo = res.data.body
    console.log(res)
  },
  data () {
    return {
      value: '',
      cityInfo: {},
      resultList: []
    }
  },
  methods: {
    // 根据输入框信息搜索匹配值
    async onSearch (val) {
      this.$toast.loading({
        duration: 0,
        message: '加载中...'
      })
      try {
        const res = await getCommunityList(val, this.cityInfo.value)
        console.log(res)
        this.resultList = res.data.body
        this.$toast.clear()
      } catch (err) {
        console.log(err)
      }
      this.$toast.clear()
    },
    onCancel () {
      this.$router.push('/add')
      this.$store.commit('delCommunity')
    },
    addCommunity (obj) {
      // this.$bus.$emit('hello', obj)
      this.$store.commit('setCommunity', obj)
      this.$router.push('/add')
    }
  },
  computed: {},

  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
