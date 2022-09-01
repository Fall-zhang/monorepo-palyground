import { ref, onMounted, onUnmounted } from 'vue'
import { useDomEvent } from './useDom'

export function clientPosition() {
  const x = ref(0)
  const y = ref(0)
  function mouseMoveEvent(ev) {
    x.value = ev.clientX
    y.value = ev.clientY
  }
  useDomEvent({
    target: window,
    event: 'mousemove',
    callback: mouseMoveEvent
  })
  return {
    x,
    y
  }
}
export function pagePosition() {
  const x = ref(0)
  const y = ref(0)
  function mouseMoveEvent(ev) {
    x.value = ev.pageX
    y.value = ev.pageY
  }
  useDomEvent({
    target: window,
    event: 'mousemove',
    callback: mouseMoveEvent
  })
  return {
    x,
    y
  }
}
