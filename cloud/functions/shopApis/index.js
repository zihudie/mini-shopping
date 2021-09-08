/* eslint-disable import/no-commonjs */
// import TcbRouter from  'tcb-router'
// import LoginController from './controllers/login'
// import CmsController from './controllers/cmsApis'

const TcbRouter =  require("tcb-router")
const CmsController = require('./controllers/cmsApis')
const LoginController = require('./controllers/login')


const api = {
  login: new LoginController(),
  cms : new CmsController()
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
  // 
  app.router('cms/getData', async (ctx) => {
    ctx.body = await api.cms.getData(event)
  })
  // 新增商品列表
  app.router('cms/addData', async (ctx) => {
    ctx.body = await api.cms.addData(event)
  })
  return app.serve()
}

// export default  main