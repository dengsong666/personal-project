<script setup lang="ts">
import { getDailySentence } from '@/api'

const {
  data: { content, origin }
} = await getDailySentence()
</script>

<template>
  <n-result status="404" title="你访问的内容不存在" :description="`${content} —— ${origin}`">
    <template #footer>
      <n-button @click="$router.push('/')">返回首页</n-button>
    </template>
  </n-result>
</template>

<style lang="scss" scoped></style>
