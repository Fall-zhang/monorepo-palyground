function percentage(arr){
  if(!Array.isArray(arr)){
    return new Error('使用的不是数组')
  }
  const sum = arr.reduce((left,right)=>left+right)
  const result = []
  arr.forEach(item=>{
    result.push(Math.round(item/sum * 10000)/10000)
  })
  let lastNum = 1
  result.forEach((item,index)=>{
    if(index!==arr.length-1){
      console.log(item);
      lastNum = lastNum-item
    }
  })
  console.log(lastNum);
  result[result.length-1] = Math.round(lastNum * 10000)/10000
  return result
}
let result = percentage([1,2,6,44,5,6,12,2])