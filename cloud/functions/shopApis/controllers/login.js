const BaseController = require('./baseController.js')
class LoginController extends BaseController{
  async login(event) {
    const wxContext = this.cloud.getWXContext()
    return this.success({
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      env: wxContext.ENV
    })
  }
}

module.exports = LoginController