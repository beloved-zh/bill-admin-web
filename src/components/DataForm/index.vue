<script setup lang="ts">
import type { Form, GutterObject } from 'tdesign-vue-next'

defineOptions({
  name: 'DataForm',
  inheritAttrs: false
})

interface Props {
  rowGutter?: number | GutterObject | Array<GutterObject | number>
}

const props = withDefaults(defineProps<Props>(), {
  rowGutter: () => [16, 16]
})

const attrs = useAttrs()
const slots = useSlots()

const emit = defineEmits<{
  (e: 'queryCallback'): void
}>()

const formRef = ref<InstanceType<typeof Form>>()
const showPanel = ref<boolean>(false)

const gutter = computed<Array<GutterObject | number>>(() => {
  if (props.rowGutter instanceof Array<GutterObject | number>) {
    if (props.rowGutter.length === 0) {
      return [16, 16]
    } else if (props.rowGutter.length === 1) {
      return [...props.rowGutter, 16]
    }
    return props.rowGutter
  }
  return [props.rowGutter, 16]
})

const formRowGap = computed(() => `${gutter.value[1]}px`)

const handleMore = () => {
  showPanel.value = !showPanel.value
}

const handleQuery = ({ validateResult }) => {
  if (validateResult !== true) {
    return
  }
  emit('queryCallback')
}

defineExpose({ formRef })
</script>

<template>
  <t-form
    ref="formRef"
    class="data-form"
    v-bind="attrs"
    @submit="handleQuery"
  >
    <t-row :gutter="gutter">
      <slot />
    </t-row>
    <t-row v-show="showPanel" :gutter="gutter">
      <slot name="hidePanel" />
    </t-row>
    <t-row :gutter="gutter" class="operate">
      <t-col :span="6" class="more-operate">
        <t-space>
          <slot name="moreOperate" />
        </t-space>
      </t-col>
      <t-col :span="6" class="default-operate">
        <t-space>
          <t-button theme="primary" type="submit">
            <template #icon>
              <my-icon name="icon-search" />
            </template>搜索
          </t-button>
          <t-button theme="default" variant="outline" type="reset">
            <template #icon>
              <my-icon name="icon-reset" />
            </template>重置
          </t-button>
          <t-button theme="default" variant="outline">
            <template #icon>
              <my-icon name="icon-import" />
            </template>导入
          </t-button>
          <t-button theme="default" variant="outline">
            <template #icon>
              <my-icon name="icon-export" />
            </template>导出
          </t-button>
          <t-button v-if="slots.hidePanel" theme="default" variant="outline" @click="handleMore">
            <template #icon>
              <my-icon :name="showPanel ? 'icon-up' : 'icon-down'" />
            </template>
          </t-button>
        </t-space>
      </t-col>
    </t-row>
  </t-form>
</template>

<style scoped lang="less">
  .data-form {
    display: flex;
    flex-direction: column;
    row-gap: v-bind(formRowGap);
  }

  .operate {
    margin-bottom: v-bind(formRowGap);

    .more-operate {
      text-align: left;
    }

    .default-operate {
      text-align: right;
    }
  }
</style>
