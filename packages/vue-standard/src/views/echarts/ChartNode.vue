<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
onMounted(() => {
  var chartDom = document.getElementById('main');
  console.log(chartDom);
  // var myChart = echarts.init(chartDom);
  var myChart = echarts.init(chartDom, null, { renderer: 'svg' });
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
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
  const MAX = [6000, 6000, 6000, 6000, 6000, 5000, 4000, 3000, 2000, 4000, 3000, 2000]
  const VALUE = [2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654]
  let option = {
    backgroundColor: "#010d3a",
    title: {
      text: '未知的命运',
      top: 32,
      left: 18,
      textStyle: {
        color: '#00F6FF',
        fontSize: 24
      }
    },
    grid: {
      // zlevel:500000,
      // left: 20,
      // right: 40,
      top: 107,
      // containLabel: true
    },
    legend: {
      type: 'plain',
      left: 20,
      "data": [
        { name: '去年收入', icon: 'circle', itemStyle: { color: 'rgba(7,29,97,.6)', border: 1 } },
        { name: '今年收入', icon: 'circle', itemStyle: { color: '#3B80E2' } },
      ],
      formatter: '部门经理 {name}',
      textStyle: {
        color: 'white'
      }
    },
    toolTip: {

    },
    xAxis: {
      type: 'category',
      name: '娃哈哈哈哈',
      data: ['德州', '德城区', '陵城区', '禹城市', '乐陵市', '临邑县', '平原县', '夏津县', '武城县', '庆云县', '宁津县', '齐河县'],
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      nameGap: 40,
      // boundaryGap: ['40%','90%'],
      // boundaryGap: false,
      // min:'dataMin',
      // max:12000,
      // boundaryGap: true,
      // inverse:true,
      nameLocation: 'center',
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      // min:'dataMin',
      // max:12000,
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
      boundaryGap: ['0', '30%']
    },
    series: [
      {
        type: 'custom',
        "name": "去年收入",
        renderItem: function (params, api) {
          // console.log(api.value(0));
          // console.log(api.value(1));
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
  }
  option && myChart.setOption(option);
})
</script>
<template>
  <div id="main" style="height:600px;width:800px"></div>
</template>