import React, { useEffect, useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { callCloudFunction } from '@/helper/fetch'

import './index.scss'

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState('')
  const [curUserInfo, setCurUserInfo] = useState({
    nickName: '',
    avatarUrl: '',
  })
  const getUserInfo = () => {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: function (infos) {
        const userInfo = infos.userInfo

        Taro.setStorage({
          key: 'userInfo',
          data: userInfo,
        })

        callCloudFunction({
          name: 'shopApis',
          data: {
            $url: 'login',
          },
        }).then((res) => {
          const { openid } = res as any
          // 根据Openid 创建用户体系
          Taro.setStorage({
            key: 'openid',
            data: openid,
          })

          Taro.navigateBack()
        })
      },
      fail: function (msgs) {
        console.log(msgs)
      },
    })
  }

  return (
    <View className='login-model'>
      <Button className='login-button' onClick={getUserInfo}>
        {' '}
        微信登录
      </Button>
    </View>
  )
}

export default LoginPage
