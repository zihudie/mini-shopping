import { Component } from 'react'
import Taro from '@tarojs/taro'
// import ENV_ID from 'helper/env'
import './app.scss'
import { callCloudFunction } from '@/helper/fetch'

class App extends Component {
  componentWillMount(){
    Taro.cloud.init(
      {
        env: process.env.ENV_ID,
        traceUser: true
      }
    )
  }
  componentDidMount() {
    // 云开发初始化
    // Taro.getUserInfo({
    //   success: function(res) {
    //     console.log(res)
    //   }
    // }) 
    // const db = Taro.cloud.database()
    // const users_db = db.collection('users')
    // 获取用户信息  进行存储
    callCloudFunction({
        name: "shopApis",
        data: {
          $url: "login"
        }
      })
      .then(res => {
        console.log("res",res)
        const { openid } = res as any
        Taro.setStorage({
          key: 'openid',
          data: openid
        })
      })

       

       
        // users_db.where({
        //   openid
        // }).get().then(res => {
        //   if (res.data.length === 0) {
        //     users_db.add({
        //       data: {
        //         openid,
        //         unionid
        //       }
        //     })
        //   }
        // })
     
  }
  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
