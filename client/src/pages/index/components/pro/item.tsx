import React, { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'

import 'taro-ui/dist/style/components/toast.scss'
import 'taro-ui/dist/style/components/button.scss'
import './index.scss'

interface ItemTypes {
  productName: string
  id: string
  productCover: string
  salesPrice: string
}
interface propItems {
  [key: string]: any
}
const ProductItem: React.FC<propItems> = (props) => {
  const [isOpen, setOpen] = useState(false)
  const { id, productName, productCover, salesPrice, inventory } = props.item
  const addToCart = () => {
    // 将当前商品加入购物车列表中  判断库存是否足够 如果不足则进行库存不足的提示
    if (inventory < 1) {
      setOpen(true)
      return
    }
    // todo 判断用户登录状态
    // 加入购物车列表
  }

  const goToDetails = () => {
    // 数据存储 跳转至详情页面
    Taro.navigateTo({
      url: '/pages/details/index',
    })

    Taro.setStorage({
      key: 'proMsg',
      data: props.item,
    })
  }

  return (
    <>
      <View className='pro-list'>
        <View className='pro-list-inner'>
          <Image src={productCover} onClick={goToDetails} />
          <View className='pro-name'>{productName}</View>
          <View className='pro-bottom'>
            <Text>￥{salesPrice}</Text>
            <AtButton type='secondary' size='small' onClick={addToCart} circle>
              加入购物车
            </AtButton>
          </View>
        </View>
      </View>
      <AtToast isOpened={isOpen} text='当前商品库存不足'></AtToast>
    </>
  )
}

export default ProductItem
