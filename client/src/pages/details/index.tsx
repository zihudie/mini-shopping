import React, { useState } from 'react'
import { Swiper, SwiperItem, View, Text, Image } from '@tarojs/components'
import { AtButton, AtFloatLayout, AtInputNumber, AtToast } from 'taro-ui'
import 'taro-ui/dist/style/components/modal.scss'
import pricePic from 'assets/details/priceMsg.png'
import 'taro-ui/dist/style/components/float-layout.scss'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/input-number.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/toast.scss'
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
  const items = [
    'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/114103/34/19648/90181/60e821c5Ec9a605c5/9e0c6e7b7d66da60.jpg!q70.dpg.webp',
    'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/187155/15/12415/119214/60e821c7E343bc29c/f096c0b4675c636b.jpg!q70.dpg.webp',
    'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/40463/28/15617/182990/60e821c6E06d707f2/b77930d35c66afc7.jpg!q70.dpg.webp',
    'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/193105/35/12388/105830/60e82422Edfc1b8ee/7b515e4954e48b08.jpg!q70.dpg.webp',
    'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/40463/28/15617/182990/60e821c6E06d707f2/b77930d35c66afc7.jpg!q70.dpg.webp',
  ]
  return (
    <Swiper
      className='swiper-con'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay
    >
      {items.map((item, index) => {
        return (
          <SwiperItem key={index}>
            <View className='demo-text-1'>
              <Image src={item} />
            </View>
          </SwiperItem>
        )
      })}
      {/* <SwiperItem>
        <View className='demo-text-1'>1</View>
      </SwiperItem>
      <SwiperItem>
        <View className='demo-text-2'>2</View>
      </SwiperItem>
      <SwiperItem>
        <View className='demo-text-3'>3</View>
      </SwiperItem> */}
    </Swiper>
  )
}
const DetailPage: React.FC = () => {
  const [isOpened, setopen] = useState(false)
  const [value, setVale] = useState(1)
  const [toastOpen, setToastOpen] = useState(false)
  const [confirmType, setConfirmType] = useState('cart')

  const details = [
    'https://img10.360buyimg.com/imgzone/jfs/t1/200672/11/2657/297896/611f4ae8E9f271e66/d77faa51598da97b.jpg!q70.dpg.webp',
    'http://img10.360buyimg.com/imgzone/jfs/t1/177954/6/20046/300647/611f4ae8E19a28b88/c8370723167d65cc.jpg!q70.dpg.webp',
    'https://img10.360buyimg.com/imgzone/jfs/t1/180437/15/20021/304060/611f4ae8E0e11d208/19e2426d43012463.jpg!q70.dpg.webp',
    'https://img13.360buyimg.com/imgzone/jfs/t1/184303/23/20146/292455/611f4ae9E887a2898/d4c08718167c69d4.jpg!q70.dpg.webp',
    'https://img14.360buyimg.com/imgzone/jfs/t1/179331/34/20333/306884/611f4aeaEbe3503b1/ad71b960b0c5a238.jpg!q70.dpg.webp',
    'https://img14.360buyimg.com/imgzone/jfs/t1/205986/30/2167/288329/611f4ae9E03bce720/677256cdf9fddc68.jpg!q70.dpg.webp',
  ]
  const curtainClose = () => {
    console.log(1)
  }
  console.log('change....')
  const handleChange = (val) => {
    setVale(val)
  }

  const handleConfirm = () => {
    console.log('hahh', confirmType)
    if (confirmType === 'cart') {
      // todo   添加到购物车
      setToastOpen(true)
      setopen(false)
      setTimeout(() => {
        setToastOpen(false)
      }, 1000)
    } else {
      console.log('hahh', confirmType)
    }
  }

  const handleClick = (type: string) => {
    setConfirmType(type)
    console.log(type, confirmType === 'buy')
    setopen(true)
  }

  return (
    <View className='app'>
      {/* swiper */}
      <SwpierContent />
      <View className='pro-prices'>
        <View className='sales-price'>
          <Text>¥</Text>
          <Text>3189.00</Text>
        </View>
        <View className='original-price'>
          <Text>¥</Text>
          <Text>3189.00</Text>
        </View>
      </View>
      <View className='pro-details'>
        {/* 关于商品 */}
        <View className='pro-msg'>
          <View className='name'>
            艾戈勒(agelocer)手表 布达佩斯系列多功能商务全自动机械表
            防水大日历中国潮流男士腕表 经典银钢白 动能指示 大背透 4101A1
          </View>
          <View className='collection'>收藏+</View>
        </View>
        {/* */}
        <View className='pro-subtitle'>商品副标题的描述</View>
      </View>
      {/*详情描述*/}
      {details.map((item, index) => {
        return <Image src={item} key={index} className='details-img' />
      })}
      {/* 描述 */}
      <View>
        <Image src={pricePic} className='price-img' />
      </View>
      {/* 底部展示 */}
      <View className='pro-bottom'>
        <AtButton
          className='cart'
          onClick={() => {
            handleClick('cart')
          }}
          type='primary'
          circle
        >
          加入购物车
        </AtButton>
        <AtButton
          className='buy'
          onClick={() => {
            handleClick('buy')
          }}
          type='primary'
          circle
        >
          立即购买
        </AtButton>
      </View>
      {/* 确认弹框 */}
      <AtFloatLayout isOpened={isOpened} onClose={curtainClose}>
        <View className='pro-to-order'>
          <View className='inner'>
            <View className='top'>
              <Image src={details[0]} />
              <View className='prices'>
                <Text className='cur'>¥1280.00</Text>
                {/* 需要做判断 选择之后才展示 */}
                <View>
                  已选<Text>经典小绿表</Text>
                  <Text className='num'>1</Text>个
                </View>
              </View>
            </View>
            {/* 商品规格 */}
            <View className='sku_choose'>
              <Text className='item active'>LR2136-经典小绿表 </Text>
              <Text className='item'>LR4122-钢带小绿表 </Text>
              <Text className='item'>LR2136-经典小绿表 </Text>
              <Text className='item'>LR2134-玫瑰金色小方表 </Text>
              <Text className='item'>LR4301-竹节纹钢带 </Text>
            </View>
            {/* 数量选择 */}
            <View className='sku_nums'>
              <Text>数量：</Text>
              <AtInputNumber
                type='number'
                min={1}
                max={10}
                step={1}
                value={value}
                onChange={handleChange}
              />
            </View>
          </View>
        </View>
        <View className='confirm'>
          <AtButton type='primary' onClick={handleConfirm}>
            确认
          </AtButton>
        </View>
      </AtFloatLayout>
      <AtToast isOpened={toastOpen} text='成功加入购物车' duration={1000}></AtToast>
    </View>
  )
}
export default DetailPage
