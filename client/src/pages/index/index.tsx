import { Component } from 'react'
import { View } from '@tarojs/components'
import CustomTabBar from 'components/custom-tab-bar'
import { SumPage } from './components/sum/index'
import { GuidePage } from './components/guide/index'
import './index.scss'

export default class Index extends Component {
  tabBarIndex = 0
  render() {
    return (
      <View className='index'>
        {/* <Login/> */}
        <GuidePage />
        <SumPage />
        <CustomTabBar selected={this.tabBarIndex} />
      </View>
    )
  }
}
