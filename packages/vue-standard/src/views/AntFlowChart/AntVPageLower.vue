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
    <div class="tool-bar">
      <!-- <button type="primary" @click="onAddNode">添加单个图形</button> -->
      <button @click="onTogglePort">
        连接功能<input v-model="setting.showPort" type="checkbox" />
      </button>
      <button @click="onToggleDrag">
        移动画布<input v-model="setting.dragGraph" type="checkbox" />
      </button>
      <button @click="onToggleGrid">
        显示网格<input v-model="setting.showGrid" type="checkbox" />
      </button>
    </div>
    <div class="graph-container" :class="setting.showPort ? '' : 'hidePort'">
      <div ref="antVAdder" class="graph-adder"></div>
      <div ref="antVContainer" class="graph-editor"></div>
      <div ref="antVAdder2" class="graph-adder">
        <button @click="onAddCellRelationship(selectCell.node)">
          添加节点
        </button>
        <div>选中节点：{{ selectCell.node }}</div>
        <div>
          <button>保存</button>
          <button>取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Graph, DataUri, Addon } from '@antv/x6'
import { getBasicRect } from './shape/basicGraph.js'
import { getSpecialCircle } from './shape/specialGraph.js'
// import moment from 'dayjs'
import graphData from './graphData'
export default {
  name: 'AntVGraph',
  props: {},
  data() {
    return {
      graph: null,
      setting: {
        showPort: true, // 显示连接
        dragGraph: true, // 移动画布
        showGrid: false
      },
      selectCell: {
        id: '',
        cell: null,
        node: null,
        mouseOverCell: null
      }
    }
  },
  mounted() {
    // 图形编辑区域
    this.initGraphZone()
    this.initGraphAdder()
    this.registerEvents()
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
        },
        selecting: {
          enabled: false,
          showNodeSelectionBox: true,
          multiple: false
        }
      })
      this.graph.fromJSON(graphData)
    },
    initGraphAdder() {
      const { graph } = this
      //  创建对象
      const stencil = new Addon.Stencil({
        search: false,
        // collapsable: true,
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 800,
        groups: [
          {
            name: 'basicShape',
            title: '基本组件',
            graphWidth: 200,
            graphHeight: 300
          },
          {
            name: 'specialShape',
            title: '特定组件',
            graphWidth: 200,
            graphHeight: 300
          }
        ]
      })
      const r1 = getBasicRect()
      // stencil
      this.$refs['antVAdder'].appendChild(stencil.container)
    },
    registerEvents() {
      const { graph } = this
      graph.on('cell:selected', (args) => {
        this.selectedNodeId = args.cell.id
      })
      graph.on('cell:click', ({ cell }) => {
        graph.select(cell)
        this.selectCell.cell = cell
      })
      graph.on('node:mouseenter', ({ node }) => {
        this.selectCell.mouseOverCell = node
        this.showPort(node, true)
      })
      graph.on('node:mouseleave', ({ node }) => {
        this.selectCell.mouseOverCell = null
      })
      graph.on('node:click', ({ node }) => {
        // const pos = node.position()
        // graph.select(node)
        this.selectCell.node = node
        // console.log(node.hasPorts())
        // this.nodeStatus.x = pos.x
        // this.nodeStatus.y = pos.y
      })
      // graph.on('node:resized', ({ node }) => {
      //   const size = node.size()
      //   this.nodeStatus.width = size.width
      //   this.nodeStatus.height = size.height
      // })
      // graph.on('node:rotated', ({ node }) => {
      //   this.$refs.control.nodeRotated(node.getAngle())
      // })
      graph.on('edge:mouseenter', ({ edge }) => {
        edge.addTools([
          // { name: 'segments' },
          // { name: 'source-arrowhead' },
          // { name: 'target-arrowhead' }
        ])
        if (this.isLineEdit) {
          edge.addTools([{ name: 'vertices' }])
        }
      })
      graph.on('edge:mouseleave', ({ edge }) => {
        edge.removeTools()
      })
      this.graph.on('edge:mouseup', ({ edge }) => {
        const degeInfo = edge.store.data
        if (degeInfo.source.cell === degeInfo.target.cell) {
          this.graph.removeNode(edge)
        }
      })
      graph.on('edge:dblclick', ({ edge }) => {
        graph.removeNode(edge)
      })
      graph.on('blank:click', () => {
        // this.controlType = 'graph'
      })
      graph.on('selection:changed', (args) => {
        args.added.forEach((cell) => {
          this.selectCell.cell = cell
          if (cell.isEdge() && this.isLineEdit) {
            return
          }
          if (
            cell.getData() === undefined ||
            cell.getData().name === undefined
          ) {
            cell.setData({
              name: ''
            })
          }
          if (cell.isNode()) {
            const pos = cell.position()
            const size = cell.size()
            this.nodeStatus = {
              x: Number(pos.x),
              y: Number(pos.y),
              width: Number(size.width),
              height: Number(size.height)
            }
          } else {
            this.verticesTable = cell.getVertices()
          }
        })
      })
    },
    // onAddNode(type, text) {
    //   if (type == 'rect') {
    //   } else if (type == 'rect') {
    //   }
    //   const rect = getBasicRect()
    //   rect.meta = {
    //     messgae: 'dffdfd',
    //     info: '杜甫ufufufufuf'
    //   }
    //   console.log(rect)
    //   this.graph.addNode(rect)
    //   console.log(this.graph.toJSON())
    // },
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
    onTogglePort() {
      if (this.setting.showPort) {
        this.setting.showPort = false
      } else {
        this.setting.showPort = true
      }
    },
    onToggleDrag() {
      const { graph } = this
      if (this.setting.dragGraph) {
        this.setting.dragGraph = false
        graph.disablePanning()
        graph.enableSelection()
        graph.enableRubberband()
      } else {
        this.setting.dragGraph = true
        graph.enablePanning()
        graph.disableRubberband()
        graph.disableSelection()
      }
    },
    onToggleGrid() {
      const { graph } = this
      console.log(this.setting.showGrid)
      if (this.setting.showGrid) {
        this.setting.showGrid = false
        graph.hideGrid()
      } else {
        this.setting.showGrid = true
        graph.showGrid()
      }
    },
    onAddCellRelationship(node) {
      const { x, y } = node.position()
      const shape1 = getSpecialCircle('名字', {
        x: x + 100,
        y: y + 100
      })
      const node2 = this.graph.addNode(shape1)
      this.connectRect(node, node2)
    },
    // 链接两个 rect
    connectRect(rect1, rect2) {
      // 判断两个 rect1 有没有未停靠 port
      console.log(rect1)
      console.log(rect2)
      this.graph.addEdge({
        shape: 'edge', // 指定使用何种图形，默认值为 'edge'
        source: { cell: rect1.id, port: rect1.port.ports[0].id },
        target: { cell: rect2.id, port: rect2.port.ports[0].id }
      })
      // 对两个 rect 进行连接默认上、右、下、左，如果都已经有内容，则，右上，右下，左下，左上
    },
    showPort() {
      // 显示当前 Port
    }
  }
}
</script>

<style scoped lang="less">
.tool-bar {
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    height: 28px;
    font-size: 16px;
    font-weight: 540;
    // width: ;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0 12px;
  }
}
.graph-container {
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 800px;
  width: calc(100%-40px);
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
.hidePort {
  :deep(.x6-port) {
    display: none;
  }
}
</style>
