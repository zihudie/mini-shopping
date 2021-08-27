import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import 'taro-ui/dist/style/components/tabs.scss'
import './index.scss'

const HomePage: React.FC = () => {
  const tabList = [
    { title: '男表' },
    { title: '女表' },
    { title: '情侣表' },
    { title: '运动手表' },
  ]

  const lists = [
    {
      productName: '天王手表',
      id: '123323223',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
    {
      productName: '天王手表',
      id: '1233232798',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
    {
      productName: '天王手表',
      id: '1233232223',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
    {
      productName: '天王手表',
      id: '12332332798',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      salesPrice: '1200',
    },
  ]

  const [current, setCurrent] = useState(0)
  const handleClick = (val) => {
    setCurrent(val)
  }
  return (
    <View className='app'>
      <AtTabs
        current={current}
        scroll
        animated={false}
        height='500px'
        tabDirection='vertical'
        tabList={tabList}
        onClick={handleClick}
      >
        <AtTabsPane tabDirection='vertical' current={current} index={0}>
          <View className='category'>内容1</View>
        </AtTabsPane>
        <AtTabsPane tabDirection='vertical' current={current} index={1}>
          <View className='category'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane tabDirection='vertical' current={current} index={2}>
          <View className='category'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default HomePage
