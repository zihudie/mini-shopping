import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow, setStorage } from '@tarojs/taro'
import { AtSwipeAction } from 'taro-ui'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/swipe-action.scss'
import './index.scss'

interface listType {
  _id?: string
  addressDetails: string
  city: string
  province: string
  tel: string
  name: string
  isDefault: boolean
}
const AdressPage: React.FC = () => {
  const [curId, setCurId] = useState('')

  const [addressList, setAddressList] = useState<listType[]>([
    {
      addressDetails: '',
      city: '',
      province: '',
      tel: '',
      name: '',
      isDefault: false,
    },
  ])
  Taro.getStorage({
    key: 'openid',
    success: (res) => {
      console.log('openid...', res.data)
      setCurId(res.data)
    },
  })

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

  const itemClick = (val, item) => {
    console.log(val, item)
    if (val.text === '设为默认') {
      // TODO  地址设置为默认
    } else if (val.text === '删除') {
      // TODO  delete 地址
      // 成功之后进行刷新重新请求操作
    }
  }

  // todo  编辑地址
  const handleEdit = (item) => {
    Taro.setStorage({
      key: 'curAddressList',
      data: item,
    })
    Taro.navigateTo({ url: '/pages/address/details/index' })
  }

  const addNewAddress = () => {
    Taro.removeStorage({
      key: 'curAddressList',
    })
    Taro.navigateTo({ url: '/pages/address/details/index' })
  }

  useEffect(() => {
    if (!curId) {
      return
    }
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getAddress',
        data: { openId: curId },
      },
    }).then((result: any) => {
      console.log('getData.....', result)
      setAddressList(result)
    })
  }, [curId])

  const handlePhone = (tel: string) => {
    return tel.slice(0, 3) + '***' + tel.slice(-4)
  }

  return (
    <View className='address-model'>
      {addressList.map((item) => {
        return (
          <AtSwipeAction
            onClick={(val) => {
              itemClick(val, item)
            }}
            options={settingOptions}
            key={item._id}
          >
            <View className='adress-item'>
              <View className='m-left'>
                <View className='name-tel'>
                  {item.name} <Text className='tel'>{handlePhone(item.tel)}</Text>
                </View>
                <View className='details'>
                  {item.province} {item.city} {item.addressDetails}
                </View>
              </View>
              <Text
                className='m-edit'
                onClick={() => {
                  handleEdit(item)
                }}
              >
                编辑
              </Text>
            </View>
          </AtSwipeAction>
        )
      })}
      <View className='add-address'>
        <Text className='add-btn' onClick={addNewAddress}>
          新增收货地址
        </Text>
      </View>
    </View>
  )
}

export default AdressPage
