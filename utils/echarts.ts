import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  DataZoomInsideComponent,
  MarkLineComponent, LegendComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,

} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import type { InsideDataZoomComponentOption } from 'echarts';


// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | InsideDataZoomComponentOption
  | LegendComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomInsideComponent,
  MarkLineComponent,
  LegendComponent
]);


export function setChart(selector: string, option: ECOption, theme = null) {
  const dom = document.querySelector(selector) as HTMLElement
  const chart = echarts.getInstanceByDom(dom) || echarts.init(dom, theme)
  chart.resize()
  chart.group = 'mood'
  chart.setOption({
    legend: { show: true },
    xAxis: {
      type: "category", show: false
    },
    tooltip: { trigger: "axis", },
    dataZoom: { type: "inside", start: 90 },
    grid: { left: 50, right: 40, top: 30, bottom: 20 },
    ...option
  })
  echarts.connect('mood');
}