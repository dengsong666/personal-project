<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import { SearchOutlined } from '@vicons/material'
import { RouterLink } from 'vue-router'
import { useCommon } from '@/store'
const activeMenu = ref('index')
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: { name: 'Home' }, innerHTML: '首页' }),
    key: 'home'
  },
  {
    label: () => h(RouterLink, { to: { name: 'Cookbook' }, innerHTML: '食谱' }),
    key: 'cookbook'
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
      <n-menu v-model:value="$route.path.split('/')[1]" mode="horizontal" :options="menuOptions" />
      <n-input placeholder="搜索" class="search">
        <template #prefix>
          <n-icon :component="SearchOutlined" />
        </template>
      </n-input>
    </n-layout-header>
    <n-layout-content class="pb20px">
      <n-breadcrumb class="pb20px">
        <n-breadcrumb-item v-for="route in $route.matched" :href="route.children.length ? route.path : ''">
          {{ route.meta.title || useCommon().last_breadcrumb }}
        </n-breadcrumb-item>
      </n-breadcrumb>
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
  margin-right: 20px;
  transition: max-width 1s;
  &:focus-within {
    max-width: 400px;
  }
}
</style>
