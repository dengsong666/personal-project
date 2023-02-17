<script setup lang="ts">
const a = await(await fetch('https://api.xygeng.cn/one/get/')).json()
</script>

<template>
  <n-result status="404" title="你访问的内容不存在" :description="a">
    <template #footer>
      <n-button @click="$router.push('/')">返回首页</n-button>
    </template>
  </n-result>
</template>

<style lang="scss" scoped></style>
