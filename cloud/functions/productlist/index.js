// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
   // const {proCode,productName} = event.data || {}
   try {
    const result = await this.cloud.db.collection("cms_commodity")
    // .where({price:'12'}
    //  [
    //   {
    //     proCode:this.cloud.db.RegExp({
    //       regexp: proCode,
    //       options:'i'
    //     })
    //    },
    //   {
    //     productName:this.cloud.db.RegExp({
    //       regexp: productName,
    //       options:'i'
    //     })
    //    }
    //  ]
    // )
    // .field({
    //   _id:false,
    //   city:true,
    //   province:true,
    //   gdp:true
    // })
    // .orderBy("gdp","desc")
    // .skip(0)
    // .limit(20)
    .get()
    
    return {
      data:result.data
    }
  }catch (err){
    return {
      data:null,
      msg:err
    }
  }
}

