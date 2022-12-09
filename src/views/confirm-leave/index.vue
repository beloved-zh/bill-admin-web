<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const contentRef = ref<HTMLDivElement>()
const targetRef = ref<HTMLDivElement>()

const target = computed<string>(() => route.query.target as string)

const showOpen = computed<boolean>(() => {
  if (!targetRef.value) {
    return false
  }
  if (!contentRef.value) {
    return false
  }
  return targetRef.value.scrollWidth > contentRef.value.scrollWidth
})

const open = ref(false)

const accessTarget = () => {
  window.open(target.value, '_self')
}
</script>

<template>
  <div class="page-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <img src="/src/assets/images/logo.png" alt="LOGO">
          <span>LOGO</span>
        </div>
      </template>
      <div class="card-content">
        <div class="title">
          即将跳转到外部网站，安全性未知，是否继续
        </div>
        <div ref="contentRef" class="content">
          <div ref="targetRef" class="target" :class="open ? 'newline' : 'beyond—hiding'">
            {{ target }}
          </div>
          <el-link v-if="showOpen" type="primary" class="link" @click="open = !open">
            {{ open ? '收起' : '展开' }}
          </el-link>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="accessTarget">
            继续访问
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
  @import url('@assets/styles/base.less');
  .page-content {
    &:extend(.flex-row-center);
    width: 100%;
    height: 100%;
    background-color: #f4f5f5;

    .box-card {
      width: 600px;
    }

    .card-header {
      &:extend(.flex-row-center);
      justify-content: flex-start;

      img {
        width: 30px;
        height: 30px;
      }

      span {
        margin-left: 10px;
        font-weight: 700;
        font-size: 30px;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .card-content {
      .title {
        margin: 0;
        font-size: 18px;
        line-height: 24px
      }

      .content {
        padding: 16px 0 24px;
        border-bottom: 1px solid #e5e6eb;
        position: relative;
        font-size: 14px;

        .target {
          color: gray;
          padding-bottom: 5px;
        }

        .link {
          float: right;
        }
      }

      .bottom {
        text-align: right;
        margin-top: 20px;
      }

      .beyond—hiding {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .newline {
        overflow-wrap: break-word;
      }
    }
  }
</style>
