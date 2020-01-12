<template>
  <div class="channels-edit">
    <van-cell title="我的频道" :border="false">
      <van-button type="danger" size="mini" round @click="editSwitch">{{isEditShow ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(item,index) in userChannels" :key="index" @click="userChannelsHandle(index)">
          <span
          slot="text"
          class="text"
          :class="{
            active: index === active
          }"
        >{{ item.name }}</span>
          <van-icon name="close" class="close" slot="icon" v-show="isEditShow && index !== 0" />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item :text="item.name" v-for="(item,index) in surplusChannels" :key="index" @click="putUserChannels(item)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels.js'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelsEditPage',
  data () {
    return {
      AllChannels: [],
      isEditShow: false
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async getAllChannels () {
      let { data: { data: { channels } } } = await getAllChannels()
      this.AllChannels = channels
    },
    putUserChannels (item) {
      this.userChannels.push(item)
    },
    editSwitch () {
      this.isEditShow = !this.isEditShow
    },
    userChannelsHandle (index) {
      if (this.isEditShow) {
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('activeChange', index)
        this.$emit('close')
      }
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    surplusChannels () {
      let { userChannels, AllChannels } = this
      let channels = []
      AllChannels.forEach(item => {
        if (!userChannels.find(value => value.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {
    userChannels (newVal) {
      setItem('userChannels', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
.channels-edit {
  padding: 40px 0;
}
/deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -12px;
  right: -5px;
  .van-icon-close {
    font-size: 14px;
  }

}

.van-grid-item__text, .text {
      font-size: 14px;
      color: #222;
}
.active {
    color: red;
}
</style>
