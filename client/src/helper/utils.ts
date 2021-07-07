export  const  debounce  = (fn,delay)=>{
  let timer ;
  delay = delay || 200
  return function(){
    const ctx = this
    const args = arguments
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
       fn.apply(ctx,args)
    },delay)
  }  
}