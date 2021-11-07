import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './order.scss'

interface ItemProps {
  productName: string
  price: string
  buyNum: number
  cover: string
  id: string
  totalPrice: string
  curSku: any
}
const OrderItemPage: React.FC<ItemProps> = (props) => {
  console.log(props)
  const { productName, totalPrice, buyNum, curSku } = props

  return (
    <View className='order-list'>
      <View className='model-top'>
        <View className='cover'>
          <Image src={curSku.url} />
        </View>
        <View className='cons'>
          <Text className='desc'> {productName} </Text>
          <Text className='sku'>{curSku.sku}</Text>
        </View>
        <Text className='nums'> x{buyNum} </Text>
      </View>
      <View className='model-total'>实付¥{totalPrice}</View>
    </View>
  )
}

export default OrderItemPage
