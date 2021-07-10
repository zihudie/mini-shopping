import Taro from '@tarojs/taro'
export interface resultInterface<T = any> {
  status: number,
  data: T,
  message: string
}
export function callCloudFunction(param: Pick<Taro.cloud.CallFunctionParam, 'name' | 'data' | 'slow' | 'config'>): Promise<Taro.cloud.CallFunctionResult> {
  return new Promise((resolve, reject) => {
    Taro.cloud.callFunction({
      ...param
    }).then(callRes => {
      const { errMsg = '', result } = callRes
      if (result && (errMsg.includes('ok'))) {
        let apiResult = result as resultInterface

        if (apiResult.status === 0) {
          resolve(apiResult.data || {})
        } else {
          // 添加报错信息
          Taro.showToast({
            title: apiResult.message,
            duration: 1000
          })
          reject(result)
        }
      } else {
        reject(result)
      }
    }).catch(error => {
      reject(error)
    })
  })
}