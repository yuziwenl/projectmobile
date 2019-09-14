<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="showUploadFile=true">
        <div slot="default">
          <img width="30" height="30" :src="
          userProfile.photo" alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="userProfile.gender ? '女' : '男'"/>
      <van-cell title="生日" is-link
        :value="userProfile.birthday"/>
    </van-cell-group>
    <upload-file v-model="showUploadFile" @upload-success='handleSuccess'></upload-file>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadFile from './component/UploadFile'
export default {
  name: 'UserProfile',
  components: {
    UploadFile
  },
  data () {
    return {
      userProfile: {},
      showUploadFile: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const data = await getUserProfile()
      this.userProfile = data
    },
    handleSuccess (photo) {
      this.userProfile.photo = photo
    }
  }
}
</script>

<style>
</style>
