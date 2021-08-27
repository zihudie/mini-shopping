import React from 'react'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import { SumPage } from './components/sum/index'
import { GuidePage } from './components/guide/index'
import ProductItem from './components/pro/item'

import './index.scss'

interface ItemTypes {
  productName: string
  id: string
  productCover: string
  salesPrice: string
}
interface ContentTypes {
  lists: ItemTypes[]
}
// swiper
const SwpierContent: React.FC = () => {
  return (
    <Swiper
      className='swiper-con'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay
    >
      <SwiperItem>
        <View className='demo-text-1'>1</View>
      </SwiperItem>
      <SwiperItem>
        <View className='demo-text-2'>2</View>
      </SwiperItem>
      <SwiperItem>
        <View className='demo-text-3'>3</View>
      </SwiperItem>
    </Swiper>
  )
}
// 列表
const ProductContent: React.FC<ContentTypes> = (props) => {
  const { lists } = props
  return (
    <View className='home-lists'>
      {lists.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </View>
  )
}
const HomePage: React.FC = () => {
  const lists = [
    {
      productName: '天王手表',
      id: '123323223',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
    {
      productName: '天王手表',
      id: '1233232798',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
    {
      productName: '天王手表',
      id: '1233232223',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
    {
      productName: '天王手表',
      id: '12332332798',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
  ]
  return (
    <View className='app'>
      {/* 导航搜索*/}
      {/* swiper */}
      <SwpierContent />
      {/* productList */}
      <ProductContent lists={lists} />
    </View>
  )
}

export default HomePage
