import cloud, { init, DYNAMIC_CURRENT_ENV, database } from 'wx-server-sdk'

init({
  env: DYNAMIC_CURRENT_ENV
})
const tcb = cloud
tcb.db = database()
tcb._ = tcb.db.command
tcb.$ = tcb._.aggregate
export default tcb
 