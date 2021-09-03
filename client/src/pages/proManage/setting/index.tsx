import React, { useState } from 'react'
import { View, Picker, Text } from '@tarojs/components'
import {
  AtInput,
  AtForm,
  AtButton,
  AtList,
  AtListItem,
  AtSwitch,
  AtImagePicker,
} from 'taro-ui'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/list.scss'
import 'taro-ui/dist/style/components/switch.scss'
import 'taro-ui/dist/style/components/image-picker.scss'
import './index.scss'

const ProSettingPage: React.FC = () => {
  const selector = ['运动', '休闲', '情侣', '商务']
  const [selected, setSelected] = useState('运动')
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
    const _index = Number(e.detail.value)
    setSelected(selector[_index])
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

  // fileChange
  const fileChange = (files: any, index: number) => {
    console.log(files)
    const tempPro = proform.productLists
    tempPro[index].img = [{ url: files[files.length - 1].url }]
    console.log(tempPro)

    setForm({ ...proform, productLists: tempPro })
  }
  const fileFail = (mes: string, index: number) => {
    console.log(mes)
  }
  // form 提交
  const onSubmit = (event) => {
    console.log(proform)
    // console.log(event)
  }

  return (
    <View className='promanage'>
      {/* 筛选模块 */}
      <AtForm onSubmit={onSubmit}>
        <AtInput
          required
          name='productName'
          title='商品名称'
          type='text'
          maxlength={4}
          placeholder='请输入商品名称'
          value={proform.productName}
          onChange={(val) => handleChange('productName', val)}
        />
        <AtInput
          required
          name='subTitle'
          title='商品副标题'
          type='text'
          placeholder='商品副标题'
          value={proform.subTitle}
          onChange={(val) => handleChange('subTitle', val)}
        />
        <Picker mode='selector' range={selector} onChange={selectOnChange}>
          <AtList>
            <AtListItem title='商品分类' extraText={selected} />
          </AtList>
        </Picker>
        <AtInput
          required
          name='price'
          title='商品原价'
          type='number'
          placeholder='请输入商品原价'
          value={proform.price}
          onChange={(val) => handleChange('price', val)}
        />
        <AtInput
          required
          name='salesPrice'
          title='售卖价格'
          type='number'
          placeholder='请输入售卖价格'
          value={proform.salesPrice}
          onChange={(val) => handleChange('salesPrice', val)}
        />
        <AtInput
          required
          name='inventory'
          title='商品库存'
          type='number'
          placeholder='请输入商品库存'
          value={proform.inventory}
          onChange={(val) => handleChange('inventory', val)}
        />
        <View className='switch-model'>
          <AtSwitch
            title='推荐产品'
            checked={proform.isRecommond}
            onChange={(val) => {
              handleChange('isRecommond', val)
            }}
          />
          <AtSwitch
            title='新产品'
            checked={proform.isNew}
            onChange={(val) => {
              handleChange('isNew', val)
            }}
          />
        </View>
        {/* cover 图片 */}
        {/* 添加多规格  颜色*/}

        <View className='add_sku-lists'>
          <AtButton type='primary' className='sku-add-btn' onClick={addSku}>
            +添加规格
          </AtButton>
          {proform.productLists.map((list, _idx) => {
            return (
              <View className='sku-list' key={_idx}>
                <AtInput
                  required
                  name={`sku${_idx}`}
                  title={`型号${_idx + 1}`}
                  type='number'
                  placeholder='请输入型号名称'
                  value={list.sku}
                  onChange={(val) => handleListChange(_idx, 'sku', val)}
                />
                <View>
                  <AtImagePicker
                    multiple
                    files={list.img}
                    onChange={(files) => fileChange(files, _idx)}
                    onFail={(mes) => fileFail(mes, _idx)}
                  />
                  <AtInput
                    required
                    name={`price${_idx}`}
                    title='价格'
                    type='number'
                    placeholder='请输入价格'
                    value={list.price}
                    onChange={(val) => handleListChange(_idx, 'price', val)}
                  />
                </View>
              </View>
            )
          })}
        </View>
        {/* <AtInput
          name='value2'
          title='商品原价'
          type='number'
          placeholder='请输入商品原价'
          value={proform.name}
          onChange={(val) => handleChange('name', val)}
        /> */}
        {/* <View className='search-add'></View> */}
        <AtButton type='primary' className='pro-submit' onClick={onSubmit}>
          提交
        </AtButton>
        {/* <AtButton formType='submit' type='primary' >提交</AtButton> */}
      </AtForm>
    </View>
  )
}
export default ProSettingPage
