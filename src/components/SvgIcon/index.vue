<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    }
  })

  const symbolId = computed(() => `#${props.prefix}-${props.name}`)

  const fontSize = computed(() => {
    let size = '20px'

    switch(props.size){
      case 'small':
        size = '20px'
        break;
      case 'default':
        size = '32px'
        break;
      case 'large':
        size = '48px'
        break;
      default:
        size = props.size
    }

    return size
  })
</script>

<style scoped lang="less">
.svg-icon {
  width: v-bind('fontSize');
  height: v-bind('fontSize');
  font-size: v-bind('fontSize');
  vertical-align: middle;
  /* 定义元素的颜色，currentColor是一个css变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
  fill: currentColor;
  color: currentColor;
  overflow: hidden;
}
</style>