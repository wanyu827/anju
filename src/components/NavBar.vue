<template>
  <div>
    <van-nav-bar :title="title" fixed>
      <template #left>
        <router-link :to="to">
          <van-icon name="arrow-left" />
        </router-link>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
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

<style lang="less" scoped>
/deep/.van-nav-bar__title {
  font-size: 18px !important;
}
</style>
