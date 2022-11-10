<template>
  <div class="page-search">
    <lz-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" :icon="Refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="handleQueryClick">
            搜索</el-button
          >
        </div>
      </template>
    </lz-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LzForm, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    LzForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems: IFormItem[] = props.searchFormConfig.formItems ?? []
    const formOriginalData: any = {}
    for (const item of formItems) {
      formOriginalData[item.field] = ''
    }
    const formData = ref(formOriginalData)
    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      for (const key in formOriginalData) {
        formData.value[key] = formOriginalData[key]
      }
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
