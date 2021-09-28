import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { callCloudFunction } from '@/helper/fetch'
import { AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/components/modal.scss'
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

const OrderPage: React.FC = () => {
  // 获取用户地址信息
  const [curId, setCurId] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [proDetails, setPorDetails] = useState<any[]>([])
  const [addressList, setAddressList] = useState<listType>({
    addressDetails: '',
    city: '',
    province: '',
    tel: '',
    name: '',
    isDefault: false,
  })

  Taro.getStorage({
    key: 'openid',
    success: (res) => {
      console.log('openid...', res.data)
      setCurId(res.data)
    },
  })

  Taro.getStorage({
    key: 'orderPros',
    success: (res) => {
      res.data && setPorDetails(res.data)
      let total = 0
      res.data.map((item) => {
        total += item.buyNum * item.curSku.price
      })
      setTotalAmount(total)
    },
  })

  useEffect(() => {
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getAddress',
        data: { openId: curId },
      },
    }).then((result: any) => {
      // 获取默认的地址
      console.log('getData.....', result)
      setAddressList(result[0])
    })
  }, [curId])

  const orderPay = () => {
    // 提示，是否确认支付， 点击确定则为订单完成， 点击取消则订单为取消状态
    console.log('click')
    setConfirmOpen(true)
  }

  const btnHandle = (type: boolean) => {
    //
    const orderType = type ? 1 : 0

    const _orderData: any = []

    proDetails.map((item) => {
      const { productName, cursku, buyNum, _id } = item
      _orderData.push({
        productName,
        ...cursku,
        buyNum,
        productId: _id,
        addressList: addressList,
        totalPrice: cursku.num * cursku.price,
        orderType: orderType,
      })
    })
    // 清楚orderPro 的storage
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/createOrder',
        data: { openId: curId, ..._orderData },
      },
    }).then(() => {
      Taro.removeStorage({
        key: 'orderPros',
      })

      Taro.navigateTo({
        url: '/pages/mine/index',
      })
    })
  }

  return (
    <View className='orders-confirm__module'>
      {/* 是否有地址 */}
      {addressList.name ? (
        <View className='address-module'>
          <View className='name-tel'>
            {addressList.name} {addressList.tel}
          </View>
          <View className='details'>
            {addressList.province}
            {addressList.city}
            {addressList.addressDetails}
          </View>
        </View>
      ) : (
        <View className='address-module'>请添加地址</View>
      )}
      {/* 订单信息 */}
      <View className='pro-lists'>
        {proDetails.map((list, index) => {
          return (
            <View className='list' key={index}>
              <Image src={list.curSku.url} />
              <View className='cons'>
                <View className='name'>{list.productName}</View>
                <View className='price-nums'>
                  <Text className='price'>¥ {list.curSku.price}</Text>
                  <Text className='nums'>×{list.buyNum}</Text>
                </View>
                <View className='tips'>支持7天无理由退货</View>
              </View>
            </View>
          )
        })}
      </View>
      {/* 总计 */}
      <View className='total-pay'>
        <View className='total'>
          总计： <Text className='price'>¥{totalAmount}</Text>
        </View>
        <View className='pay-btn' onClick={orderPay}>
          支付
        </View>
      </View>
      <AtModal isOpened={confirmOpen}>
        <AtModalContent>确定提交订单吗</AtModalContent>
        <AtModalAction>
          {' '}
          <Button
            type='default'
            onClick={() => {
              btnHandle(false)
            }}
          >
            取消
          </Button>{' '}
          <Button
            type='primary'
            onClick={() => {
              btnHandle(true)
            }}
          >
            确定
          </Button>{' '}
        </AtModalAction>
      </AtModal>
    </View>
  )
}

export default OrderPage
