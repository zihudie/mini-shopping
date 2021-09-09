import React, { Component, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import 'taro-ui/dist/style/components/tabs.scss'
import OrderItemPage from './components/order'
import './index.scss'
import icoConfirm from './assets/order_done.png'

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
    cover: icoConfirm,
    id: 'sku5998552255',
  }

  return (
    <View className='orders'>
      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View className='order-lists'>
            <OrderItemPage {...item} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className='order-lists'>
            <OrderItemPage {...item} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View className='order-lists'>
            <OrderItemPage {...item} />
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default OrderPage
