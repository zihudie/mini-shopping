import React, { useEffect, useState } from 'react'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import { AtToast } from 'taro-ui'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/toast.scss'
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
        <Image src='//m.360buyimg.com/mobilecms/s700x280_jfs/t1/199283/5/5755/101865/612ed8b4Ebbb989cd/1039d07d145b7b5b.jpg!cr_1053x420_4_0!q70.jpg.dpg' />
      </SwiperItem>
      <SwiperItem>
        <Image src='//m.360buyimg.com/mobilecms/s700x280_jfs/t1/204303/21/4495/270019/61318898Efd4f118f/8ce3de1268ea69cb.jpg!cr_1125x449_0_166!q70.jpg.dpg' />
      </SwiperItem>
      <SwiperItem>
        <Image src='//m.360buyimg.com/mobilecms/s700x280_jfs/t1/204303/21/4495/270019/61318898Efd4f118f/8ce3de1268ea69cb.jpg!cr_1125x449_0_166!q70.jpg.dpg' />
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
        <ProductItem key={item.id} item={item} />
      ))}
    </View>
  )
}
const HomePage: React.FC = () => {
  const [proList, setProList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getList',
      },
    }).then((res: any) => {
      if (res) {
        setLoading(false)
      }
      setProList(res)
    })
  }, [])

  return (
    <View className='app'>
      {/* 导航搜索*/}
      {/* swiper */}
      <SwpierContent />
      {/* productList */}
      {loading ? (
        <AtToast isOpened={loading} text='加载中' status='loading'></AtToast>
      ) : (
        <ProductContent lists={proList} />
      )}
    </View>
  )
}

export default HomePage
