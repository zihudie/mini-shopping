import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

const OrderPage: React.FC = () => {
  const [current, setCurrent] = useState(0)

  const tabList = [{ title: '全部' }, { title: '已完成' }, { title: '已取消' }]

  const handleClick = (val) => {
    setCurrent(val)
    // todo 发送请求 进行订单的筛选
  }

  const item = {
    productName:
      '黑人（DARLIE）双重薄荷牙膏225g 清新口气 防蛀固齿 口腔清洁（新旧包装随机发放） ',
    price: '12.55',
    num: 5,
    id: 'sku5998552255',
  }

  return (
    <View className='orders-confirm__module'>
      {/* 是否有地址 */}
      <View className='address-module'>
        <View className='name-tel'>吴小姐 1382658855</View>
        <View className='details'>
          上海浦东新区张江高科技园区浦东新区 申江路5005弄星创科技1号楼5层
        </View>
      </View>
      <View className='pro-lists'>
        <View className='list'>
          <Image />
          <View className='cons'>
            <View className='name'>
              明治 新加坡原装进口 儿童零食 小熊草莓夹心饼干蛋糕 休闲食品小零食独立包装50g
            </View>
            <View className='price-nums'>
              <Text className='price'>¥1236</Text>
              <Text className='nums'>×1</Text>
            </View>
            <View className='tips'>支持7天无理由退货</View>
          </View>
        </View>
      </View>

      <View className='order-msg'>
        <View className='order-li'>
          订单编号：<Text className='msg'>220230034316</Text>
        </View>
        <View className='order-li'>
          下单时间：<Text className='msg'>220230034316</Text>
        </View>
      </View>

      <View className='order-total'>
        <View className='total-item'>
          商品总额<Text className='msg'>¥18.98</Text>
        </View>
        <View className='total-item'>
          运费：<Text className='msg'>0.00</Text>
        </View>
        <View className='totla-amount'>
          实付金额 <Text className='msg'>¥18.98</Text>
        </View>
      </View>

      {/* 总计 */}
      <View className='total-pay'>
        <View className='pay-btn'>再次购买</View>
      </View>
    </View>
  )
}

export default OrderPage
