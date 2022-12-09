<script setup lang="ts">
import type { FormRule, SubmitContext } from 'tdesign-vue-next'
import { useRoute, useRouter } from 'vue-router'
import type { Captcha, LoginFormData } from '@/api/auth/types'
import { getCaptcha } from '@/api/auth'
import useStore from '@/store/index'

defineOptions({
  name: 'PasswordLogin'
})

const { useUser } = useStore()

const router = useRouter()
const route = useRoute()

const routeParams = reactive({
  redirect: '',
  params: {}
})

const loginRules: Record<string, FormRule[]> = {
  username: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { len: 5, message: '验证码长度为5位', trigger: 'blur' }
  ]
}

const loginForm = reactive<LoginFormData>({
  username: 'admin',
  password: '123456',
  code: '',
  uuid: ''
})

const captcha = reactive<Captcha>({
  onOff: false,
  uuid: '',
  image: ''
})

// 获取验证码
const handleCaptcha = () => {
  getCaptcha().then(res => {
    const { onOff, uuid, image } = res
    captcha.onOff = onOff
    captcha.image = image
    captcha.uuid = loginForm.uuid = uuid
  })
}

// 处理登录
const handleLogin = async (context: SubmitContext<FormData>) => {
  if (context.validateResult !== true) {
    return
  }
  useUser.login(loginForm).then(() => {
    router.push({ path: routeParams.redirect || '/', query: routeParams.params })
  }).finally(() => {
    handleCaptcha()
  })
}

onMounted(() => {
  handleCaptcha()
  Object.keys(route.query).forEach(key => {
    if (key === 'redirect') {
      routeParams.redirect = route.query[key] as string
    } else {
      routeParams.params[key] = route.query[key]
    }
  })
})
</script>

<template>
  <t-form ref="loginFormRef" class="login-form" :data="loginForm" :rules="loginRules" :label-width="0" @submit="handleLogin">
    <t-form-item name="username">
      <t-input v-model="loginForm.username" clearable placeholder="请输入手机号或邮箱">
        <template #prefix-icon>
          <my-icon name="icon-user" />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item name="password">
      <t-input v-model="loginForm.password" type="password" clearable placeholder="请输入密码">
        <template #prefix-icon>
          <my-icon name="icon-password" />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item v-if="captcha.onOff" name="code">
      <t-space>
        <t-input v-model="loginForm.code" placeholder="请输入验证码">
          <template #prefix-icon>
            <my-icon name="icon-valid-code" />
          </template>
        </t-input>
        <img :src="captcha.image" class="captcha" @click="handleCaptcha">
      </t-space>
    </t-form-item>
    <t-form-item>
      <div class="login-options">
        <t-link class="forgot-password" theme="default" hover="color">
          忘记密码？
        </t-link>
        <t-link theme="primary" hover="color">
          新用户账号注册
        </t-link>
      </div>
    </t-form-item>
    <t-form-item>
      <t-button theme="primary" type="submit" block>
        登录
      </t-button>
    </t-form-item>
  </t-form>
</template>

<style scoped lang="less">
  .login-form {
    padding: 10px;

    .captcha {
      width: 100px;
      height: 32px;
    }

    .login-options {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .forgot-password {
        color: #6c7d8f;
      }
    }
  }
</style>
