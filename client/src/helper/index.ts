const  delay = (ms) =>{
  return new Promise(resolve=> setTimeout(resolve,ms))
}
 
export function callCloudFunction(param: Pick<Taro.cloud.CallFunctionParam, 'name' | 'data' | 'slow' | 'config'>) : Promise<Taro.cloud.CallFunctionResult> {
  let retryCount = 0
  if (!param.config) {
    // 获取对应环境的id
    param.config = {
      env: 'env-52pojie-2tc3i',
      traceUser: true
    }
  }
  async function callFunction() {
    return Taro.cloud.callFunction(param)
      .catch(async error => {
        console.log(error);
        retryCount++
        if (retryCount <= 10) {
          await delay(500)
          return callFunction()
        } else {
          Promise.reject(error)
        }
      })    
  }
  return callFunction()
}