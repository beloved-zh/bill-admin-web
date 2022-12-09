<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  autoClose: true,
  offset: 0
})

const emit = defineEmits(['update:modelValue'])

defineOptions({
  name: 'RightKeyMenu'
})

interface Props {
  modelValue: boolean
  clikeEvent: MouseEvent
  parentEl: HTMLElement
  autoClose?: boolean
  offset?: number
}

const top = ref(0)
const left = ref(0)

const menuRef = ref<HTMLDivElement>()

const showLocation = () => {
  if (!menuRef.value) {
    return
  }

  const clickX = props.clikeEvent.clientX
  const clickY = props.clikeEvent.clientY

  const { x: parentOffsetX, y: parentOffsetY, width: parentWidth } = props.parentEl.getBoundingClientRect()

  const menuWidth = menuRef.value.clientWidth

  // 菜单显示在左边
  if (clickX - parentOffsetX + props.offset + menuWidth >= parentWidth) {
    left.value = clickX - parentOffsetX + props.offset - menuWidth
  } else {
    left.value = clickX - parentOffsetX + props.offset
  }

  top.value = clickY - parentOffsetY + props.offset
}

watch(
  () => props.clikeEvent,
  () => {
    if (props.clikeEvent) {
      showLocation()
    }
  }
)

const closeMenu = () => {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  value => {
    if (value) {
      showLocation()
      // 自动关闭开启也保留手动关闭，否则点击 item 不能自动关闭
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

const menuMouseleave = () => {
  if (props.autoClose) {
    closeMenu()
  }
}
</script>

<template>
  <!-- v-show 是通过 display:none 隐藏的，隐藏时无法获取元素宽高，使用 visibility -->
  <div
    ref="menuRef"
    class="right-key-menu"
    :style="{ visibility: modelValue ? 'visible' : 'hidden', top: `${top}px`, left: `${left}px` }"
    @mouseleave="menuMouseleave"
  >
    <slot />
  </div>
</template>

<!-- 调用父元素需要设置 position: relative -->
<style scoped lang="less">
  .right-key-menu {
    position: absolute;
    z-index: 1000;
  }
  .right-key-menu:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
