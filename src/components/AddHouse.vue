<template>
  <div>
    <NavBar title="发布房源" to="/home"></NavBar>
    <div class="main">
      <van-cell-group>
        <van-cell title="房源信息" title-style="color:#21b97a" />
        <van-cell
          title="小区名称"
          is-link
          :value="
            $store.state.community.communityName
              ? $store.state.community.communityName
              : '请输入小区名称'
          "
          @click="$router.push('/rentsearch')"
        >
        </van-cell>
        <van-field
          v-model="list.price"
          label="租 金"
          placeholder="请输入租金/月"
        >
          <template #extra>
            <span>￥/月</span>
          </template>
        </van-field>
        <van-field
          v-model="list.size"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <template #extra>
            <span>m²</span>
          </template>
        </van-field>

        <!-- <van-popup v-model="show" position="bottom" :style="{ height: '40%' }"
          ><van-picker
            show-toolbar
            :columns="conditionList.floor"
            @cancel="showPicker = false"
            @confirm="show"
            value-key="label"
        /></van-popup>
        <van-cell
          title="户  型"
          is-link
          v-model="list.floor"
          @click="show = true"
        /> -->
        <van-cell
          readonly
          clickable
          is-link
          title="户型"
          :value="
            currCondition.roomType.label
              ? currCondition.roomType.label
              : '请选择'
          "
          @click="showType = true"
        />
        <van-popup v-model="showType" round position="bottom">
          <van-picker
            show-toolbar
            :columns="conditionList.roomType"
            @cancel="showType = false"
            @confirm="onConfirm"
            value-key="label"
          />
        </van-popup>

        <van-cell
          readonly
          clickable
          is-link
          title="所在楼层"
          :value="
            currCondition.floor.label ? currCondition.floor.label : '请选择'
          "
          @click="showFloor = true"
        />
        <van-popup v-model="showFloor" round position="bottom">
          <van-picker
            show-toolbar
            :columns="conditionList.floor"
            @cancel="showFloor = false"
            @confirm="setFloor"
            value-key="label"
          />
        </van-popup>

        <van-cell
          readonly
          clickable
          is-link
          title="朝向"
          :value="
            currCondition.oriented.label
              ? currCondition.oriented.label
              : '请选择'
          "
          @click="showOriented = true"
        />
        <van-popup v-model="showOriented" round position="bottom">
          <van-picker
            show-toolbar
            :columns="conditionList.oriented"
            @cancel="showOriented = false"
            @confirm="setOriented"
            value-key="label"
          />
        </van-popup>
        <!-- <van-cell title="所在楼层" is-link value="请选择" />
        <van-cell title=" 朝  向" is-link value="请选择" /> -->
        <van-cell title="房屋标题" />
        <van-field
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
          v-model="list.title"
        />
        <van-cell title="房屋图像" />
        <van-uploader v-model="fileList" multiple />
        <van-cell title="房屋配置" />
        <van-grid :column-num="5">
          <van-grid-item
            v-for="(item, index) in conditionList.supporting"
            :key="index"
            :text="item.label"
            @click="supportClick(item, index)"
            :class="{ active: currentIndex.indexOf(index) !== -1 }"
          >
            <template #icon>
              <i class="iconfont" :class="iconList[index].icon"></i>
            </template>
          </van-grid-item>
        </van-grid>
        <van-cell title="房屋描述" />
        <van-field
          rows="5"
          v-model="list.description"
          autosize
          type="textarea"
          placeholder="请输入留言"
        />
      </van-cell-group>
    </div>
    <div class="bottom">
      <van-button type="default" @click="cancelUpdate">取消</van-button>
      <van-button type="primary" @click="updateHouse">提交</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getPublisherCondition, updateHouseImg, updateHouseSource } from '@/api/house'
export default {
  name: 'AddHouse',
  async created () {
    const token = this.$store.state.token
    const res = await getPublisherCondition(token)
    console.log(res)
    this.conditionList = res.data.body
    this.list.community = this.$store.state.community.community
  },
  data () {
    return {
      list: {
        title: '',
        description: '',
        houseImg: '',
        oriented: '',
        supporting: '',
        price: '',
        roomType: '',
        size: '',
        floor: '',
        community: ''
      },
      showType: false,
      showFloor: false,
      showOriented: false,
      conditionList: {},
      currCondition: {
        floor: [],
        oriented: [],
        roomType: []
      },
      fileList: [
        // { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明

      ],
      currentIndex: [],
      currentSupport: [],
      iconList: [
        { icon: 'icon-yigui' },
        { icon: 'icon-xiyiji' },
        { icon: 'icon-kongdiao' },
        { icon: 'icon-meiqitianranqi' },
        { icon: 'icon-bingxiang' },
        { icon: 'icon-shuinuanqigongcheng' },
        { icon: 'icon-dianshi' },
        { icon: 'icon-haofangtuo400iconfont2reshuiqi' },
        { icon: 'icon-kuandai' },
        { icon: 'icon-shafa' }
      ]
    }
  },
  methods: {
    async up () {
      console.log(this.fileList)
      const res1 = await updateHouseImg(this.fileList[0].content)
      console.log(res1)
    },
    onConfirm (value) {
      this.currCondition.roomType = value
      this.list.roomType = value.value
      this.showType = false
    },
    setFloor (value) {
      this.currCondition.floor = value
      this.list.floor = value.value
      this.showFloor = false
    },
    setOriented (value) {
      this.currCondition.oriented = value
      this.list.oriented = value.value
      this.showOriented = false
    },
    supportClick (obj, index) {
      console.log(obj.label)
      const num = this.currentIndex.indexOf(index)
      if (num === -1) {
        this.currentIndex.push(index)
        this.currentSupport.push(obj.label)
      } else {
        this.currentIndex.splice(num, 1)
        this.currentSupport.splice(num, 1)
      }
      console.log(this.currentSupport)
      this.list.supporting = this.currentSupport.join('|')
    },
    async updateHouse () {
      try {
        const token = this.$store.state.token
        const res = await updateHouseSource(this.list, token)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    cancelUpdate () {
      this.$dialog.confirm({
        title: '提示',
        message: '放弃发布房源？',
        confirmButtonText: '继续编辑',
        confirmButtonColor: '#108ee9',
        cancelButtonText: '放弃'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          this.$store.state.community = ''
          this.$router.go(-1)
        })
    }
  },
  mounted () {
    // this.$bus.$on('hello', (data) => {
    //   this.communityName = data.communityName
    //   console.log(this.communityName)
    //   this.$forceUpdate()
    // })
  },
  computed: {},
  watch: {},
  filters: {},
  components: { NavBar }
}
</script>

<style scoped lang='less'>
.active {
  color: #21b97a;
}
.main {
  margin-top: 46px;
  margin-bottom: 50px;
}
// 房屋配套
/deep/.van-grid-item__text {
  color: #333;
  font-size: 14px;
}
.iconfont {
  font-size: 24px;
}
.icon-shafa {
  font-weight: 600;
}
.title-empty {
  font-size: 14px;
  padding-left: 10px;
}
.bottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #ccc;
  display: flex;
  justify-content: space-between;
  .van-button {
    width: 50%;
  }
}
</style>
