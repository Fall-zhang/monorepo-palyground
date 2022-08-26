<template>
  <div style="height: 460px;width:980px" ref="chartNode">
  </div>
</template>
<script setup>
// 除了
import * as echarts from 'echarts'
// import 'echarts/map/js/china.js'
import chinaMap from '@/assets/map/china.json'
import chinaProvince from '@/assets/map/chinaProvince.js'
import './cubeRegister'
echarts.registerMap('china', { geoJSON: chinaMap });
const chartNode = ref(null)
let chart = null
const option = {
  visualMap: {
    min: 0,
    max: 1000,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    calculable: false,
    orient: 'horizontal',
    inRange: {
      color: ['#e0ffff', '#006edd'],
      symbolSize: [30, 100]
    }
  },
  tooltip: {
    padding: 8,
    enterable: true,
    transitionDuration: 1,
    textStyle: {
      color: '#fff',
      decoration: 'none',
    }
  },
  series: [{
    name: '接入医院数量',
    type: 'map',
    mapType: 'china',
    itemStyle: {
      normal: {
        label: {
          show: false
        }
      },
      emphasis: {
        label: {
          show: true
        }
      }
    },
    label: {
      normal: { //静态的时候展示样式
        show: true, //是否显示地图省份得名称
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      },
      emphasis: { //动态展示的样式
        color: '#fff',
      },
    },
    data: chinaProvince
  }]
}
onMounted(() => {
  tooltipCharts()
  var count = 0;
  var timeTicket = null;
  var dataLength = option.series[0].data.length;
  timeTicket && clearInterval(timeTicket);
  timeTicket = setInterval(function () {
    chart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
    });
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: (count) % dataLength
    });
    chart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: (count) % dataLength
    });
    count++;
  }, 1000);
  chart.on('mouseover', function (params) {
    console.log(params)
    clearInterval(timeTicket);
    chart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    });
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    });
    chart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    });
  });
  chart.on('mouseout', function (params) {
    timeTicket && clearInterval(timeTicket);
    timeTicket = setInterval(function () {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      });
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: (count) % dataLength
      });
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: (count) % dataLength
      });
      count++;
    }, 1000);
  });
})
function tooltipCharts() {
  chart = echarts.init(chartNode.value);
  // var option = {
  //   dataset: {
  //     source: [
  //       ['xAxis', '201701', '201702', '201703', '201704', '201705', '201706', '201707', '201708', '201709', '20170', '201710', '20170', '201801'],
  //       ['amount', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 65.1, 53.3, 41.1, 30.4, 53.3, 41.1, 53.3, 83.8]
  //     ]
  //   },
  //   xAxis: {
  //     type: 'category',
  //     interval: true,
  //     axisLabel: {
  //       rotate: 45
  //     },
  //     axisTick: {
  //       show: false
  //     }
  //   },
  //   yAxis: {},
  //   color: ['#4FA8F9', '#F5A623'],
  //   grid: {
  //     show: true,
  //     backgroundColor: '#FAFAFA',
  //     left: 30,
  //     right: 20,
  //     top: 20
  //   },
  //   series: [{
  //     type: 'bar',
  //     smooth: true,
  //     seriesLayoutBy: 'row',
  //     barWidth: 10
  //   }]
  // };
  chart.setOption(option);
}
</script>
<style lang="less" scoped>
</style>