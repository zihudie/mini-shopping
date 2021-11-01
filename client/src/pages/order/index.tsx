import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import 'taro-ui/dist/style/components/tabs.scss'
import { callCloudFunction } from '@/helper/fetch'
import OrderItemPage from './components/order'
import './index.scss'

const OrderPage: React.FC = () => {
  const [userId, setUserId] = useState('')
  const [current, setCurrent] = useState(0)
  const [orderLists, setOrderlists] = useState<any[]>([])
  const [compeleteOrders, setCompeleteOrderlists] = useState<any[]>([])
  const [uncompeleteOrders, setUncompeleteOrderlists] = useState<any[]>([])
  const tabList = [{ title: '全部' }, { title: '已完成' }, { title: '已取消' }]

  useEffect(() => {
    const _routerCurrent = getCurrentInstance().router
    if (_routerCurrent?.params.current) {
      console.log('_routerCurrent?.params.current', typeof _routerCurrent?.params.current)
      const _current = parseInt(_routerCurrent?.params.current)
      setCurrent(_current)
    } else {
      setCurrent(0)
    }

    Taro.getStorage({
      key: 'openid',
      success: (res) => {
        res.data && setUserId(res.data)
      },
    })
  }, [])

  useEffect(() => {
    if (!userId) {
      return
    }
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getOrder',
        data: { openId: userId },
      },
    }).then((result: any) => {
      const completeList = result.filter((item) => item.orderType === 1)
      const unCompleteList = result.filter((item) => item.orderType === 0)
      // 全部状态的订单
      setOrderlists(result)
      // 已完成状态的订单
      setCompeleteOrderlists(completeList)
      // 已取消状态的订单
      setUncompeleteOrderlists(unCompleteList)
    })
  }, [userId])

  const handleClick = (val) => {
    console.log('....typeof...', typeof val)
    setCurrent(val)
  }

  return (
    <View className='orders'>
      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View className='order-lists'>
            {orderLists.length ? (
              orderLists.map((list, index) => {
                return (
                  <View key={index}>
                    <OrderItemPage {...list} />
                  </View>
                )
              })
            ) : (
              <View className='no-data'>暂无数据</View>
            )}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className='order-lists'>
            {compeleteOrders.length ? (
              compeleteOrders.map((list, index) => {
                return (
                  <View key={index}>
                    <OrderItemPage {...list} />
                  </View>
                )
              })
            ) : (
              <View className='no-data'>暂无数据</View>
            )}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View className='order-lists'>
            {uncompeleteOrders.length ? (
              uncompeleteOrders.map((list, index) => {
                return (
                  <View key={index}>
                    <OrderItemPage {...list} />
                  </View>
                )
              })
            ) : (
              <View className='no-data'>暂无数据</View>
            )}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default OrderPage
