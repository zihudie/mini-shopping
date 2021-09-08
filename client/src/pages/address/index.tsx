import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtSwipeAction } from 'taro-ui'
import 'taro-ui/dist/style/components/swipe-action.scss'
import './index.scss'

const AdressPage: React.FC = () => {
  const settingOptions = [
    {
      text: '设为默认',
      style: {
        backgroundColor: '#e6e6e6',
        color: '#333',
      },
    },
    {
      text: '删除',
      style: {
        backgroundColor: '#f2270c',
        color: '#fff',
      },
    },
  ]

  const itemClick = (val) => {
    console.log(val)
    if (val.text === '设为默认') {
      // TODO  地址设置为默认
    } else if (val.text === '删除') {
      // TODO  delete 地址
      // 成功之后进行刷新重新请求操作
    }
  }

  // todo  编辑地址
  const handleEdit = () => {
    console.log('edit')
  }

  return (
    <View className='address-model'>
      <AtSwipeAction onClick={itemClick} options={settingOptions}>
        <View className='adress-item'>
          <View className='m-left'>
            <View className='name-tel'>
              吴小姐 <Text className='tel'>138***5005</Text>
            </View>
            <View className='details'>
              上海浦东新区张江高科技园区浦东新区 申江路5005弄星创科技1号楼5层
            </View>
          </View>
          <Text className='m-edit' onClick={handleEdit}>
            编辑
          </Text>
        </View>
      </AtSwipeAction>
      <View className='add-address'>
        <Text className='add-btn'>新增收货地址</Text>
      </View>
    </View>
  )
}

export default AdressPage
