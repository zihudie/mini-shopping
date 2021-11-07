import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import 'taro-ui/dist/style/components/toast.scss'
import 'taro-ui/dist/style/components/button.scss'
import './index.scss'

 
interface propItems {
  [key: string]: any
}
const ProductItem: React.FC<propItems> = (props) => {
  // const [userId, setUserId] = useState('')
  // const [isOpen, setOpen] = useState(false)
  const { _id, productName, productCover, salesPrice } = props.item
  // Taro.getStorage({
  //   key: 'openid',
  //   success: (res) => {
  //     res.data && setUserId(res.data)
  //   },
  // })

 

  const goToDetails = () => {
    // Taro.setStorage({
    //   key: 'proMsg',
    //   data: props.item,
    // })
    // 数据存储 跳转至详情页面
    console.log("hhhhhh",_id)
    Taro.navigateTo({
      url: '/pages/details/index?id='+_id,
    })
  }

  return (
    <>
      <View className='pro-list'>
        <View className='pro-list-inner'>
          <Image src={productCover} onClick={goToDetails} />
          <View className='pro-name'>{productName}</View>
          <View className='pro-bottom'>
            <Text>￥{salesPrice}</Text>
          </View>
        </View>
      </View>
      {/* <AtToast isOpened={isOpen} text='当前商品库存不足'></AtToast> */}
    </>
  )
}
export default ProductItem
