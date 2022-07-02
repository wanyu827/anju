<template>
  <div>
    <div class="main">
      <img
        :src="
          flag
            ? '/imgs/bg.png'
            : 'http://liufusong.top:8080' + userInfoList.avatar
        "
        alt=""
        style="width: 100%"
      />
      <div class="container">
        <UserNoLogin v-if="flag"></UserNoLogin>
        <UserLogin
          @update-info="updateInfo"
          :userInfo="userInfoList"
          v-else
        ></UserLogin>
        <ul>
          <router-link
            :to="flag ? '/login' : obj.to"
            tag="div"
            v-for="(obj, index) in myInfoNavList"
            :key="index"
          >
            <li>
              <div><i class="iconfont" :class="obj.icon"></i></div>
              <div>
                <span class="text">{{ obj.text }}</span>
              </div>
            </li>
          </router-link>
        </ul>
        <div class="join">
          <img src="/imgs/join.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api/user'
import UserNoLogin from '@/components/UserNoLogin'
import UserLogin from '@/components/UserLogin.vue'
export default {
  name: 'MyInfo',
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      flag: false,
      userInfoList: [],
      myInfoNavList: [
        { to: '/favorites', icon: 'icon-shoucang', text: '我的收藏' },
        { to: '/rent', icon: 'icon-shouye', text: '我的出租' },
        { to: '', icon: 'icon-jilu', text: '看房记录' },
        { to: '', icon: 'icon-yinhangka', text: '成为房主' },
        { to: '', icon: 'icon-geren', text: '个人资料' },
        { to: '', icon: 'icon-kefu', text: '联系我们' }
      ]
    }
  },
  methods: {
    async getUserInfo () {
      try {
        const token = this.$store.state.token
        const res = await userInfo(token)
        console.log(res)
        if (res.data.status === 200) {
          this.flag = false
          this.userInfoList = res.data.body
        } else {
          this.flag = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    updateInfo (val) {
      this.flag = val
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { UserNoLogin, UserLogin }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  position: relative;
}
.container {
  position: absolute;
  top: 110px;
  width: 8.5rem;
  margin: 10px 20px 0 30px;
  background-color: #fff;
  padding-top: 0;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;

    li {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 2.4rem;
      margin-bottom: 30px;
    }
  }
}
.iconfont {
  color: #333;
  font-size: 25px;
  font-weight: 600;
}
.text {
  margin-top: 10px;
  font-size: 14px;
}
.join {
  img {
    width: 110%;
    margin-left: -18px;
  }
}
</style>
