// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  // 该配置能保证当前的环境同小程序客户端的环境一致，动态切换到相应的环境
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db  = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
 
  // const result =  await db.collection("zhihu_daily").doc("13a10c3a60dc04b90063266167ff5a36")
  // .update({
  //   data:{
  //     title:"【知乎日报】元素，生生不息的宇宙诸子"
  //   }
  // })
 
  const result = await db.collection("china")
  .where({
    gdp:_.gt(5000)
  })
  .field({
    _id:false,
    city:true,
    province:true,
    gdp:true
  })
  // .orderBy("gdp","desc")
  // .skip(0)
  // .limit(10)
  .get()
  console.log(result)
  return result

}