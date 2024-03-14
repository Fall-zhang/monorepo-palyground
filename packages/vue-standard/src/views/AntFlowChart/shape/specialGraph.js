import { Shape } from '@antv/x6'
export function getSpecialCircle(label, config) {
  let configObj = {}
  if (config && typeof config == 'object') {
    configObj = config
  }
  return new Shape.Circle({
    x: 500, // Number，必选，节点位置的 x 值
    y: 500, // Number，必选，节点位置的 y 值
    label: label,
    zIndex: 2,
    ...node,
    ...configObj
  })
}
const portConifg = {
  attrs: {
    circle: {
      magnet: true,
      r: 6
    }
  },
  position: {
    name: 'top',
    args: {}
  }
}
const node = {
  width: 80, // Number，可选，节点大小的 width 值
  height: 80, // Number，可选，节点大小的 height 值
  label: '我我我我', // String，节点标签

  ports: {
    groups: {
      around: {
        attrs: portConifg.attrs,
        position: {
          name: 'ellipseSpread'
        }
      }
    },
    items: [
      { id: 'left-top-2', group: 'around' },
      { id: 'top-1', group: 'around' },
      { id: 'top-2', group: 'around' },
      { id: 'right-top-1', group: 'around' },
      { id: 'right-top-2', group: 'around' },
      { id: 'right-1', group: 'around' },
      { id: 'right-2', group: 'around' },
      { id: 'right-bottom-1', group: 'around' },
      { id: 'right-bottom-2', group: 'around' },
      { id: 'bottom-1', group: 'around' },
      { id: 'bottom-2', group: 'around' },
      { id: 'left-bottom-1', group: 'around' },
      { id: 'left-bottom-2', group: 'around' },
      { id: 'left-1', group: 'around' },
      { id: 'left-2', group: 'around' },
      { id: 'left-top-1', group: 'around' }
    ]
  }
}

// [
//   { id: 'left-top-2' },
//   { id: 'top-1' },
//   { id: 'top-2' },
//   { id: 'right-top-1' },
//   { id: 'right-top-2' },
//   { id: 'right-1' },
//   { id: 'right-2' },
//   { id: 'right-bottom-1' },
//   { id: 'right-bottom-2' },
//   { id: 'bottom-1' },
//   { id: 'bottom-2' },
//   { id: 'left-bottom-1' },
//   { id: 'left-bottom-2' },
//   { id: 'left-1' },
//   { id: 'left-2' },
//   { id: 'left-top-1' }
// ]
