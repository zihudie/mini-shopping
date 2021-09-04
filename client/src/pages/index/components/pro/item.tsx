import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import 'taro-ui/dist/style/components/button.scss'
import './index.scss'

interface ItemTypes {
  productName: string
  id: string
  productCover: string
  salesPrice: string
}
const ProductItem: React.FC<ItemTypes> = (props) => {
  const { id, productName, productCover, salesPrice } = props
  const addToCart = () => {
    // todo  将当前商品加入购物车列表中
    console.log(id)
  }
  return (
    <View className='pro-list'>
      <View className='pro-list-inner'>
        <Image src={productCover} />
        <View className='pro-name'>{productName}</View>
        <View className='pro-bottom'>
          <Text>￥{salesPrice}</Text>
          <AtButton type='secondary' size='small' onClick={addToCart} circle>
            加入购物车
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default ProductItem
