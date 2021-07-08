import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import CustomTabBar from 'components/custom-tab-bar'
import {SumPage} from './components/sum/index'
import {GuidePage} from './components/guide/index'
 
export default class Index extends Component {
   tabBarIndex  = 0
  componentWillMount () { 
  }

  componentDidMount () { 

  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {/* <Login/> */}
        <GuidePage/>
        <SumPage/>
        <CustomTabBar selected={this.tabBarIndex} />
      </View>
    )
  }
}
