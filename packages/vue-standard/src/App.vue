<script setup>
// import CodeEditor from './components/CodeEditor.vue'
// import FileReader from './components/FileReader.vue'
// import ChartNode from '@/views/echarts/ChartNode.vue'
// import ChartImage from '@/views/echarts/ChartMap.vue'
// import CustomLayout from '@/views/CustomLayout/index.vue'
// import interval from './utils/oneInterval'
// import QuarterCircle from '@/components/Svg/quarter-circle.vue'
import { defineAsyncComponent } from 'vue'
// import AntVPageLower from ''
import { clientPosition } from './hooks/useMouse'
import { useUrlChange } from './hooks/useRequest'
const AntVPageLower = defineAsyncComponent(() => import('./views/AntVPageLower.vue'))
const { x, y } = clientPosition()
// const clearFun = interval(() => {
//   console.log(6669);
// }, 2000)
const dataUrl = ref('000')
const requestData = useUrlChange(dataUrl)
const pageDataX = ref([
  '德州',
  '德城区',
  '陵城区',
  '禹城市',
  '乐陵市',
  '临邑县',
  '平原县',
  '夏津县',
  '武城县',
  '庆云县',
  '宁津县',
  '齐河县'
])
const ant = ref(null)
const onAdd = () => {
  dataUrl.value += 'udududu'
  ant.value.addNode('rect', '北方')
}
</script>

<template>
  <div>
    <!-- <button @click="">展示/隐藏连接功能</button> -->
    <button @click='onAdd'>添加节点</button>
    坐标X {{ x }}坐标Y{{ y }} 请求数据{{ requestData }}
    <AntVPageLower ref='ant' />
  </div>
  <!-- <button @click="clearFun">点击暂停</button> -->
  <!-- <CustomLayout v-model:keep.prr="pageDataX"></CustomLayout> -->
  <!-- <QuarterCircle type='bottom' color='' width='44px' height='44px' /> -->
  <!-- <div style="height:600px;background-color:pink;overflow: scroll;" @scroll="onScroll">
    <div style="height:2000px;background-color:purple" @scroll="onScroll">
    </div>
  </div> -->
  <!-- <ChartImage v-bind="allInfo" /> -->
  <!-- <ChartSvg/> -->
  <!-- <ChartImage/> -->
  <!-- <FileReader v-model='fileContext' style='height: 60px;' />
  <CodeEditor v-model:code='fileContext' /> -->
  <!-- <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%; margin-top: 20px">
    <el-table-column prop="id" label="ID" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="amount1" label="数值 1（元）">
    </el-table-column>
    <el-table-column prop="amount2" label="数值 2（元）">
    </el-table-column>
    <el-table-column prop="amount3" label="数值 3（元）">
    </el-table-column>
  </el-table> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  margin: 0;
}
</style>
