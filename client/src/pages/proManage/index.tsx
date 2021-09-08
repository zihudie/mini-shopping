import React, { Component, useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtList, AtListItem } from 'taro-ui'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/list.scss'
import './index.scss'

const ProManagePage: React.FC = () => {
  const [proform, setForm] = useState({
    proCode: '',
    productName: '',
  })

  const [dateSel, setDateSel] = useState('')
  const [dateSelEnd, setDateSelEnd] = useState('')

  const [proLists, setProLists] = useState<any[]>([])

  const handleChange = (type: string, val) => {
    setForm({ ...proform, [type]: val })
  }
  /**
   * 跳转到添加、编辑商品页面
   */
  const goJump = () => {
    Taro.navigateTo({
      url: '/pages/proManage/setting/index',
    })
  }

  const listSearch = () => {
    console.log(proform)
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'cms/getData',
        data: proform,
      },
    }).then((res: any) => {
      console.log(res)
      // useState(proLists)
      setProLists(res)
    })
  }

  const onDateChangeBegin = (e) => {
    setDateSel(e.detail.value)
  }
  const onDateChangeEnd = (e) => {
    setDateSelEnd(e.detail.value)
  }

  useEffect(() => {
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'cms/getData',
      },
    }).then((res: any) => {
      console.log(res)
      // useState(proLists)
      setProLists(res)
    })
  }, [])

  return (
    <View className='promanage'>
      {/* 筛选模块 */}
      <AtForm>
        <AtInput
          name='proCode'
          title='商品编号'
          type='text'
          placeholder='请输入商品编号'
          value={proform.proCode}
          onChange={(val) => handleChange('proCode', val)}
        />
        <AtInput
          name='productName'
          title='商品名称'
          type='text'
          placeholder='请输入商品名称'
          value={proform.productName}
          onChange={(val) => handleChange('productName', val)}
        />
        <View className='page-section'>
          <Text className='date-label'>创建日期：</Text>
          <View className='date-select'>
            <Picker mode='date' onChange={onDateChangeBegin}>
              <AtList>
                <AtListItem title='开始日期:' extraText={dateSel} />
              </AtList>
            </Picker>
            <Picker mode='date' onChange={onDateChangeEnd}>
              <AtList>
                <AtListItem title='结束日期:' extraText={dateSelEnd} />
              </AtList>
            </Picker>
          </View>
        </View>
      </AtForm>
      {/* 搜索   商品添加按钮 */}
      <View className='search-add'>
        <AtButton className='btn' type='primary' onClick={listSearch}>
          搜索
        </AtButton>
        <AtButton className='btn' type='primary' onClick={goJump}>
          添加
        </AtButton>
      </View>
      {/* 列表模块 */}
      <View className='product-lists'>
        {proLists.map((item, index) => {
          return (
            <View key={index} className='product-list-model'>
              <View className='product-list'>
                <View className='item'>
                  <Text className='label'>商品编号:</Text>
                  <Text>{item.proCode}</Text>
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
              {/* 操作区域 */}
              <View className='list-button'>
                <AtButton>上架</AtButton>
                <AtButton>编辑</AtButton>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default ProManagePage
