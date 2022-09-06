<template>
  <div class="login-page login-bg">
    <div class="logo">
      <h1>LOGO</h1>
    </div>
    <div class="login-container">
      <div class="left-container">
        <svg-icon name="svg-login-banner" size="100%" />
      </div>
      <div class="right-container">
        <el-tabs class="login-form" model-value="valid-code-login" stretch @tab-change="changeLogin">
          <el-tab-pane label="验证码登录" name="valid-code-login">
            <ValidCodeLogin />
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="password-login">
            <PasswordLogin ref="passwordLogin" />
          </el-tab-pane>
        </el-tabs>
        <el-divider content-position="center" class="divider"><span class="divider">其他方式登录</span></el-divider>
        <div class="login-social">
          <div><svg-icon name="weixin" size="24px" color="#07c160" ></svg-icon></div>
          <div><svg-icon name="qq" size="24px" color="#50c8fd"></svg-icon></div>
          <div><svg-icon name="github" size="24px" color="#24292f"></svg-icon></div>
          <div><svg-icon name="gitee" size="24px" color="#c71d23"></svg-icon></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type {TabPanelName} from 'element-plus'
  import SvgIcon from '@components/SvgIcon/index.vue'
  import ValidCodeLogin from './components/ValidCodeLogin/index.vue'
  import PasswordLogin from './components/PasswordLogin/index.vue'

  let passwordLogin =  ref<InstanceType<typeof PasswordLogin> | null>(null)

  const changeLogin = (name: TabPanelName) => {
    if (name.valueOf() === 'password-login' && passwordLogin.value) {
      passwordLogin.value.handleCaptcha()
    }
  }
</script>

<style scoped lang="less">
  @import url('@assets/styles/index.less');
  .login-page {
    &:extend(.flex-column-center);
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    .logo {
      height: 60px;
      margin-bottom: 20px;
    }
    .login-container {
      &:extend(.flex-row-center);
      &:extend(.box-shadow);
      .left-container {
        &:extend(.flex-column-center);
        width: 350px;
        padding: 15px;
      }
      .right-container {
        &:extend(.flex-column-center);
        padding: 20px 0;
        border-left: 1px solid #dcdfe6;
        .login-form {}
        .divider {
          color: #dcdfe6;
        }
        .login-social {
          &:extend(.flex-row-center);
          width: 100%;
          justify-content: space-around;
          div {
            &:extend(.flex-row-center);
            border: none;
            border-radius: 50%;
            line-height: inherit;
            cursor: pointer;
            width: 36px;
            height: 36px;
            background:#f6f6f6;
          }
        }
      }
    }
  }

  .login-bg {
    background: rgb(242,243,245);
    background: linear-gradient(90deg, rgba(242,243,245,1) 0%, rgba(250,250,251,1) 50%, rgba(242,243,245,1) 100%);
  }
</style>
