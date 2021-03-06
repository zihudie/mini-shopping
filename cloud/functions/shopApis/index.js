/* eslint-disable import/no-commonjs */
// import TcbRouter from  'tcb-router'
// import LoginController from './controllers/login'
// import CmsController from './controllers/cmsApis'

const TcbRouter =  require("tcb-router")
const CmsController = require('./controllers/cmsApis')
const ProController = require('./controllers/proApis')
const FileController = require('./controllers/upload')
const LoginController = require('./controllers/login')



const api = {
  login: new LoginController(),
  cms : new CmsController(),
  pro : new ProController(),
  file: new FileController()
}

exports.main = async  (event,context) => {
  console.log(context)
  const app = new TcbRouter({event})
  app.use(async (ctx, next) => {
    ctx.data = {}
    console.log('查看结果222。。。。',event)
    await next()
  })
  
  app.router('login', async (ctx) => {
    ctx.body = await api.login.login(event)
  })
  app.router('getPhoneNumber', async (ctx) => {
    ctx.body = await api.login.getPhoneNumber(event)
  })
  // 上传图片
  app.router('file/upload', async (ctx) => {
    ctx.body = await api.file.uploadFile(event)
  })
  // 
  app.router('cms/getData', async (ctx) => {
    ctx.body = await api.cms.getData(event)
  })
  // 新增商品列表
  app.router('cms/addData', async (ctx) => {
    ctx.body = await api.cms.addData(event)
  })
  // 编辑商品列表
  app.router('cms/editData', async (ctx) => {
     ctx.body = await api.cms.editData(event)
  })
   //获取订单列表
   app.router('cms/getOrder', async (ctx) => {
    ctx.body = await api.cms.getOrder(event)
  })
  // 小程序客户端
  app.router('pro/getList', async (ctx) => {
    ctx.body = await api.pro.getList(event)
  })
  
  // 加入购物车
  app.router('pro/addToCart', async (ctx) => {
    ctx.body = await api.pro.addToCart(event)
  })
  
  // 获取购物车列表数据
  app.router('pro/getCartData', async (ctx) => {
    ctx.body = await api.pro.getCartData(event)
  })
  
 // 用户新增地址
  app.router('pro/addAddress', async (ctx) => {
    ctx.body = await api.pro.addAddress(event)
  })

  // 编辑用户地址列表
  app.router('pro/updateAddress', async (ctx) => {
    ctx.body = await api.pro.updateAddress(event)
  })

  // 更新地址
  app.router('pro/editAddress', async (ctx) => {
    ctx.body = await api.pro.editAddress(event)
  })

  // 获取用户地址列表
  app.router('pro/getAddress', async (ctx) => {
    ctx.body = await api.pro.getAddress(event)
  })

  // 创建订单页面 createOrder
  app.router('pro/createOrder', async (ctx) => {
    ctx.body = await api.pro.createOrder(event)
  })

  // 获取用户的订单页面 getOrder
  app.router('pro/getOrder', async (ctx) => {
    ctx.body = await api.pro.getOrder(event)
  })



  return app.serve()
}
