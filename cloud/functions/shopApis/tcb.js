// import cloud, { init, DYNAMIC_CURRENT_ENV, database } from 'wx-server-sdk'
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const tcb = cloud
tcb.db = cloud.database()
tcb._ = tcb.db.command
tcb.$ = tcb._.aggregate
// export default tcb
 
module.exports = tcb