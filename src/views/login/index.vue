<template>
  <div class="login-page login-bg">
    <div class="login-container">
      <div class="left-container">
        <svg-icon name="svg-login-banner" size="100%" />
      </div>
      <div class="right-container">
        <t-tabs :default-value="1">
          <t-tab-panel :value="1" label="账号密码登录">
            <PasswordLogin ref="passwordLogin" />
          </t-tab-panel>
          <t-tab-panel :value="2" label="手机验证登录">
            <ValidCodeLogin />
          </t-tab-panel>
        </t-tabs>
        <t-divider>其他方式登录</t-divider>
        <div class="login-social">
          <my-icon name="icon-weixin" size="24px" style="color: #07c160" />
          <my-icon name="icon-qq" size="24px" style="color: #50c8fd" />
          <my-icon name="icon-github" size="24px" style="color: #24292f" />
          <my-icon name="icon-gitee" size="24px" style="color: #c71d23" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  defineOptions({
    name: 'Login'
  })

  import ValidCodeLogin from './components/ValidCodeLogin/index.vue'
  import PasswordLogin from './components/PasswordLogin/index.vue'

</script>

<style scoped lang="less">
  @import url('@assets/styles/index.less');
  .login-page {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
      height: 60px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .login-container {
      &:extend(.box-shadow);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px;
      width: 50%;

      .left-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .right-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 40px;
        flex: 1;

        .login-social {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
      }
    }
  }

  .login-bg {
    background: linear-gradient(90deg, rgba(242,243,245,1) 0%, rgba(250,250,251,1) 50%, rgba(242,243,245,1) 100%);
  }
</style>
