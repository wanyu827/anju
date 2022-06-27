<template>
  <div>
    <van-nav-bar fixed>
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <SearchBar class="search"></SearchBar>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { SearchBar }
}
</script>

<style scoped>
.search {
  margin-top: -3px;
  margin-left: 30px;
  height: 40px;
  width: 340px;
}
</style>
