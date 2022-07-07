<template>
  <div class="login-container">
    <el-form
        class="login-form"
        label-position="left"
    >
      <div class="title-container">
        <h3 class="title">XXXX系统</h3>
      </div>
      <el-form-item>
        <el-input
            placeholder="username"
            name="username"
            type="text"
            tabindex="1"
            class="form-input"
        >
          <template #prefix>
            <span class="svg-container">
              <svg-icon name="user" size="14px" ></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
            placeholder="password"
            name="password"
            type="password"
            tabindex="2"
            :show-password="true"
        >
          <template #prefix>
            <span class="svg-container">
              <svg-icon name="password" size="14px" ></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
            placeholder="请输入验证码"
            name="password"
            type="password"
            tabindex="2"
            :show-password="true"
        >
          <template #prefix>
            <span class="svg-container">
              <svg-icon name="valid_code" size="14px" ></svg-icon>
            </span>
          </template>
          <template #suffix>
            <div class="captcha">
              <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAkCAIAAADNSmkJAAAEl0lEQVR42u2Ye0xTVxzHyTadZi+3LHEsc4/EZMuyLVuIUxIxurnNTZcZzeZeMf6hFWh4BKkMg8jWqWzgkEzQboDVlroOtoI8pARXHaaAPGSj0HS1dKNcoaOtlpYVStvt29ykqS1gi7e3mTm/nDSn55x7z6+f/s73/n435l9irFgMQUBAE9DECGgCmoAmRkAT0MQIaAKacbMara3iVlm+TJItkeZKFULFsHqYgA7VtEPGxEPiVTvyn343+7mtuTvyhC0d6uBl6ktqUaaop6HHqDOOm8bx2dfSJ84Snzt2zjnp/P+BHp9w7CuRPbtl/8JVyQ+uSV2zq0Da3Bk5b8pqLj32ZuaX5Q1tv+v0lAmfRyUtT7ydtSn9mG1i0kKpOmv3yw6vFKY9IuDcI9m3vK1qj8Nu8l3ucroQ42DtdrtZYNet/ivpcOWL2z5/ICH1/oSU1xK/udCtmQ9oi3Xi+fcPxMRxAhrQR8LvvqsUKBuMloBxx5QTMQ7WAk5McKvMWmazDPkWA3FjcePAxQE2gjSIzN0rEuVt/WGDTi34ARc/ufEzmeIKoKP9/EsP4uuuFbt7NQbG/QbKEz9dnHFq2uXekFIsyHimu4Fv1HeUcY+ah4cHu6tFvFiwbvlum/9ifa9eXipnAfQrH/NLflTg5E05p1U6ChENXHGfHgwb9LJ3snClouum43D+shqDvOJqxv1eFM+F07PN1lzo3bynlO4LOAK6YxhoBuiT6Uv8V9otdog1+ypM/X0dZO6NTw4b9IKVSbgS4hig2hhM2FkQiZM4xywkBYeJ7p/KOAU59kb6pB2gy7iLblqpMlTlVbEPGkGNn/DUpuywQce+xZstoh/fsJdxRx99PQNyPNtsk1L1wgd5dL+usI7SUOiM6pQAXZMf779SKVWisUy5X3dt+eYckMkXNoUNeif/NK3ROLa0RkOs8RWD961OYdzXtZzCgD/V39KPSNHovkapqS+q97hdtV+vBmhtR6VvmWnIVJFSgYRv7r264uJCaSF6frlfv2RtOrBsTPvWNUvCMxfoa2M3aJn2b5yDIvrxyjhoYZ1yfVLRjFNXNEPIn3wKjtTiTM6ZxqLtoFxftN63zEyZMY4U+5Z7MQh6kBrDWQSTrbwTk1PT88yjR81W7lcS6A70GhVEwWk5rUT4A0MnGKL3SC1w+sSN7cFpH8aRYvsPtkr2eh+DabGjV7XeFNDmQPGCEkbbrmVZNMAXQD7JKXe7PUxWhqKGdtz3pQ+/YBy0t97Tj4BpTmkNOvg6dt2G4gXJdQD9rro8UK5Ie0h+XAihQBJSza9GqXJLxYiEPbzOKxo4/QyX4Ft4x3FfVBAR8nvEZEXZDaHALi9/xMdGATlf19kDoFzOXTyibZ33LgxKB62oHo+HSdDtfYOoVnBf5W+6qLwx6DybC8rfJy80qJpu5z6Mg77ddx3rdh9BXmW22m/Y/oFo+FQ/mpSTFvzZW3unvSYNLudf3X4I0KPi64zvOujmsI1FjSAjEf1rzx/vZZQsfSMTiTNK+0JRM+r6aP2kOxk0MZakgxgBTUATI6AJaAKaGAFNQBObwf4DyQYC8nEVs3QAAAAASUVORK5CYII="
              />
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
            size="default"
            type="primary"
            style="width: 100%"

        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@components/SvgIcon/index.vue'
</script>

<style scoped lang="less">
  @inputBg: #283443;
  @inputHeight: 42px;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: @loginBg;
    overflow: hidden;

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: #eeeeee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      :deep(.el-form-item) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        .el-input {
          height: @inputHeight;
          border-radius: 5px;
          .el-input__wrapper {
            background: transparent;
            box-shadow: none;
            .el-input__inner {
              background: transparent;
              border: 0;
              -webkit-appearance: none;
              border-radius: 0;
              color: #eeeeee;
              caret-color: #ffffff;
              box-shadow: none;
              &:hover {
                border-color: var(--el-input-hover-border, var(--el-border-color-hover));
                box-shadow: none;
              }
            }
          }
        }
      }

      .captcha {
        position: absolute;
        right: 0;
        top: 0;

        img {
          height: @inputHeight;
          cursor: pointer;
          vertical-align: middle;
        }
      }
    }
  }
</style>
