<template>
  <van-popup v-model="show" position="top">
    <slot name="top"></slot>
    <van-area
      :area-list="areaList"
      confirm-button-text=" "
      cancel-button-text=" "
      value="110000"
    />
    <slot name="bottom"></slot>
  </van-popup>
</template>

<script>
export default {
  props: {
    areaList: {
      type: Object,
      required: true
    }

  },
  created () { },
  data () {
    return {
      show: true

    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
