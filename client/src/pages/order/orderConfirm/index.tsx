import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import 'taro-ui/dist/style/components/tabs.scss'

import './index.scss'

const OrderPage: React.FC = () => {
  const [current, setCurrent] = useState(0)

  const tabList = [{ title: '全部' }, { title: '已完成' }, { title: '已取消' }]

  const handleClick = (val) => {
    setCurrent(val)
    // todo 发送请求 进行订单的筛选
  }

  const item = {
    productName:
      '黑人（DARLIE）双重薄荷牙膏225g 清新口气 防蛀固齿 口腔清洁（新旧包装随机发放） ',
    price: '12.55',
    num: 5,
    id: 'sku5998552255',
  }

  return (
    <View className='orders-confirm__module'>
      {/* 是否有地址 */}
      <View className='address-module'>
        <View className='name-tel'>吴小姐 1382658855</View>
        <View className='details'>
          上海浦东新区张江高科技园区浦东新区 申江路5005弄星创科技1号楼5层
        </View>
      </View>
      <View className='pro-lists'>
        <View className='list'>
          <Image />
          <View className='cons'>
            <View className='name'>
              明治 新加坡原装进口 儿童零食 小熊草莓夹心饼干蛋糕 休闲食品小零食独立包装50g
            </View>
            <View className='price-nums'>
              <Text className='price'>¥1236</Text>
              <Text className='nums'>×1</Text>
            </View>
            <View className='tips'>支持7天无理由退货</View>
          </View>
        </View>
      </View>
      {/* 总计 */}
      <View className='total-pay'>
        <View className='total'>
          总计： <Text className='price'>¥1110.78</Text>
        </View>
        <View className='pay-btn'>支付</View>
      </View>
    </View>
  )
}

export default OrderPage
