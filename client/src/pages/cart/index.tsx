import React, { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import 'taro-ui/dist/style/components/input-number.scss'
import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

const CartPage: React.FC = () => {
  const [val, setVal] = useState(1)
  const handleChange = (values) => {
    setVal(values)
  }

  return (
    <View className='cart-model'>
      <View className='cart-list m-active'>
        <View className='m-top'>
          <View className='check'></View>
          <View className='pics'>{/* <Image src={} /> */}</View>
          <View className='cons'>
            <View className='name'>
              卡西欧(CASIO)男表G-SHOCK小方块金砖银砖六局电波太阳能动力多功能小金块小银块送男
            </View>
            <View className='price_line'>
              <Text className='price'>¥2865</Text>
              <View className='num_wrap'>
                <AtInputNumber
                  type='number'
                  min={1}
                  max={50}
                  step={1}
                  value={val}
                  onChange={handleChange}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='cart-bottom'>
        <View className='all-cal'>
          <Text>全选</Text>
          <Text className='total'>总计:¥5360.78</Text>
          <Text className='calculate'>结算</Text>
        </View>
      </View>
    </View>
  )
}

export default CartPage
