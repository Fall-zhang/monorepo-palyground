<script setup >
// import CodeEditor from './components/CodeEditor.vue'
// import FileReader from './components/FileReader.vue'
import ChartNode from '@/views/echarts/ChartNode.vue'
// import ChartImage from './components/ChartImage.vue'
const fileContext = ref('')

const picked = ref('')
</script>

<template>

  <!-- <ChartNode/> -->
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
