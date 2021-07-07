
// 默认dev的环境
let ENV_ID =  'cloud1-0gi5xo4g3cda5ab0'
// test 环境
if (process.env.NODE_ENV === 'test') {
  ENV_ID =  'cloud1-0gi5xo4g3cda5ab0'
// 生产环境
}else if (process.env.NODE_ENV === 'production'){
  ENV_ID =  'cloud1-0gi5xo4g3cda5ab0'
}
export default ENV_ID
