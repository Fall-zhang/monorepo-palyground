import { onMounted, onUnmounted } from 'vue'
export function useDomEvent({ target, event, callback }) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
