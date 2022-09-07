<template>
  <el-form
      class="login-form"
      label-position="left"
      ref="loginFormRef"
      :rules="loginRules"
      :model="loginForm"
  >
    <el-form-item prop="username">
      <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
      >
        <template #prefix>
          <span>
            <svg-icon name="user" size="14px" ></svg-icon>
          </span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          type="password"
          tabindex="2"
          :show-password="true"
      >
        <template #prefix>
          <svg-icon name="password" size="14px" ></svg-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" v-if="captcha.onOff">
      <el-row :gutter="10" class="w-10">
        <el-col :span="18">
          <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              type="text"
              tabindex="3"
          >
            <template #prefix>
              <svg-icon name="valid-code" size="14px" ></svg-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <div class="captcha" @click="handleCaptcha()">
            <img class="w-10 h-10" :src="captcha.image" />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <div class="login-options w-10">
        <el-checkbox label="下次自动登录" v-model="autoLogin" />
        <el-link class="forgot-password" :underline="false" type="primary" >忘记密码了？</el-link>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="w-10" type="primary" @click="handleLogin(loginFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

  import type { Captcha, LoginFormData } from '@api/auth/types'
  import type { FormInstance, FormRules } from 'element-plus'
  import { getCaptcha } from '@api/auth'
  import useStore from '@store/index'
  import { useRouter, useRoute } from 'vue-router'

  const { app, user } = useStore()

  const router = useRouter()
  const route = useRoute()

  let routeParams = reactive({
    redirect: '',
    params: {}
  })

  const loginFormRef = ref<FormInstance>()

  let autoLogin = ref<boolean>(true)

  let loginButLoading = ref<boolean>(false)

  const loginRules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { len: 5, message: '请输入5位验证码', trigger: 'blur' }
    ]
  })

  let loginForm = reactive<LoginFormData>({
    username: 'admin',
    password: '123456',
    code: '',
    uuid: ''
  })

  let captcha = reactive<Captcha>({
    onOff: false,
    uuid: '',
    image: ''
  })

  watch(autoLogin, (newValue) => {
    app.$state.autoLogin = newValue
  })

  const handleCaptcha = () => {
    getCaptcha().then(res => {
      let {onOff, uuid, image} = res
      captcha.uuid = loginForm.uuid = uuid
      captcha.onOff = onOff
      captcha.image = image
    })
  }

  const handleLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (!valid) {
        return
      }
      loginButLoading.value = true
      user.login(loginForm).then(res => {
        router.push({ path: routeParams.redirect || '/', query: routeParams.params });
      }).finally(() => {
        loginButLoading.value = false
        handleCaptcha()
      })
    })
  }

  onMounted(() => {
    handleLogin(loginFormRef.value)
    handleCaptcha()
    Object.keys(route.query).map((key) => {
      if (key === 'redirect') {
        routeParams.redirect = route.query[key] as string
      } else {
        routeParams.params[key] = route.query[key]
      }
    })
  })

  defineExpose({
    handleCaptcha
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');
  .login-form {
    padding: 0 10px;
    width: 380px;

    .captcha {
      height: 30px;
    }

    .login-options:extend(.flex-row-center) {
      justify-content: space-between;
    }
  }
</style>
