<script setup lang="ts">
import { useCommon } from '@/store'

useCommon().last_breadcrumb = useRoute().params.food as string
</script>

<template>
  <div class="flex-row flex-nowrap">
    <n-alert title="低嘌呤食物" type="success">
      牛骨头火锅主要特色来自对主料选用和每块骨头的块都很大，而大块的肉经煮炖后往往会更加鲜美，肉香扑鼻，淡淡的酱香，看着就诱人。牛骨除含蛋白、脂肪、维生素外，还含有大量磷酸钙、骨胶原、骨粘蛋白等。
    </n-alert>
    <img class="min-w100px" src="@/assets/images/111.png" alt="" srcset="" />
  </div>
</template>

<style lang="scss" scoped></style>
