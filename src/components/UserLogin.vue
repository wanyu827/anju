<template>
  <div class="main">
    <div class="head">
      <img :src="'http://liufusong.top:8080' + userInfo.avatar" alt="" />
    </div>
    <p class="username">{{ userInfo.nickname }}</p>
    <van-button type="primary" @click="exitLogin">退出</van-button>
    <p class="edit">编辑个人资料<van-icon name="play" /></p>
  </div>
</template>

<script>
// import { userInfo } from '@/api/user'
export default {
  props: {
    userInfo: {

      required: 'true'
    }
  },
  created () {
    // this.getUserInfo()
  },
  data () {
    return {}
  },
  methods: {
    exitLogin () {
      this.$dialog.confirm({
        title: '提示',
        width: 270,
        confirmButtonColor: '#1e80ff',
        message: '是否确认退出'
      })
        .then(() => {
          // on confirm
          this.$store.commit('delUser')
          this.$emit('update-info', true)
        })
        .catch(() => {
          // on cancel
        })
    }
    // async getUserInfo () {
    //   try {
    //     const token = this.$store.state.token
    //     const res = await userInfo(token)
    //     console.log(res)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  position: relative;
  width: 100%;
  height: 180px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px 3px #ddd;

  .head {
    position: absolute;
    left: 50%;
    top: -35px;

    transform: translateX(-50%);
    width: 65px;
    height: 65px;
    border-radius: 50%;
    box-shadow: 0 2px 2px #bdbdbd;
    border: 5px solid #f5f5f5;
    img {
      width: 100%;
    }
  }
  .username {
    font-size: 13px;
    padding-top: 50px;
    margin-top: 0;
  }
  .van-button {
    margin: 10px auto;
    display: block;
    height: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .edit {
    font-size: 12px;
    color: #bbb;
  }
}
</style>
