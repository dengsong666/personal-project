<script lang='ts' setup>
const v = ref()

async function onClick(op: "post" | "delete" | "put" | "get", body: any = null) {
  const { data } = await useFetch('/api/mood', { method: op as any, body })
  console.log(data.value);
  v.value = data.value

}
</script>

<template>
  <NuxtPage />
</template>

<style lang='scss'>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
