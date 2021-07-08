import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CustomTabBar from 'components/custom-tab-bar'
import './index.scss'
 
  export default class MinePage extends Component<{},{tabBarIndex:number}>{
    constructor(props) {
      super(props)
      this.state = {
        tabBarIndex: 2
      }
    }
    componentDidShow():void {
      // this.showH5Modal()
      this.setState({
        tabBarIndex: 2
      })
    }
    render(){
      return (
        <View className='guide'>
        我的页面
        <CustomTabBar selected={this.state.tabBarIndex} />
    </View>
      )
    }
}