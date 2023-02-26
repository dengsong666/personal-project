<script setup lang="ts">
import Png from '@/assets/images/111.png'
const classification = reactive([
  {
    name: '',
    label: '肉类'
  }
])
</script>

<template>
  <div v-if="$route.name == 'Cookbook'" class="grid-1-4-24">
    <div v-for="v in 10" class="flex-col h250px rd-20px overflow-hidden" :style="`background-image: url(${Png})`" @click="$router.push({ name: 'List' })">
      <span class="bg-#000a p8px mtauto c-#fff text-18px">肉类</span>
    </div>
  </div>
  <router-view v-else />
</template>

<style lang="scss" scoped></style>
