// 返回值是函数，调用后，interval 暂停
export default function useInterval(func, time) {
  let inprocess = true
  setTime()
  function setTime() {
    return setTimeout(() => {
      if (inprocess) {
        func()
        setTime()
        inprocess = false
      }
    }, time)
  }
  return function() {
    inprocess = false
  }
}
