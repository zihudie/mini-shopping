 // eslint-disable-next-line import/no-commonjs
const BaseController = require('./baseController.js')
// const {parseTime} = require('../utils.js');

class CmsController extends BaseController{
  // 获取商品列表
  async getData(event) {
    // const {proCode,productName} = event.data || {}
    try {
      const result = await this.cloud.db.collection("cms_commodity")
      .where({price:'12'}
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
      )
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
      
      

      return this.success(result.data) 
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }
  /**
   * cms  添加商品 或者编辑商品
   */
  async addData(event) {
    console.log(event)
    const {data}  = event
    // 商品的创建时间
    // if(!data.createTime){
    //   data.createTime = parseTime(new Date())
    // }

    try {
      await  this.cloud.db.collection("cms_commodity")
      .add({
        data:data
      })
      return this.success({})
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }
}

module.exports = CmsController
// export default CmsController