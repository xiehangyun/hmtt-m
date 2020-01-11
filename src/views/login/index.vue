<template>
  <div class="login">
    <van-nav-bar title="登陆">
      <van-icon slot="left" name="cross" color='#fff' @click="$router.back(-1)"></van-icon>
    </van-nav-bar>
    <van-cell-group>
      <ValidationObserver ref="form">
        <ValidationProvider name="手机号" rules="required|mobile" immediate>
          <van-field placeholder="请输入手机号" v-model="user.mobile">
            <van-icon slot="left-icon" class-prefix="icon" name="shouji"></van-icon>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|code" immediate>
          <van-field placeholder="请输入验证码" v-model="user.code">
            <van-icon slot="left-icon" class-prefix="icon" name="004mima"></van-icon>
            <div slot="button" class="sendingCode">
              <van-button
                round
                type="info"
                size="small"
                v-if="!isSending"
                @click="SandingCode"
              >发送验证码</van-button>
              <van-count-down :time="60 * 1000" format="ss s" v-else @finish="isSending = false" />
            </div>
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="login-btn-box">
      <van-button type="info" @click="onlogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user.js'
import { validate } from 'vee-validate'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isSending: false
    }
  },
  methods: {
    async onlogin () {
      if (!(await this.$refs.form.validate())) {
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
      }
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })

      let result = await login(this.user)
      this.$store.commit('setUser', result.data.data)
      this.$toast.success('登陆成功')
      this.$router.push('/')
    },
    async SandingCode () {
      // 使用引入的validate对象手动指定校验单个数据
      const { mobile } = this.user
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      //
      this.isSending = true
      await getCode(this.user.mobile)
    }
  }
}
</script>

<style lang='less' scpoed>
.login-btn-box {
  padding: 20px 16px;
  .van-button {
    width: 100%;
    background: #56a9fc;
  }
}
.van-cell-group {
  margin-top: 10px;
  > .van-cell {
    height: 50px;
  }
  .van-field__left-icon {
    display: flex;
    align-items: center;
  }
  .van-cell__value {
    display: flex;
    align-items: center;
  }
  .van-field__body {
    width: 100%;
  }
  .sendingCode {
    width: 78px;
    text-align: center;
  }
}
</style>
