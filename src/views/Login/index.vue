<template>
  <div>
    <NavBar to="/myinfo" title="账号登录"></NavBar>
    <van-form @submit="onSubmit" class="main">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          color="#21B97A"
          size="large"
          native-type="submit"
          class="login-btn"
          >登 录</van-button
        >
      </div>
    </van-form>

    <router-link to="/myinfo"
      ><p class="register">还没有账号，去注册~</p></router-link
    >
  </div>
</template>

<script>
import { login } from '@/api/user'
import NavBar from '@/components/NavBar.vue'
let timer = null
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {

    async onSubmit (values) {
      timer = setTimeout(() => {
        this.$toast.loading({
          message: '登录...',
          forbidClick: true,
          duration: 0
        })
      }, 0)
      const res = await login(values)
      try {
        clearTimeout(timer)
        console.log(res)
        if (res.data.status === 200) {
          this.$toast.success(res.data.description)
          this.$store.commit('setUser', res.data.body.token)
          this.$router.push('/myinfo')
        } else {
          this.$toast.fail(res.data.description)
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail(res.data.description)
      }
      this.$toast.clear()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { NavBar }
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 46px;

  .van-field {
    margin-right: 10px;
    height: 60px;
    line-height: 60px;
    font-size: 17px;
  }
  .van-button {
    margin-top: 20px;
    font-size: 18px;
    width: 100%;
  }
}
.register {
  font-size: 14px;
  text-align: center;
  color: #666;
  margin-top: 5px;
}
</style>
