 // eslint-disable-next-line import/no-commonjs
 const BaseController = require('./baseController.js')

class LoginController extends BaseController{
  async login(event) {
    const wxContext = this.cloud.getWXContext()
    console.log(wxContext)
    // 根据Openid构建用户体系
    await this.cloud.db.collection("users").add({
      data:{
        openID:wxContext.OPENID
      }
    })
    // login
    return this.success({
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      env: wxContext.ENV
    })
  }
  
  async getPhoneNumber(event){
    switch (event.action) {
      case 'getcellphone':{
        return getCellphone(event);
      }
      default: {
        return
      }
    }
  }
}


async function getCellphone(event){
  const res = await this.cloud.getOpenData({
    list: [event.id], // 假设 event.openData.list 是一个 CloudID 字符串列表
  })  
  return {res,event};
}

module.exports = LoginController