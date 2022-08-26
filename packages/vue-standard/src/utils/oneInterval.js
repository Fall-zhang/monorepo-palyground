// 返回值是函数，使用后，interval 暂停
export default function oneInterval(func, time) {
  // console.log('ffff')
  let state = true
  let inprocess = true
  // console.log(func)
  setTime()
  function setTime() {
    setTimeout(() => {
      if (state) {
        func()
        setTime()
        inprocess = false
      }
    }, time)
  }
  return function() {
    state = false
  }
}
