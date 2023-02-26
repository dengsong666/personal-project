<script setup lang="ts">
const list = [
  { food: '乳鸽', purine: 10, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 15, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 34, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 66, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 80, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 120, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 130, fat: 20, heat: 100 },
  { food: '乳鸽', purine: 134, fat: 20, heat: 100 },
  { food: '乳鸽', purine: undefined, fat: 20, heat: 100 }
]
const inRange = (v: number | undefined, a: number, b: number) => v && v >= a && v < b
const purineStandard = (value?: number) => {
  if (inRange(value, 0, 50)) return { color: '#10b981', label: '低' }
  else if (inRange(value, 50, 100)) return { color: '#f59e0b', label: '中' }
  else if (inRange(value, 100, 150)) return { color: '#dc2626', label: '高' }
  else return { color: '#6b7280', label: '未知' }
}
</script>

<template>
  <div v-if="$route.name == 'List'" class="grid-1-5-24">
    <div class="flex-row flex-nowrap rd-16px wrap shadow overflow-hidden" v-for="{ food, purine, fat, heat } in list" @click="$router.push({ name: 'Food', params: { food } })">
      <div class="flex-center w100px c-#fff text-24px" :style="`background-color: ${purineStandard(purine).color}`">{{ purineStandard(purine).label }}</div>
      <div class="py8px px16px">
        <span class="text-16px">{{ food }}</span>
        <ul class="text-12px">
          <li>嘌呤：{{ purine }}mg</li>
          <li>脂肪：{{ fat }}mg</li>
          <li>热量：{{ heat }}mg</li>
        </ul>
      </div>
    </div>
  </div>
  <router-view v-else />
</template>

<style lang="scss" scoped></style>
