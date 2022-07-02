<template>
  <div>
    <router-link
      :to="{
        name: 'details',
        params: {
          id: list.houseCode,
        },
      }"
    >
      <div class="list">
        <div class="img">
          <van-image
            width="106"
            height="80"
            :src="'http://liufusong.top:8080' + list.houseImg"
          />
        </div>
        <div class="text">
          <h3>{{ list.title }}</h3>
          <p>{{ list.desc }}</p>
          <div class="tags">
            <span v-for="(item, index) in list.tags" :key="index">{{
              item
            }}</span>
          </div>
          <div>
            <span class="price">{{ list.price }} </span>元/月
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['list'],
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
.list {
  display: flex;
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e5e5;
  .text {
    padding-left: 12px;
    h3 {
      font-size: 15px;
    }
    p {
      font-size: 12px;
      color: #afb2b3;
    }
    .tags {
      margin-top: 3px;
      font-size: 12px;

      span {
        color: #39becd;
        background: #e1f5f8;
        padding: 1px 5px;
      }
    }
    div {
      .price {
        font-size: 16px;
        font-weight: bolder;
        color: #fa5741;
      }
      font-size: 12px;
      color: #fa5741;
    }
  }
}
</style>
