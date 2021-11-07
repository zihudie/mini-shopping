import React, { useState, useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro, {useDidShow,usePullDownRefresh} from '@tarojs/taro'
import { AtInputNumber,AtToast } from 'taro-ui'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/input-number.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/toast.scss'
import './index.scss'

const CartPage: React.FC = () => {
  const [curId, setCurId] = useState('')
  const [loading, setLoading] = useState(true)
  const [toastOpen, setToastOpen] =  useState(false)
  const [isAllChecked, setAllChecked] = useState(false)
  const [lenAll, setLenAll] = useState(false)
  const [total, setTotal] = useState(0)
  const [cartList, setCartList] = useState<any[]>([])

  useEffect(()=>{
    Taro.getStorage({
      key: 'openid',
      success: (res) => {
        setCurId(res.data)
      }
    })
  },[])

  const fetchData = ()=>{
    if (!curId) return
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'pro/getCartData',
        data: { openId: curId },
      },
    }).then((res: any) => {
      setLoading(false)
      setCartList(res)
      setLenAll(false)
      setTotal(0)
    })
  }

  useDidShow(()=>{
    fetchData()
  })
  // 下拉刷新获取最新数据
  usePullDownRefresh(()=>{
    fetchData()
    Taro.stopPullDownRefresh()
  })

  const handleChange = (index: number, value: number, e: any) => {
    let _total = 0
    cartList[index] = {
      ...cartList[index],
      buyNum: value,
      total: value * Number(cartList[index].curSku.price),
    }
    const newArr = [...cartList]
    setCartList(newArr)

    newArr.map((item) => {
      console.log("_total...",item.price)
      if(item.isSelected){
        _total += Number(item.total || 0)
      }
      // item.isSelected = true
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
    fetchData()
  }, [curId])

  // 点击每项
  const itemClick = (index: number) => {
    cartList[index] = { ...cartList[index], isSelected: !cartList[index].isSelected }
    const newArr = [...cartList]

    if (cartList[index].isSelected) {
      setTotal(total + cartList[index].buyNum * Number(cartList[index].curSku.price))
    } else {
      setTotal(total - cartList[index].buyNum * Number(cartList[index].curSku.price))
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
        _total += item.buyNum * Number(item.curSku.price)
      })
    }

    const newArr = [..._tmpArr]

    setTotal(_total)
    setCartList(newArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked])

  // 总结算
  const totalCalculate = () => {
   const selectedList = cartList.filter(item=>item.isSelected)
    if(!selectedList.length){
      setToastOpen(true)
      setTimeout(() => {
        setToastOpen(false)
      }, 1000);
      return 
    }
    Taro.setStorage({
      key: 'orderPros',
      data: selectedList,
    })
    Taro.navigateTo({
      url: '/pages/order/orderConfirm/index',
    })
  }

  if(loading){
    return (
      <AtToast isOpened={loading} text='加载中...' status='loading'></AtToast>
    )
  }

  return (
    <View className='cart-model'>
      <View className='cart-wrap'>
      { cartList.length ? cartList.map((list, index) => {
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
                <View className='tag'>
                  <Text className='inner'>{list.curSku.sku}</Text>
                </View>
                <View className='price_line'>
                  <Text className='price'>¥{list.curSku.price}</Text>
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
      })
      :
      <View className="no-data">
         购物车为空
      </View>
    }
      </View>
      {
        cartList.length ? (
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
        ) 
        : null
      }
      <AtToast isOpened={toastOpen} text='请选择商品' duration={900}></AtToast>
    </View>
  )
}

export default CartPage
