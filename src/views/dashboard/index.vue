<template>
  <div class="main" @contextmenu.prevent="openMenu($event)" ref="mainRef">
    <h1>首页</h1>
    <RightKeyMenu v-model="show" :clikeEvent="clikeEvent" :offset="-10" :auto-close="true" :parent-el="parentEl">
      <ul class="menu-main">
        <li>关闭</li>
        <li>关闭全部</li>
        <li>关闭其它</li>
      </ul>
    </RightKeyMenu>
  </div>

</template>

<script setup lang="ts">
  import SvgIcon from '@components/SvgIcon/index.vue'
  import RightKeyMenu from '@components/RightKeyMenu/index.vue'

  let top = ref(0)
  let left = ref(0)
  let show = ref(false)
  let clikeEvent = ref<MouseEvent>()
  let parentEl = ref<HTMLElement>()

  let mainRef = ref<HTMLDivElement>()

  const openMenu = (e: MouseEvent) => {

    if (!mainRef.value) {
      return
    }
    clikeEvent.value = e
    parentEl.value = mainRef.value

    show.value = true
  }

</script>

<style scoped lang="less">
  .main {
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: relative
  }
  .menu-main {
    list-style: none;
    margin: 0 8px;
    padding: 0;

    width: 100px;
    font-size: 12px;
    line-height: 28px;
    text-align: left;
    color: #444040;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    white-space: nowrap;
    z-index: 1000;
  }
  .menu-main:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .menu-main li {
    list-style: none;
    margin: 0;
    padding: 0 8px;
  }
  .menu-main li:hover {
    cursor: pointer;
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }

</style>
