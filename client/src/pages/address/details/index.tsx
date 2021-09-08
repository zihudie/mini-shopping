import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { callCloudFunction } from '@/helper/fetch'
import { AtInput, AtForm, AtButton, AtList, AtListItem, AtSwitch, AtToast } from 'taro-ui'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/list.scss'
import 'taro-ui/dist/style/components/switch.scss'
import 'taro-ui/dist/style/components/toast.scss'
import './index.scss'

const AddressDetails: React.FC = () => {
  const selector = [
    ['上海', '安徽'],
    ['上海', '池州', '合肥', '黄山', '安庆'],
  ]
  const [selected, setSelected] = useState('运动')
  const [isOpened, setOpened] = useState(false)
  const [proform, setForm] = useState({
    productName: '',
    subTitle: '',
    inventory: '',
    price: '',
    salesPrice: '',
    status: true,
    isRecommond: false,
    isNew: false,
    productLists: [
      {
        sku: '',
        price: '',
        img: [{ url: '' }],
      },
    ],
  })

  /**
   *
   * @param type proform的key
   * @param val  key 对应的值
   */
  const handleChange = (type: string, val) => {
    setForm({ ...proform, [type]: val })
  }

  /**
   *
   * @param index
   * @param type
   * @param val
   */
  const handleListChange = (index: number, type: string, val) => {
    const tempPro = proform.productLists
    tempPro[index][type] = val
    setForm({ ...proform, productLists: tempPro })
  }

  // select  商品种类
  const selectOnChange = (e) => {
    console.log(e)
  }

  const addSku = () => {
    const tempPro = proform.productLists
    tempPro.push({
      sku: '',
      price: '',
      img: [{ url: '' }],
    })
    setForm({ ...proform, productLists: tempPro })
  }

  // form 提交
  const onSubmit = (event) => {
    console.log(proform)

    // 所有检验完成 进行商品的添加

    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: 'cms/addData',
        data: proform,
      },
    }).then((res) => {
      console.log(res)
      // 提示操作成功，跳转回到
      setOpened(true)
      Taro.navigateTo({ url: '/pages/proManage/index' })
    })
  }

  return (
    <View className='promanage'>
      {/* 筛选模块 */}
      <AtForm onSubmit={onSubmit}>
        <AtInput
          required
          name='productName'
          title='收货人'
          type='text'
          maxlength={4}
          placeholder='姓名'
          value={proform.productName}
          onChange={(val) => handleChange('productName', val)}
        />
        <AtInput
          required
          name='productName'
          title='联系方式'
          type='number'
          maxlength={11}
          placeholder='手机号码'
          value={proform.productName}
          onChange={(val) => handleChange('productName', val)}
        />
        <Picker mode='multiSelector' range={selector} onChange={selectOnChange}>
          <AtList>
            <AtListItem title='所在地区' extraText={selected} />
          </AtList>
        </Picker>
        <AtInput
          required
          name='subTitle'
          title='详细地址'
          type='text'
          placeholder='填写详细地址'
          value={proform.subTitle}
          onChange={(val) => handleChange('subTitle', val)}
        />

        <View className='switch-model'>
          <AtSwitch
            title='设为默认地址'
            checked={proform.isRecommond}
            onChange={(val) => {
              handleChange('isRecommond', val)
            }}
          />
        </View>
        {/* cover 图片 */}
        {/* <View className='search-add'></View> */}
        <AtButton type='primary' className='pro-submit' onClick={onSubmit}>
          确认
        </AtButton>
      </AtForm>

      {/* AtToast  新增，编辑商品成功*/}
      <AtToast isOpened={isOpened} text='操作成功'></AtToast>
    </View>
  )
}
export default AddressDetails
