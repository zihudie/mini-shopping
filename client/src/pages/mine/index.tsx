import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import icoConfirm from './assets/order_done.png'
import icoCancel from './assets/order_cancel.png'
import './index.scss'

const MinePage: React.FC = () => {
  return (
    <View className='account'>
      <View className='top-model'>
        <Text className='avatar'>头像</Text>
        <Text className='user-login'>去登录</Text>
      </View>
      {/* 我的订单 */}
      <View className='order-model'>
        <View className='order-title'>
          <Text>我的订单</Text>
          <Text className='all-order'>全部订单 &gt;</Text>
        </View>

        <View className='order-status'>
          <View className='item'>
            <Image src={icoConfirm} />
            已完成
          </View>
          <View className='item'>
            <Image src={icoCancel} />
            已取消
          </View>
        </View>
      </View>
      {/* 收货地址 */}
      <View className='address-mode'>
        <Text>收货地址</Text>
        <Text> &gt; </Text>
      </View>
    </View>
  )
}

export default MinePage
