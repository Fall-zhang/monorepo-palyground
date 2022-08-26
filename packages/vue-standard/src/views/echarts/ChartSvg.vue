<template>
  <div style="height: 600px;width:600px" ref="chart"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import humanPic from '@/assets/svg/elp.js'
import { onMounted } from 'vue';
// console.log(humanPic);
const chart = ref(null)
onMounted(() => {
  var echart = echarts.init(chart.value, null, { renderer: 'svg' });
  echart.setOption(option);
})
// 将数值数组，转换为百分比

var obj = ['2.25%', '41.54%', '32.88%', '16.77%', '5.43%', '0.36%', '0.03%']
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      let result = params[0].name + ': ' + params[0].value;
      return result
    }
  },
  xAxis: {
    // show: false,
    axisLine: {
      show: false
    },
    data: [],
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  color: [
    'rgba(55, 112, 255,0.7)', 'rgba(79, 116, 255,0.7)',
    'rgba(83, 116, 255,0.7)', 'rgba(85, 125, 255,0.7)',
    'rgba(101, 191, 255,0.7)', 'rgba(96, 227, 255,0.7)',
    'rgba(25, 255, 224,0.7)'],
  series: [{
    name: 'hill',
    type: 'pictorialBar',
    barCategoryGap: '0%',
    // symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    symbol: humanPic,
    symbolRepeat: "fixed",
    symbolRepeat: true,
    symbolClip: true,
    animation: false,
    label: {
      show: true,
      position: 'top',
      distance: 10,
      color: '#000',
      fontSize: 12,
      formatter: function (params) {
        return obj[params.dataIndex];
      }
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: [2, 30, 25, 16, 10, 6, 1],
    z: 10
  }]
};
</script>