// const TcbRouter =  require("tcb-router")
import TcbRouter from  'tcb-router'
import LoginController from './controllers/login'
import SumController from './controllers/sum'


// const LoginController = require('./controllers/login')
// const SumController = require('./controllers/sum')

const api = {
  login: new LoginController(),
  sum : new SumController()
}

const main = (event,context) => {
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
  app.router('sum/getData', async (ctx) => {
    ctx.body = await api.sum.getData(event)
  })
  return app.serve()
}

export default  main