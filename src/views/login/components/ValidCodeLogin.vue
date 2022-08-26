<template>
  <el-form
      class="login-form"
      label-position="left"
  >
    <el-form-item prop="username">
      <el-input
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
      >
        <template #prefix>
          <span>
            <svg-icon name="phone" size="14px" ></svg-icon>
          </span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          placeholder="请输入短信验证码"
          name="password"
          type="password"
          tabindex="2"
          :show-password="true"
      >
        <template #prefix>
          <svg-icon name="valid-code" size="14px" ></svg-icon>
        </template>
        <template #append>
          <el-link class="forgot-password" :underline="false" type="primary" @click="handleSMSCode()">获取短信验证码</el-link>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="login-options w-10">
        <el-checkbox class="auto-login" label="下次自动登录" />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="w-10" type="primary">登录 / 注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

  let handleSMSCode = () => {

  }

</script>

<style scoped lang="less">
  @import url('@assets/styles/index.less');
  .login-form {
    padding: 0 10px;
    width: 380px;

    .login-options:extend(.flex-row-center) {
      justify-content: space-between;
    }

  }
</style>
