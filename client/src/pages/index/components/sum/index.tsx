import React, { useState } from 'react'
import { View, Button } from '@tarojs/components'
import { callCloudFunction } from '@/helper/fetch'
import './index.scss'

export const SumPage: React.FC = () => {
  const [sum, setSum] = useState<any>([])
  //  useEffect(()=>{
  //   Taro.cloud.callFunction({
  //     name:'sum'
  //   }).then(res=>{
  //     console.log(res)
  //     setSum(JSON.stringify(res.result || {}))
  //   })
  //  },[])

  //  const db = Taro.cloud.database() //申明一个变量，简化后面的写法
  //  db.collection('zhihu_daily')
  //   .get()
  //   .then(res => {
  //     console.log(res.data)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  //  Taro.setStorageSync("userinfo", event.detail.userInfo);

  const getData = async () => {
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'sum/getData',
      },
    }).then((res) => {
      setSum(res)
    })
  }
  return (
    <View className='line-first'>
      <Button size='mini' type='primary' onClick={getData}>
        云函数调用
      </Button>
      <View>
        {sum.map((item) => (
          <View className='area' key={item.city}>
            <View className='province'>{item.province}</View>
            <View className='city'>{item.city}</View>
            <View className='gdp'>{item.gdp}</View>
          </View>
        ))}
      </View>
    </View>
  )
}
