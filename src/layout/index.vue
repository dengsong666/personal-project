<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import { SearchOutlined } from '@vicons/material'
import { RouterLink } from 'vue-router'
const activeMenu = ref('index')
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: { name: 'Home' } }, { default: '首页' }),
    key: 'index'
  },
  {
    label: () => h(RouterLink, { to: { name: 'Purine' } }, { default: '嘌呤' }),
    key: 'purine'
  },
  {
    label: '预防',
    key: 'prevent'
  },
  {
    label: '治疗',
    key: 'cure'
  }
]
</script>
<template>
  <n-layout class="h100%">
    <n-layout-header class="flex-row my8px">
      <n-menu v-model:value="activeMenu" mode="horizontal" :options="menuOptions" />
      <n-input placeholder="搜索" class="search">
        <template #prefix>
          <n-icon :component="SearchOutlined" />
        </template>
      </n-input>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <router-view />
    </n-layout-content>
    <n-layout-footer class="text-center p16px">2023 by @dengsong</n-layout-footer>
  </n-layout>
</template>
<style scoped lang="scss">
:deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
}
.search {
  max-width: 300px;
  margin-left: auto;
  transition: max-width 1s;
  &:focus-within {
    max-width: 400px;
  }
}
</style>
