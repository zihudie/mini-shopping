import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { callCloudFunction } from '@/helper/fetch'
import { AtInput, AtForm, AtButton, AtList, AtListItem, AtSwitch, AtToast } from 'taro-ui'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/list.scss'
import 'taro-ui/dist/style/components/switch.scss'
import 'taro-ui/dist/style/components/toast.scss'
import provinces from './province'
import city from './cities'
import './index.scss'

const AddressDetails: React.FC = () => {
  const [cities, setCities] = useState<any[]>([])
  const [selectedProvince, setProvince] = useState('')
  const [selectedCity, setCity] = useState('')
  const [isOpened, setOpened] = useState(false)
  const [validOpen, setValidOpen] = useState(false)
  const [validMsg, setValidMsg] = useState('')
  const [userId, setUserId] = useState('')
  const [proform, setForm] = useState({
    _id:null,
    name: '',
    tel: '',
    isDefault: false,
    addressDetails: '',
    province: '',
    city: '',
  })

  const validateForm = {
    name: '请输入用户名',
    tel: '请输入手机号',
    addressDetails: '请输入详细地址',
  }

  useEffect(() => {
    Taro.getStorage({
      key: 'openid',
      success: (res) => {
        res.data && setUserId(res.data)
      },
    })

    // 编辑收货地址
    Taro.getStorage({
      key: 'curAddressList',
      success: (res) => {
        res.data && setForm(res.data)
        setProvince(res.data.province)
        setCity(res.data.city)
      },
    })
  }, [])

  /**
   *
   * @param type proform的key
   * @param val  key 对应的值
   */
  const handleChange = (type: string, val) => {
    setForm({ ...proform, [type]: val })
  }

  // 省份选择
  const selectProvinceOnChange = (e) => {
    const _index = Number(e.detail.value)

    setProvince(provinces[_index].name)
    setCities(city[provinces[_index].id])
  }

  // 城市选择
  const selectCityOnChange = (e) => {
    const _index = Number(e.detail.value)
    setCity(cities[_index].name)
  }

  // form 提交
  const onSubmit = (event) => {
    console.log('...', proform)
    for (let i in validateForm) {
      if (!proform[i]) {
        setValidOpen(true)
        setValidMsg(validateForm[i])
        setTimeout(() => {
          setValidOpen(false)
        }, 1000)
        return
      }
    }
    let url = ''
    // 添加或者编辑收货地址

    console.log('proform......', proform)
    if (proform._id) {
      url = 'pro/editAddress'
    } else {
      url = 'pro/addAddress'
    }
    addOrEditAddressFn(url)
  }

  // 新增地址
  const addOrEditAddressFn = (url) => {
    callCloudFunction({
      name: 'shopApis',
      data: {
        $url: url,
        data: {
          ...proform,
          city: selectedCity,
          province: selectedProvince,
          openId: userId,
        },
      },
    }).then((res) => {
      console.log(res)
      // 提示操作成功，跳转回到
      setOpened(true)
      Taro.navigateBack()
    })
  }

  return (
    <View className='promanage'>
      {/* 筛选模块 */}
      <AtForm onSubmit={onSubmit}>
        <AtInput
          required
          name='name'
          title='收货人'
          type='text'
          maxlength={50}
          placeholder='姓名'
          value={proform.name}
          onChange={(val) => handleChange('name', val)}
        />
        <AtInput
          required
          name='tel'
          title='联系方式'
          type='number'
          maxlength={11}
          placeholder='手机号码'
          value={proform.tel}
          onChange={(val) => handleChange('tel', val)}
        />
        <Picker
          mode='selector'
          range={provinces}
          rangeKey='name'
          onChange={selectProvinceOnChange}
        >
          <AtList>
            <AtListItem title='所在省份' extraText={selectedProvince} />
          </AtList>
        </Picker>
        <Picker
          mode='selector'
          range={cities}
          rangeKey='name'
          onChange={selectCityOnChange}
        >
          <AtList>
            <AtListItem title='所在城市' extraText={selectedCity} />
          </AtList>
        </Picker>
        <AtInput
          required
          name='addressDetails'
          title='详细地址'
          type='text'
          placeholder='填写详细地址'
          value={proform.addressDetails}
          onChange={(val) => handleChange('addressDetails', val)}
        />

        <View className='switch-model'>
          <AtSwitch
            title='设为默认地址'
            checked={proform.isDefault}
            onChange={(val) => {
              handleChange('isDefault', val)
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
      <AtToast isOpened={validOpen} text={validMsg}></AtToast>
    </View>
  )
}
export default AddressDetails
