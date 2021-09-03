import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class MinePage extends Component<{}, { tabBarIndex: number }> {
  render() {
    return (
      <View className='account'>
        <View className='top-model'>
          <Text className='avatar'>头像</Text>
          <Text>去登录</Text>
        </View>
        {/* 我的订单 */}
        <View className='order-model'>
          <View className='order-title'>
            <Text>我的订单</Text>
            <Text>全部订单</Text>
          </View>
          <View className='order-status'>
            <Text>已完成</Text>
            <Text>已取消</Text>
          </View>
        </View>
        {/* 收货地址 */}
        <View className=''>
          <Text>收货地址</Text>
          <Text> &gt; </Text>
        </View>
      </View>
    )
  }
}
