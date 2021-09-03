import React, { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import './index.scss'

const ProManagePage: React.FC = () => {
  const [proform, setForm] = useState({
    text: '',
    name: '',
  })

  const handleChange = (type: string, val) => {
    setForm({ ...proform, [type]: val })
  }

  const goJump = () => {
    Taro.navigateTo({
      url: '/pages/proManage/setting/index',
    })
  }

  const proLists = [
    {
      productName: '***手表',
      subTitle: '****手表副标题描述',
      status: 1,
      inventory: 1000,
      isRecommond: 1,
      isNew: 1,
      createTime: '2021-08-31',
      id: '11232332',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      price: 3200.0,
      salesPrice: 1260.0,
      category: '商务休闲',
    },
    {
      productName: '***手表',
      subTitle: '****手表副标题描述',
      status: 1,
      inventory: 1000,
      isRecommond: 1,
      isNew: 1,
      createTime: '2021-08-31',
      id: '11232332',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      price: 3200.0,
      salesPrice: 1260.0,
      category: '商务休闲',
    },

    {
      productName: '***手表',
      subTitle: '****手表副标题描述',
      status: 1,
      inventory: 1000,
      isRecommond: 1,
      isNew: 1,
      createTime: '2021-08-31',
      id: '11232332',
      productCover: 'http://articleimg.xbiao.com/2015/0623/201506231435028356156.jpg',
      price: 3200.0,
      salesPrice: 1260.0,
      category: '商务休闲',
    },
  ]

  return (
    <View className='promanage'>
      {/* 筛选模块 */}
      <AtForm>
        <AtInput
          name='value1'
          title='文本'
          type='text'
          placeholder='单行文本'
          value={proform.text}
          onChange={(val) => handleChange('text', val)}
        />
        <AtInput
          name='value2'
          title='数字'
          type='number'
          placeholder='请输入数字'
          value={proform.name}
          onChange={(val) => handleChange('name', val)}
        />
      </AtForm>
      {/* 搜索   商品添加按钮 */}
      <View className='search-add'>
        <AtButton>搜索</AtButton>
        <AtButton onClick={goJump}>添加</AtButton>
      </View>

      {/* 列表模块 */}
      <View className='product-lists'>
        {proLists.map((item, index) => {
          return (
            <View className='product-list' key={index}>
              <View className='item'>
                <Text className='label'>商品编号:</Text>
                <Text>{item.id}</Text>
              </View>
              <View className='item'>
                <Text className='label'>商品名称:</Text>
                <Text>{item.productName}</Text>
              </View>
              <View className='item'>
                <Text className='label'>商品原价:</Text>
                <Text>{item.price}元</Text>
              </View>
              <View className='item'>
                <Text className='label'>售卖价格:</Text>
                <Text>{item.salesPrice}元</Text>
              </View>
              <View className='item'>
                <Text className='label'>商品分类:</Text>
                <Text>{item.category}</Text>
              </View>
              <View className='item'>
                <Text className='label'>状态:</Text>
                <Text>{item.status}</Text>
              </View>
              <View className='item'>
                <Text className='label'>为推荐产品:</Text>
                <Text>{item.isRecommond}</Text>
              </View>
              <View className='item'>
                <Text className='label'>为新品:</Text>
                <Text>{item.isNew}</Text>
              </View>
              <View className='item'>
                <Text className='label'>创建时间:</Text>
                <Text>{item.createTime}</Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default ProManagePage
// export default class ProManagePage extends Component<{},iState> {
//   constructor() {
//     super(...arguments)
//     this.state = {
//       value1: '',
//       value2: ''
//     }
//   }
//   handleChange(value) {
//     this.setState(value)
//     return value
//   }
//   render() {
//     return (
//       <View className='promanage'>
//         {/* 筛选模块 */}
//         <AtForm>
//           <AtInput
//             name='value1'
//             title='文本'
//             type='text'
//             placeholder='单行文本'
//             value={this.state.value1}
//             onChange={this.handleChange.bind(this)}
//           />
//           <AtInput
//             name='value2'
//             title='数字'
//             type='number'
//             placeholder='请输入数字'
//             value={this.state.value2}
//             onChange={this.handleChange.bind(this)}
//           />
//         </AtForm>

//         {/* 列表模块 */}

//       </View>
//     )
//   }
// }
