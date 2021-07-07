/* eslint-disable @typescript-eslint/no-inferrable-types */
import React ,{useState, useEffect}from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
export const SumPage: React.FC = ( ) => {
   const  [sum,setSum] = useState<any>([])

   const  test = 'dde';
         const  test2 ="hello";
         sfsdfsdfsdf
         sdfsdf
   
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

  const getData = async ()=>{
    Taro.cloud.callFunction({
      name:'sum'
    }).then(res=>{
      setSum( (res.result as {data:any[]}).data)
    })
  }
  return (
      <View className='line-first'>
         <Button size='mini' type='primary'   onClick={getData} >重新获取</Button>
        {/* <View>{sum} </View>   */}
        <View >
          {
            sum.map(item=> (
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

// SumPage.defaultProps = new SumPageProps()
