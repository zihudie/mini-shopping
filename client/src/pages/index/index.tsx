import React, { useEffect, useState } from 'react'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import { AtToast } from 'taro-ui'
import Taro, { usePullDownRefresh} from '@tarojs/taro'
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

interface SwiperTypes {
  lists: ItemTypes[]
}

// swiper
const SwpierContent: React.FC<SwiperTypes>= (prop) => {
  const lists = prop.lists
  return (
    <Swiper
      className='swiper-con'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay
    >
      {
        lists.map(item=>{
          return (
            <SwiperItem>
               <Image src={item.productCover}/>
            </SwiperItem>
          )
        })
      }
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
  const [recList, setRecList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const fetchData = () => {
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getList',
      },
    }).then((res: any) => {
      if (res) {
        setLoading(false)
      }
      const _lists = res.filter(item=>item.isRecommond)
      setRecList(_lists)
      // 推荐商品需要过滤出来
      setProList(res)
    })
  }
  // 下拉刷新获取最新数据
  usePullDownRefresh(()=>{
    fetchData()
    Taro.stopPullDownRefresh()
  })
  // 进入页面进行数据的请求
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View className='app'>
      {/* swiper */}
      <SwpierContent  lists={recList}/>
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
