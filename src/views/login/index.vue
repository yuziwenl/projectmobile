<template>
  <div>
     <van-nav-bar title="菜单"/>
     <van-cell-group>
  <van-field  v-validate="'required|digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        clearable
  v-model="user.mobile"
  left-icon="phone-o"
   placeholder="请输入手机号" />
  <van-field v-model="user.code" left-icon="star-o" placeholder="请输入验证码" v-validate="'required|digits:6'"
  name='code'
   :error-message="errors.first('code')">
   <van-button slot="button" type="default" size="small">发送验证码</van-button></van-field>
</van-cell-group>
<div class="login-btn">
      <van-button class="btn" type="info" @click='handleLogin'>登录</van-button>
    </div>
    </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async handleLogin () {
      try {
        const data = await login(this.user)
        // this.$store.commit('setUser', data)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
