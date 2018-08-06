<template>
  <div class="page page-login">
    <div class="page-main">
      <img src="../assets/img/logo.png" alt="logo">
      <div class="login-form">
        <div>
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密  码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <p class="rem"><input v-model="remember" id="remember" type="checkbox"><label for="remember">记住密码</label></p>
        <mt-button type="primary" class="submit-button" size="large" @click="submit">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'store2'

export default {
  data () {
    return {
      username: '',
      password: '',
      remember: false
    }
  },
  methods: {
    submit () {
      if (!this.username) {
        return this.$emit('toast', {message: '请输入用户名'})
      }
      if (!this.password) {
        return this.$emit('toast', {message: '请输入密码'})
      }
      this.$loading.show()
      this.$axios.post(this.$urls.token, {username: this.username, password: this.password})
        .then(({data: {token}}) => {
          if (!token) {
            throw new Error('获取token失败')
          }
          localStorage.setItem('username', this.username)
          localStorage.setItem('password', this.password)
          storage.session('token', token)
          return this.$axios.get('/api/orgnization/getOrgId?token=' + token)
        })
        .then(({data: {orgId}}) => {
          if (!orgId) {
            throw new Error('获取机构ID失败')
          }
          this.$loading.hide()
          this.$emit('orgid', orgId)
          this.$router.push('/')
        })
        .catch(e => {
          this.$emit('toast', {message: e.message || '登录失败，请重试'})
          this.$loading.hide()
        })
    }
  },
  created () {
    this.username = localStorage.getItem('username') || ''
    this.password = localStorage.getItem('password') || ''
    if (this.username && this.password) {
      this.remember = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page-main {
    width: 100%;
    padding: 0 .4rem;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .login-form {
    margin-top: 1rem;
    width: 100%;
    overflow: hidden;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .submit-button {
      margin-top: 20px;
    }
  }

  .rem {
  }
</style>

<style lang="scss">
  .page-login {
    .mint-cell {
      background-color: transparent;
    }
    .mint-field-core {
      background: transparent;
    }
  }
</style>
