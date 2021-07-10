const TcbRouter =  require("tcb-router")
const LoginController = require('./controllers/login')
const SumController = require('./controllers/sum')

const api = {
  login: new LoginController(),
  sum : new SumController()
}

exports.main = (event,context) => {
  const app = new TcbRouter({event})
  app.use(async (ctx, next) => {
    ctx.data = {}
    console.log('查看结果222。。。。',event)

    await next()
  })
  
  app.router('login', async (ctx) => {
    ctx.body = await api.login.login(event)
  })
  app.router('sum/getData', async (ctx) => {
    ctx.body = await api.sum.getData(event)
  })
  return app.serve()
}