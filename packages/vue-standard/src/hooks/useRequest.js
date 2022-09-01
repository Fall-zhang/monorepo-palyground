import { watch } from 'vue'
export function useUrlChange(url) {
  const res = ref(null)
  watch(url, async() => {
    try {
      res.value = await new Promise((resolve, reject) => {
        const random = Math.random()
        if (random > 0.5) {
          setTimeout(() => {
            console.log('请求完成-成功')
            resolve('成功请求')
          }, 2000)
        } else {
          setTimeout(() => {
            console.log('请求完成-失败')
            reject('成功失败')
          }, 2000)
        }
      })
    } catch (err) {
      console.log('尝试处理错误')
      console.error(err)
    }
  })
  return res
}
