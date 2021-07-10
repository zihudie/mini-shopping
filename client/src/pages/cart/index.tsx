import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CustomTabBar from 'components/custom-tab-bar'
import './index.scss'
export default class CartPage extends Component{
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     tabBarIndex: -1
    //   }
    // }
    // componentDidShow():void {
    //   this.setState({
    //     tabBarIndex: 1
    //   })
    // }
    tabBarIndex  = 1
    render (){
      return (
        <View className='guide'>
        购物车页面
        <CustomTabBar selected={this.tabBarIndex} />
        </View>
      )
    }
}
 