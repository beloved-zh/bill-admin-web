<script setup lang="ts">
defineOptions({
  name: 'ValidCodeLogin'
})

const handleCaptcha = () => {
  // xx秒后重新获取
  infoMessage('获取验证码')
}
</script>

<template>
  <t-form class="login-form" :label-width="0">
    <t-form-item name="phone">
      <t-input clearable placeholder="请输入手机号">
        <template #prefix-icon>
          <my-icon name="icon-phone" />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item name="code">
      <t-input clearable placeholder="请输入验证码">
        <template #prefix-icon>
          <my-icon name="icon-valid-code" />
        </template>
        <template #suffix>
          <t-link theme="primary" hover="color" @click="handleCaptcha">
            获取验证码
          </t-link>
        </template>
      </t-input>
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
