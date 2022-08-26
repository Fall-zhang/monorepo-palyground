<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
/* 如果只输入 xData, 表示 x 轴为主坐标 */
const props = defineProps({
  title: {
    require: false,
    default: ''
  },
  theme: {
    require: false,
    default: 'dark',
  },
  xData: {
    require: true,
    type: Array,
    default: () => ([])
  },
  yData: {
    require: true,
    type: Array,
    default: () => ([])
  },
  seriesData: {

  }
})
const mychart = ref(null)
let MAX = ref([6000, 6000, 6000, 6000, 6000, 5000, 4000, 3000, 2000, 4000, 3000, 2000])
let VALUE = ref([2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654])
let option = initOption()
const CubeLeft = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y]
    const c1 = [shape.x - 9, shape.y - 9]
    const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
    const c3 = [xAxisPoint[0], xAxisPoint[1]]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
})
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x, shape.y]
    const c2 = [xAxisPoint[0], xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
    const c4 = [shape.x + 18, shape.y - 9]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
})
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y]
    const c2 = [shape.x + 18, shape.y - 9]
    const c3 = [shape.x + 9, shape.y - 18]
    const c4 = [shape.x - 9, shape.y - 9]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
})
echarts.graphic.registerShape('CubeLeft', CubeLeft)
echarts.graphic.registerShape('CubeRight', CubeRight)
echarts.graphic.registerShape('CubeTop', CubeTop)
let initChart = null
onMounted(() => {
  initChart = echarts.init(mychart.value, null, { renderer: 'svg' });
  option && initChart.setOption(option);
  setInterval(() => {
    console.log('iniddind');
    VALUE.value = VALUE.value.map(item => {
      return item + Math.round(Math.random() * 1000)
    })
    // console.log(VALUE.value);
  }, 5000)
})
watch(option, () => {
  initChart.setOption(option)
})

function initOption() {
  if (props.xData.length == 0 && props.yData.length === 0) {
    throw new TypeError('至少向chart组件传入一个的数据')
  }
  let xAxis = {
    type: 'category',
    name: 'x轴',
    axisLine: {
      lineStyle: {
        color: 'white'
      }
    },
    nameGap: 40,
    nameLocation: 'center',
    axisLabel: {
      fontSize: 12
    }
  }
  let yAxis = {
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        color: 'white'
      }
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      fontSize: 16,
      color: 'white'
    },
    boundaryGap: ['0', '10%']
  }
  if (props.xData.length > 0) {
    console.log('meit');
    xAxis.data = props.xData
  } else {
    xAxis.data = props.yData
    yAxis.type = 'category'
    xAxis.type = 'value'
  }
  const option = reactive({
    backgroundColor: "#010d3a",
    title: {
      text: props.title,
      top: 32,
      left: 18,
      textStyle: {
        color: '#00F6FF',
        fontSize: 24
      }
    },
    grid: {
      // top: 107,   
    },
    xAxis,
    yAxis,
    series: [
      {
        type: 'custom',
        "name": "去年收入",
        renderItem: function (params, api) {
          const location = api.coord([api.value(0), api.value(1)])
          const shape = {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          }
          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: shape,
              style: { fill: 'rgba(7,29,97,.6)' }
            }, {
              type: 'CubeRight',
              shape: shape,
              style: { fill: 'rgba(10,35,108,.7)' }
            }, {
              type: 'CubeTop',
              shape: shape,
              style: { fill: 'rgba(11,42,106,.8)' }
            }]
          }
        },
        data: MAX
      },
      {
        "name": "今年收入",
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          const shape = {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          }
          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: shape,
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3B80E2'
                },
                {
                  offset: 1,
                  color: '#49BEE5'
                }
                ])
              }
            }, {
              type: 'CubeRight',
              shape: shape,
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3B80E2'
                },
                {
                  offset: 1,
                  color: '#49BEE5'
                }
                ])
              }
            }, {
              type: 'CubeTop',
              shape: shape,
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3B80E2'
                },
                {
                  offset: 1,
                  color: '#49BEE5'
                }
                ])
              }
            }]
          }
        },
        data: VALUE
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          color: '#fff',
          offset: [-8, 30]
        },
        itemStyle: {
          color: 'transparent'
        },
        data: VALUE
      }
    ]
  })
  return option
}
</script>
<template>
  <div id="main" ref="mychart" style="height:600px;width:800px"></div>
  <!-- <div>{{ option.series }}</div> -->
  <div style="height: 20px;"></div>
  <!-- <div>{{ VALUE }}</div> -->
</template>