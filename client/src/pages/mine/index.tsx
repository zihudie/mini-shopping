import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { usePullDownRefresh, useDidShow } from '@tarojs/taro'
import icoConfirm from './assets/order_done.png'
import icoCancel from './assets/order_cancel.png'
import './index.scss'

const MinePage: React.FC = () => {
  const [userId, setUserId] = useState('')

  const [curUserInfo, setCurUserInfo] = useState({
    nickName: '',
    avatarUrl: '',
  })

  const checkLogin = () => {
    if (!userId) {
      Taro.navigateTo({
        url: '/pages/login/index',
      })
    }
  }

  const getData = () => {
    Taro.getStorage({
      key: 'openid',
      success: (res) => {
        res.data && setUserId(res.data)
      },
    })

    Taro.getStorage({
      key: 'userInfo',
      success: (res) => {
        res.data && setCurUserInfo(res.data)
      },
    })
  }

  useDidShow(() => {
    getData()
  })

  const clickJumpTo = (url: string) => {
    checkLogin()
    Taro.navigateTo({ url: url })
  }

  return (
    <View className='account'>
      <View className='top-model'>
        <View className='avatar'>
          <Image src={curUserInfo.avatarUrl} mode='widthFix' className='img' />
        </View>
        <View className='user-login' onClick={checkLogin}>
          {curUserInfo.nickName || '去登录'}
        </View>
      </View>
      {/* 我的订单 */}
      <View className='order-model'>
        <View className='order-title'>
          <Text>我的订单</Text>
          <Text
            className='all-order'
            onClick={() => {
              clickJumpTo('/pages/order/index')
            }}
          >
            全部订单
          </Text>
        </View>

        <View className='order-status'>
          <View
            className='item'
            onClick={() => {
              clickJumpTo('/pages/order/index?current=1')
            }}
          >
            <Image src={icoConfirm} />
            已完成
          </View>
          <View
            className='item'
            onClick={() => {
              clickJumpTo('/pages/order/index?current=2')
            }}
          >
            <Image src={icoCancel} />
            已取消
          </View>
        </View>
      </View>
      {/* 收货地址 */}
      <View
        className='address-mode'
        onClick={() => {
          clickJumpTo('/pages/address/index')
        }}
      >
        <Text>收货地址</Text>
        <Text className='right-arrow'> </Text>
      </View>
    </View>
  )
}

export default MinePage
