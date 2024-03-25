<script lang="ts" setup>
import { NCheckboxGroup, NCheckbox, NButton, NPopover, NForm, NFormItem, NInput, NSwitch } from "naive-ui";
const enabled = ref(["vol", "mood", "gd", "zt"])
const h = computed(() => 100 / enabled.value.length + "%")
const vol = ref(0)
const modelVol = reactive({
  code: "",
  time: "",
  bs: "S",
})
const { data: mood } = await useFetch('/api/mood/get')
onMounted(() => renderChart());
watch(() => enabled.value, () => renderChart())
async function renderChart() {
  const data = mood.value || [];
  console.log(data);
  const { data: new_mood } = await useFetch('/api/mood/post', { method: 'post', body: data.map((item) => item.date) })
  console.log(new_mood.value);
  setChart("#vol", {
    dataset: { source: data.map(({ date, all_vol, zt_vol, bx }) => ({ date, all_vol, zt_vol, ...bx })) as any },
    yAxis: [{ name: "全市场成交额" }, { name: "涨停成交额" }],
    series: [
      {
        type: "line",
        smooth: true,
        name: "市场成交额",
        yAxisIndex: 0,
        encode: {
          y: "all_vol",
        },
      },
      {
        type: "line",
        name: "涨停成交额",
        yAxisIndex: 1,
        smooth: true,
        encode: {
          y: "zt_vol",
        },
        markLine: { data: [{ type: "min" }] },
      },
      {
        type: "bar",
        name: "沪股通",
        barWidth: 5,
        yAxisIndex: 1,
        encode: {
          y: "sh",
        },
      },
      {
        type: "bar",
        name: "深股通",
        barWidth: 5,
        yAxisIndex: 1,
        encode: {
          y: "sz",
        },
      },
    ],
  });
  setChart("#mood", {
    dataset: { source: data.map(({ date, ths_mood, zr_jsy }) => ({ date, ths_mood, ...zr_jsy })) as any },
    yAxis: [{ name: "情绪" }, { name: "收益率", max: 5, axisLabel: { formatter: "{value}%" } }],
    series: [
      {
        type: "line",
        smooth: true,
        name: "同花顺情绪",
        yAxisIndex: 0,
        encode: {
          y: "ths_mood",
        },
        markLine: {
          data: [{ type: "min" }],
        },
      },
      {
        type: "line",
        smooth: true,
        name: "涨停收益率",
        yAxisIndex: 1,
        encode: {
          y: "zt",
        },
        markLine: { data: [{ yAxis: 0 }], lineStyle: { color: "red" } },
      },
      {
        type: "line",
        smooth: true,
        name: "连板收益率",
        yAxisIndex: 1,
        encode: {
          y: "lb",
        },
      },
      {
        type: "line",
        smooth: true,
        name: "炸板收益率",
        yAxisIndex: 1,
        encode: {
          y: "zb",
        },
      },
    ],
  });
  setChart("#mood1", {
    dataset: { source: data.map((item) => ({ date: item.date, height: item.gdb?.height, name: item.gdb?.name, dm_num: item.dm_num, zt_fbl: item.zt_fbl, lbl: item.zt_jjl.all.ratio })) as any },
    yAxis: [
      { name: "赚钱效应", max: 15 },
      { name: "封板率", axisLabel: { formatter: "{value}%" } },
    ],
    series: [
      {
        type: "line",
        smooth: true,
        name: "连板高度",
        yAxisIndex: 0,
        encode: {
          y: "height",
        },

        label: {
          show: true,
          formatter: "{@name}\n",
          fontSize: 10,
        },
        labelLayout: { hideOverlap: true },
      },
      {
        type: "line",
        name: "大面数量",
        yAxisIndex: 0,
        smooth: true,
        encode: {
          y: "dm_num",
        },
      },
      {
        type: "line",
        name: "封板率",
        yAxisIndex: 1,
        smooth: true,
        encode: {
          y: "zt_fbl",
        },
        markLine: { data: [{ type: "average" }] },
      },
      {
        type: "line",
        name: "连板率",
        yAxisIndex: 1,
        smooth: true,
        encode: {
          y: "lbl",
        },
        markLine: { data: [{ type: "average" }] },
      },
    ],
  });
  setChart("#mood2", {
    xAxis: {
      type: "category",
      data: data.map((item) => item.date),
      axisTick: { alignWithLabel: true },
      axisLabel: { formatter: (v) => `${v.slice(4, 6)}-${v.slice(6)}`, align: "center", interval: 10 },
    },
    yAxis: [{ name: "涨跌停数量" }, { name: "晋级率", axisLabel: { formatter: "{value}%" } }],
    series: [
      {
        type: "bar",
        name: "涨停数量",
        barWidth: 5,
        yAxisIndex: 0,
        data: data.map((item) => item.zt_num ?? 0),
      },
      {
        type: "bar",
        name: "跌停数量",
        barWidth: 5,
        yAxisIndex: 0,
        data: data.map((item) => item.dt_num ?? 0),
      },
      {
        type: "line",
        smooth: true,
        name: "二板",
        yAxisIndex: 1,
        data: data.map((item) => item.zt_jjl.two.ratio ?? 0),
      },
      {
        type: "line",
        smooth: true,
        name: "三板",
        yAxisIndex: 1,
        data: data.map((item) => item.zt_jjl!.three.ratio ?? 0),
      },
      {
        type: "line",
        smooth: true,
        name: "四板",
        yAxisIndex: 1,
        data: data.map((item) => item.zt_jjl.four.ratio ?? 0),
      },
    ],
  });
}
async function onGetVol() {
  vol.value = await $fetch('/api/vol', { method: "get", query: modelVol })
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100vh">
    <div v-show="enabled.includes('vol')" id="vol" class="chart"></div>
    <div v-show="enabled.includes('mood')" id="mood" class="chart"></div>
    <div v-show="enabled.includes('gd')" id="mood1" class="chart"></div>
    <div v-show="enabled.includes('zt')" id="mood2" class="chart"></div>
    <div style="position: absolute;bottom: 20px;padding: 16px;">
    <button @click="useFetch('/api/mood/get')">获取数据</button>
      <n-checkbox-group v-model:value="enabled">
        <n-checkbox value="vol" label="成交量" />
        <n-checkbox value="mood" label="情绪" />
        <n-checkbox value="gd" label="高度" />
        <n-checkbox value="zt" label="涨停" />
      </n-checkbox-group>
      <n-button type="primary">
        <n-popover trigger="hover">
          <template #trigger>
            <n-button type="primary">成交</n-button>
          </template>
<n-form ref="formRef" :model="modelVol">
  <n-form-item label="代码">
    <n-input v-model:value="modelVol.code" />
  </n-form-item>
  <n-form-item label="时间">
    <n-input v-model:value="modelVol.time" />
  </n-form-item>
  <n-form-item label="买卖">
    <n-switch v-model:value="modelVol.bs" checked-value="B" unchecked-value="S" />
  </n-form-item>
  <n-form-item>
    <n-button type="primary" @click="onGetVol">确认</n-button>
    <div style="margin-left: 24px;">{{ vol }}万</div>
  </n-form-item>
</n-form>
</n-popover>
</n-button>
</div>
</div>
</template>

<style scoped lang="scss">
.chart {
  position: relative;
  width: 100%;
  height: v-bind(h);
}
</style>
