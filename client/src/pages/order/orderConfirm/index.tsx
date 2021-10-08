import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { callCloudFunction } from '@/helper/fetch'
import { AtModal } from 'taro-ui'
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

  useEffect(() => {
    Taro.getStorage({
      key: 'openid',
      success: (res) => {
        console.log('openid...111', res.data)
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
  }, [])

  useEffect(() => {
    if (!curId) return
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getAddress',
        data: { openId: curId },
      },
    }).then((result: any) => {
      // 获取默认的地址
      console.log('getData.....', result)
      setAddressList(result[0] || {})
    })
  }, [curId])

  const orderPay = () => {
    // 提示，是否确认支付， 点击确定则为订单完成， 点击取消则订单为取消状态
    console.log('click')
    setConfirmOpen(true)
  }

  const btnHandle = (type: boolean) => {
    console.log('type......', type)
    // 1 已完成 0 已取消
    const orderType = type ? 1 : 0
    const _orderData: any = []

    proDetails.map((item) => {
      const { productName, curSku, buyNum, _id } = item
      _orderData.push({
        productName,
        curSku: curSku,
        buyNum,
        productId: _id,
        addressList: addressList,
        totalPrice: buyNum * curSku.price,
        orderType: orderType,
      })
    })

    // 清除orderPro 的storage
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/createOrder',
        data: { openId: curId, lists: [..._orderData] },
      },
    }).then(() => {
      Taro.removeStorage({
        key: 'orderPros',
      })
      Taro.switchTab({
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
      <AtModal
        isOpened={confirmOpen}
        cancelText='取消'
        confirmText='确认'
        onCancel={() => {
          btnHandle(false)
        }}
        onConfirm={() => {
          btnHandle(true)
        }}
        content='确定提交订单吗?'
      ></AtModal>
    </View>
  )
}

export default OrderPage
