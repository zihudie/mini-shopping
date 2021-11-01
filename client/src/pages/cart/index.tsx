import React, { useState, useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro, { setStorage } from '@tarojs/taro'
import { AtInputNumber } from 'taro-ui'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/input-number.scss'
import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

const CartPage: React.FC = () => {
  const [curId, setCurId] = useState('')
  const [isAllChecked, setAllChecked] = useState(false)
  const [lenAll, setLenAll] = useState(false)
  const [total, setTotal] = useState(0)
  const [cartList, setCartList] = useState<any[]>([])

  Taro.getStorage({
    key: 'openid',
    success: (res) => {
      console.log('openid...', res.data)
      setCurId(res.data)
    },
  })

  const handleChange = (index: number, value: number, e: any) => {
    let _total = 0
    cartList[index] = {
      ...cartList[index],
      buyNum: value,
      total: value * cartList[index].price,
    }
    const newArr = [...cartList]
    setCartList(newArr)

    newArr.map((item) => {
      item.isSelected = true
      _total += item.total
    })
    if (newArr.filter((item) => item.isSelected).length === newArr.length) {
      setLenAll(true)
    } else {
      setLenAll(false)
    }
    setTotal(_total)
    e.stopPropagation()
  }

  useEffect(() => {
    if (!curId) return
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getCartData',
        data: { openId: curId },
      },
    }).then((res: any) => {
      console.log('..hhdddah....', res)
      setCartList(res)
    })
  }, [curId])

  // 点击每项
  const itemClick = (index: number) => {
    cartList[index] = { ...cartList[index], isSelected: !cartList[index].isSelected }
    const newArr = [...cartList]

    if (cartList[index].isSelected) {
      setTotal(total + cartList[index].buyNum * cartList[index].price)
    } else {
      setTotal(total - cartList[index].buyNum * cartList[index].price)
    }

    if (newArr.filter((item) => item.isSelected).length === newArr.length) {
      setLenAll(true)
    } else {
      setLenAll(false)
    }
    setCartList(newArr)
  }

  // 点击底部全选按钮
  const allCheck = () => {
    // let tmpCheck = !isAllChecked
    setAllChecked(!isAllChecked)
  }

  useEffect(() => {
    const _tmpArr = [...cartList]
    let _total = 0
    console.log('after', isAllChecked)
    if (!isAllChecked) {
      setLenAll(true)
      _tmpArr.map((item) => {
        item.isSelected = false
      })
    } else {
      _tmpArr.map((item) => {
        item.isSelected = true
        _total += item.buyNum * item.price
      })
    }

    const newArr = [..._tmpArr]

    setTotal(_total)
    setCartList(newArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked])

  // 总结算
  const totalCalculate = () => {
    Taro.setStorage({
      key: 'orderPros',
      data: cartList,
    })
    Taro.navigateTo({
      url: '/pages/order/orderConfirm/index',
    })
  }

  return (
    <View className='cart-model'>
      {cartList.map((list, index) => {
        return (
          <View className={`cart-list ${list.isSelected ? 'm-active' : ''}`} key={index}>
            <View className='m-top'>
              <View
                className='check'
                onClick={() => {
                  itemClick(index)
                }}
              ></View>
              <View className='pics'>
                <Image mode='widthFix' src={list.curSku.url} />
              </View>
              <View className='cons'>
                <View className='name'>{list.productName}</View>
                <View className='price_line'>
                  <Text className='price'>¥{list.price}</Text>
                  <View className='num_wrap'>
                    <AtInputNumber
                      type='number'
                      min={1}
                      max={50}
                      step={1}
                      value={list.buyNum}
                      onChange={(value, e) => {
                        handleChange(index, value, e)
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      })}
      <View className='cart-bottom'>
        <View className='all-cal'>
          <View className='check-model' onClick={allCheck}>
            <Text
              className={`all-check ${isAllChecked && lenAll ? 'all-checked' : ''}`}
            ></Text>
            <Text>全选</Text>
          </View>
          <Text className='total'>总计:¥{total}</Text>
          <Text className='calculate' onClick={totalCalculate}>
            结算
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CartPage
