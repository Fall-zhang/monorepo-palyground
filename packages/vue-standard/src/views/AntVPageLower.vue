<template>
  <!-- 用户可进行的操作：单机，双击，鼠标滚轮 -->
  <!-- 图形类型：边，节点，节点上的port -->
  <!-- 删除功能：点击图像后，左上角展示一个按钮，添加 -->
  <div>
    <button @click="onHidePort">展示/隐藏连接功能</button>
    <div ref="antVContainer" class="graph-container">
    </div>
  </div>
</template>
<script>
import { Graph, DataUri, Shape } from '@antv/x6';
import { getBasicRect } from "./element.js"
// import moment from 'dayjs'
import graphData from './graphData.js'
export default {
  name: '',
  props: {

  },
  data() {
    return {
      graph: null,
      showPort: true
    }
  },
  mounted() {
    this.graph = new Graph({
      container: this.$refs['antVContainer'],
      width: 800,
      panning: true,
      mousewheel: {
        enabled: true,
        modifiers: [],
      },
      connecting: {
        snap: true,
      },
      height: 600,
    })
    this.graph.fromJSON(graphData)
    this.graph.on('edge:mouseup', ({ edge }) => {
      const degeInfo = edge.store.data
      if (degeInfo.source.cell === degeInfo.target.cell) {
        this.graph.removeNode(edge)
      }
    })
    this.graph.on('edge:dblclick', ({ edge }) => {
      this.graph.removeNode(edge)
    })
  },
  methods: {
    addNode(type, text) {
      let cell = null
      if (type == 'rect') {

      } else if (type == 'rect') {

      }
      const rect = getBasicRect()
      this.graph.addNode(rect)
    },
    onDownload() {
      this.graph.toPNG((dataUri) => {
        // 下载
        DataUri.downloadDataUri(dataUri, 'chart.png')
      }, {
        padding: {
          top: 20,
          right: 30,
          bottom: 40,
          left: 50,
        },
      })
    },
    onHidePort() {
      if (this.showPort) {
        this.showPort = false
      }
      console.log(this.graph.toJSON())
      const pageCells = this.graph.toJSON().cells
      pageCells.forEach(item => {
        console.log(item);
        if (item.ports) {
          item.ports.items.forEach(item2 => {
            item2.zIndex = -1
          })
        }
      })
      console.log(pageCells);
      this.graph.fromJSON(pageCells)
    }
  }
}
</script>

<style scoped lang="less">
.graph-container {
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 20px;
}
</style>
