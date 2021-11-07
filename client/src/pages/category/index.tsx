import React, { useState, useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtToast } from 'taro-ui'
import Taro, { usePullDownRefresh} from '@tarojs/taro'
import { callCloudFunction } from '@/helper/fetch'
import 'taro-ui/dist/style/components/tabs.scss'
import 'taro-ui/dist/style/components/toast.scss'
import './index.scss'

const CategoryPage: React.FC = () => {
  // const selector = ['男表', '女表', '情侣表', '商务手表']
  const tabList = [
    { title: '男士表' },
    { title: '女士表' },
    { title: '情侣表' },
    { title: '商务表' },
  ]
  const [proList, setProLists] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const handleClick = (val) => {
    setCurrent(val)
  }
  const goToDetails = (id: string) => {
    // 数据存储 跳转至详情页面
    Taro.navigateTo({
      url: `/pages/details/index?id=${id}`,
    })
  }
    const fetchData = ()=>{
      callCloudFunction({
        name: 'shopApis',
        data: {
          $url: 'pro/getList',
        },
      }).then((result: any) => {
        // 获取默认的地址
        console.log('getData.....', result)
        const _proList1 = result.filter((item) => item.category === 1)
        const _proList2 = result.filter((item) => item.category === 2)
        const _proList3 = result.filter((item) => item.category === 3)
        const _proList4 = result.filter((item) => item.category === 4)
        const _prosLists = [_proList1, _proList2, _proList3, _proList4]
        if (result) {
          setLoading(false)
        }
        // 产品分类展示
        setProLists(_prosLists)
      })
    }
    // 下拉刷新获取最新数据
    usePullDownRefresh(()=>{
      fetchData()
      Taro.stopPullDownRefresh()
    })


  useEffect(() => {
    fetchData()
  }, [])


  return (
    <View className='app'>
      {loading ? (
        <AtToast isOpened={loading} text='加载中' status='loading'></AtToast>
      ) : (
        <AtTabs
          current={current}
          scroll
          animated={false}
          height='500px'
          tabDirection='vertical'
          tabList={tabList}
          onClick={handleClick}
        >
          {proList.length &&
            proList.map((list, idx) => {
              return (
                <>
                  <AtTabsPane
                    tabDirection='vertical'
                    current={current}
                    index={0}
                    key={idx}
                  >
                    <View className='category'>
                      <View className='pro-wrap'>
                        {list.length ? (
                          list.map((item, index) => {
                            return (
                              
                                <View className='pro-list' key={index}>
                                  <View className='pro-list-inner'>
                                    <Image
                                      src={item.productCover}
                                      onClick={() => {
                                        goToDetails(item._id)
                                      }}
                                    />
                                    <View className='pro-name'>{item.productName}</View>
                                    <View className='pro-bottom'>
                                      <Text>￥{item.salesPrice}</Text>
                                      {/* <AtButton type='secondary' size='small' onClick={addToCart} circle>
              加入购物车
            </AtButton> */}
                                    </View>
                                  </View>
                                </View>
                              
                            )
                          })
                        ) : (
                          <View>暂无数据</View>
                        )}
                      </View>
                    </View>
                  </AtTabsPane>
                </>
              )
            })}
        </AtTabs>
      )}
    </View>
  )
}

export default CategoryPage
