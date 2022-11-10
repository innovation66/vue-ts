<template>
  <div class="nav-header">
    <div class="nav-icon">
      <el-icon v-if="!isFold" @click="handleFoldClick" class="fold-menu">
        <Fold />
      </el-icon>
      <el-icon v-else @click="handleFoldClick" class="fold-menu">
        <component :is="Arrow"></component>
      </el-icon>
    </div>
    <div class="content">
      <lzs-bread :breads="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
import userInfo from './user-info.vue'
import LzsBread, { IBreadcrumb } from '@/base-ui/bread'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreads } from '@/utils/mapmenus'

export default defineComponent({
  components: {
    ArrowRightBold,
    userInfo,
    LzsBread
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const Arrow = ref(ArrowRightBold)
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const path = route.path
      return pathMapBreads(userMenus, path)
    })

    return {
      isFold,
      handleFoldClick,
      Arrow,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>
