<script setup lang="ts">
import Layout from '@/layout/index.vue'
import 'uno.css'
import '@/styles/reset.scss'
</script>

<template>
  <Suspense>
    <Layout />
  </Suspense>
</template>

<style scoped>
#app {
  padding: 0 10vw;
  min-width: 1440px;
}
</style>
