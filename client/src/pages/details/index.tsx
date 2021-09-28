import React, { useState, useEffect } from 'react'
import { Swiper, SwiperItem, View, Text, Image } from '@tarojs/components'
import { AtButton, AtFloatLayout, AtInputNumber, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/modal.scss'
import pricePic from 'assets/details/priceMsg.png'
import 'taro-ui/dist/style/components/float-layout.scss'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/input-number.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/toast.scss'
import './index.scss'

interface ItemTypes {
  productName: string
  id: string
  productCover: string
  salesPrice: string
}

// swiper
const SwpierContent: React.FC<{ covers: string[] }> = (props) => {
  const { covers } = props
  return (
    <Swiper
      className='swiper-con'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay
    >
      {covers?.map((item, index) => {
        return (
          <SwiperItem key={index}>
            <View className='demo-text-1'>
              <Image src={item} mode='widthFix' />
            </View>
          </SwiperItem>
        )
      })}
    </Swiper>
  )
}
const DetailPage: React.FC = () => {
  const [isOpened, setopen] = useState(false)

  // 购买产数量
  const [nums, setVale] = useState(1)

  const [curSku, setCurSku] = useState<{ [key: string]: any }>({})

  const [toastOpen, setToastOpen] = useState(false)
  // 库存的提示
  const [tipsOpen, setTipsOpen] = useState(false)
  const [tipsText, setTipsText] = useState('商品库存不足')

  // 判断是添加入购物车还是立即购买
  const [confirmType, setConfirmType] = useState('cart')

  const [proDetails, setDetails] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    Taro.getStorage({
      key: 'proMsg',
      success: (res) => {
        setDetails(res.data || {})
      },
    })
  }, [])

  const curtainClose = () => {
    console.log(1222)
  }

  const handleChange = (val) => {
    setVale(val)
  }

  const handleConfirm = () => {
    setTipsOpen(false)

    if (!curSku.sku) {
      setTipsText('请选择商品')
      setTipsOpen(true)
      return
    }

    // todod  请求当前商品的库存是否足够
    const _finalData = { ...proDetails }
    _finalData.proNums = nums
    _finalData.curSku = curSku

    // Taro.setStorage({
    //   "key":'cart'
    // })
    // 筛选出被选中的规格是哪个

    if (confirmType === 'cart') {
      // 添加进入购物车数据库表
      callCloudFunction({
        name: 'shopApis',
        data: {
          $url: 'pro/addToCart',
          data: {
            proId: proDetails._id,
            skuId: curSku.skuId,
            buyNum: nums,
          },
        },
      }).then((res: any) => {
        console.log(res)
        setToastOpen(true)
        setopen(false)
        setTimeout(() => {
          setToastOpen(false)
        }, 1000)
      })
    } else {
      // 订单确认页面
      console.log('hahh', confirmType)

      // 获取当前选中的规格

      // 存入当前商品的相关信息到本地
      Taro.setStorage({
        key: 'orderPros',
        data: [{ ...proDetails, curSku: curSku, buyNum: nums }],
      })
      Taro.navigateTo({
        url: '/pages/order/orderConfirm/index',
      })
    }
  }

  const handleClick = (type: string) => {
    setConfirmType(type)
    console.log(type, confirmType === 'buy')
    setopen(true)
    return false
  }

  const handleSku = (item: any) => {
    setCurSku(item)
  }

  return (
    <View className='app'>
      {/* swiper */}
      <SwpierContent covers={proDetails.swiperPics} />
      <View className='pro-prices'>
        <View className='sales-price'>
          <Text>¥</Text>
          <Text>{proDetails.salesPrice}</Text>
          <Text className='original-price'>
            <Text>¥</Text>
            <Text>{proDetails.price}</Text>
          </Text>
        </View>
        <View className='collection'>收藏+</View>
      </View>
      <View className='pro-details'>
        {/* 关于商品 */}
        <View className='pro-msg'>
          <View className='name'>{proDetails.productName}</View>
        </View>
        <View className='pro-subtitle'>{proDetails.subTitle}</View>
      </View>
      {/*详情描述*/}
      {proDetails.content?.map((item, index) => {
        return <Image src={item} key={index} mode='widthFix' className='details-img' />
      })}
      {/* 描述 */}
      <View>
        <Image src={pricePic} className='price-img' />
      </View>
      {/* 底部展示 */}
      <View className='pro-bottom'>
        <AtButton
          className='cart'
          onClick={() => {
            handleClick('cart')
          }}
          type='primary'
          circle
        >
          加入购物车
        </AtButton>
        <AtButton
          className='buy'
          onClick={() => {
            handleClick('buy')
          }}
          type='primary'
          circle
        >
          立即购买
        </AtButton>
      </View>
      {/* 确认弹框 */}
      <AtFloatLayout isOpened={isOpened} onClose={curtainClose}>
        <View className='pro-to-order'>
          <View className='inner'>
            <View className='top'>
              {/* <Image src={proDetails.productLists[0].url} /> */}
              <View className='prices'>
                <Text className='cur'>
                  ¥{curSku.sku ? curSku.price : proDetails.salesPrice}
                </Text>
                {curSku.sku ? (
                  <View>
                    已选 <Text>{curSku.sku}</Text>
                    <Text className='num'>{nums}</Text>个
                  </View>
                ) : null}
              </View>
            </View>
            {/* 商品规格 */}
            <View className='sku_choose'>
              {proDetails.productLists &&
                proDetails?.productLists.map((item, index) => {
                  return (
                    <Text
                      onClick={() => {
                        handleSku(item)
                      }}
                      className={`item ${curSku.sku === item.sku ? 'active' : ''}`}
                      key={index}
                    >
                      {item.sku}{' '}
                    </Text>
                  )
                })}
            </View>
            {/* 数量选择 */}
            <View className='sku_nums'>
              <Text>数量：</Text>
              <AtInputNumber
                type='number'
                min={1}
                max={10}
                step={1}
                value={nums}
                onChange={handleChange}
              />
            </View>
          </View>
        </View>
        <View className='confirm'>
          <AtButton type='primary' onClick={handleConfirm}>
            确认
          </AtButton>
        </View>
      </AtFloatLayout>
      <AtToast isOpened={toastOpen} text='成功加入购物车' duration={1000}></AtToast>
      <AtToast isOpened={tipsOpen} text={tipsText}></AtToast>
    </View>
  )
}
export default DetailPage
