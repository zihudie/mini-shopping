import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { callCloudFunction } from 'helper/index'
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

  const getData = async () => {
    callCloudFunction(
      {
        name: 'shopApis',
        data: {
          $url: "sum/getData"
        }
      }).then(res => {
        setSum(res)
      })
  }
  return (
    <View className='line-first'>
      <Button size='mini' type='primary' onClick={getData} >重新获取</Button>
      <View>{sum.length} </View>  
      <View >
        {
          sum.map(item => (
            <View className='area' key={item.city}>
              <View className='province'>{item.province}</View>
              <View className='city'>{item.city}</View>
              <View className='gdp'>{item.gdp}</View>
            </View>
          ))
        }
      </View>
    </View>
  )
}