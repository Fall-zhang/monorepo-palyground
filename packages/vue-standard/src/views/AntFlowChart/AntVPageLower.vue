<template>
  <!-- 用户可进行的操作：单机，双击，鼠标滚轮 -->
  <!-- 图形类型：边，节点，节点上的port -->
  <!-- 删除功能：点击图像后，左上角展示一个按钮，添加 -->
  <!-- 双击：弹出确认框，提供选择（不再弹出） -->
  <!-- 点击图像后，展示图像的功能然后删除点击图像后，左上角展示一个按钮，添加 -->
  <!-- 添加图例功能，帮助用户使用 -->
  <!-- 配置滚轮缩放还是，ctrl 缩放 -->
  <!-- 配置直接可以拖动，还是长按空格可拖动 -->
  <div>
    <div>
      <button type="primary" @click="onAddNode">添加单个图形</button>
      <button @click="onHidePort">隐藏连接功能<input type="checkbox" /></button>
      <button @click="onAddButton">添加图形和连线</button>
    </div>
    <div class="graph-container">
      <div ref="antVAdder" class="graph-adder"></div>
      <div ref="antVContainer" class="graph-editor"></div>
      <div ref="antVAdder2" class="graph-adder"></div>
    </div>
  </div>
</template>
<script>
import { Graph, DataUri, Addon } from '@antv/x6'
import { getBasicRect } from './basicGraph.js'
// import moment from 'dayjs'
import graphData from './graphData'
export default {
  name: 'AntVGraph',
  props: {},
  data() {
    return {
      graph: null,
      showPort: true
    }
  },
  mounted() {
    this.initGraphZone()
    this.initGraphAdder()
  },
  methods: {
    initGraphZone() {
      this.graph = new Graph({
        container: this.$refs['antVContainer'],
        panning: true,
        mousewheel: {
          enabled: true,
          modifiers: []
        },
        connecting: {
          snap: true
        }
      })
      this.graph.on('edge:mouseup', ({ edge }) => {
        const degeInfo = edge.store.data
        if (degeInfo.source.cell === degeInfo.target.cell) {
          this.graph.removeNode(edge)
        }
      })
      this.graph.on('edge:dblclick', ({ edge }) => {
        this.graph.removeNode(edge)
      })
      this.graph.fromJSON(graphData)
    },
    initGraphAdder() {
      const { graph } = this
      const group = {
        name: '基础组件' // 分组名称
      }
      //  创建对象
      const stencil = new Addon.Stencil({
        search: false,
        collapsable: true,
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 800,
        groups: [
          {
            name: 'group1',
            title: '基本组件',
            graphWidth: 200,
            graphHeight: 300
          }
        ]
      })
      const r1 = getBasicRect()
      this.$refs['antVAdder'].appendChild(stencil.container)
    },
    onAddNode(type, text) {
      let cell = 'null'
      if (type == 'rect') {
      } else if (type == 'rect') {
      }
      const rect = getBasicRect()
      rect.meta = {
        messgae: 'dffdfd',
        info: '杜甫ufufufufuf'
      }
      console.log(rect)
      this.graph.addNode(rect)
      console.log(this.graph.toJSON())
    },
    onAddButton() {
      this.graph.toJSON()
      const pageCells = this.graph.toJSON().cells
      pageCells.push({
        id: 'node3',
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
        shape: 'rect'
      })
      pageCells.push({
        id: 'line',
        shape: 'edge',
        source: { cell: 'node2' },
        target: { cell: 'node3' },
        zIndex: 1
      })
      console.log(pageCells)
      this.graph.fromJSON(pageCells)
      console.log(this.graph)
    },
    onDownload() {
      this.graph.toPNG(
        (dataUri) => {
          // 下载
          DataUri.downloadDataUri(dataUri, 'chart.png')
        },
        {
          padding: {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50
          }
        }
      )
    },
    onHidePort() {
      if (this.showPort) {
        this.showPort = false
      }
      console.log(this.graph.toJSON())
      const pageCells = this.graph.toJSON().cells
      pageCells.forEach((item) => {
        console.log(item)
        if (item.ports) {
          item.ports.items.forEach((item2) => {
            item2.zIndex = -1
          })
        }
      })
      this.graph.fromJSON(pageCells)
    }
  }
}
</script>

<style scoped lang="less">
.graph-container {
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 800px;
  width: 1200px;
  overflow: hidden;
  display: flex;
  // justify-content: flex-start;
  margin: 20px;

  .graph-adder {
    height: 800px;
    position: relative;
    width: 200px;
    background-color: pink;
  }

  .graph-editor {
    flex-grow: 1;
  }
}
</style>
