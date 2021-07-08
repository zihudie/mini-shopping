import { Component } from 'react'
import Taro from '@tarojs/taro'
// import ENV_ID from 'helper/env'
import './app.scss'


class App extends Component {
 
  componentDidMount() {
    // 云开发初始化
    Taro.cloud.init(
      {
        env: process.env.ENV_ID,
        traceUser: true
      }
    )
    const db = Taro.cloud.database()
    const users_db = db.collection('users')
    // 获取用户信息  进行存储
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        const { openid, unionid } = res.result as any
        Taro.setStorage({
          key: '_o',
          data: openid
        })
        Taro.setStorage({
          key: '_u',
          data: unionid
        })
        users_db.where({
          openid
        }).get().then(res => {
          if (res.data.length === 0) {
            users_db.add({
              data: {
                openid,
                unionid
              }
            })
          }
        })
      })
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
