import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './order.scss'

interface ItemProps {
  productName: string
  price: string
  num: number
  cover: string
  id: string
}
const OrderItemPage: React.FC<ItemProps> = (props) => {
  const { productName, price, num, cover } = props

  return (
    <View className='order-list'>
      <View className='model-top'>
        <View className='cover'>
          <Image src={cover} />
        </View>
        <View className='cons'>
          <Text className='desc'> {productName} </Text>
        </View>
        <Text className='nums'> x{num} </Text>
      </View>
      <View className='model-total'>实付¥{price}</View>
      <View className='model-btns'>
        <Text className='buy-btn'>再次购买</Text>
      </View>
    </View>
  )
}

export default OrderItemPage
