import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class MinePage extends Component<{}, { tabBarIndex: number }> {
  render() {
    return <View className='guide'>我的页面</View>
  }
}
