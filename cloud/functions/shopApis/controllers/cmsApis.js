 // eslint-disable-next-line import/no-commonjs
const BaseController = require('./baseController.js')
const dayjs = require("dayjs");
 
// const {parseTime} = require('../utils.js');

class CmsController extends BaseController{
  // 获取商品列表
  async getData(event) {
    const {_id,productName} = event.data || {}
    const query = {}
    if(_id){
      query._id = this.cloud.db.RegExp({
        regexp: '.*' + _id,
        options: 'i',
      })
    }
    if(productName){
      query.productName = this.cloud.db.RegExp({
        regexp: '.*' + productName,
        options: 'i',
      })
    }
    try {
      const result = await this.cloud.db.collection("cms_commodity")
      .where(query)
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
    // const _id = data._id
    // delete data._id
    // 商品的创建时间
    if(!data.createTime){
      // const _time  =  this.cloud.db.serverDate()
      data.createTime = dayjs(new Date().getTime()).add(8,'hour').format('YYYY/MM/DD HH:mm:ss')
    }
    
    if(data.productLists&&data.productLists.length){
      data.productLists.map(item=>{
        item.skuId  = 'sku' + new Date().getTime()
      })
    }
    try {
      await  this.cloud.db.collection("cms_commodity")
        .add({
          data: {...data,status:1}
        })
      return this.success({})
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }
  
  /**
   * cms  添加商品 或者编辑商品
   */
  async editData(event) {
    const {data}  = event
    const _id  = data._id
    delete data._id
    const _time  =  this.cloud.db.serverDate()
    data.updateTime = dayjs(new Date().getTime()).add(8,'hour').format('YYYY/MM/DD HH:mm:ss')
    try {
      await this.cloud.db.collection("cms_commodity").where({
        _id: this.cloud._.eq(_id)
      }).update({
        data: data
      })
      return this.success({})
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }
  // 获取所有用户的订单
 async getOrder(event){
  const {data} = event
  // orderId 订单ID,userId 用户ID
  const query = {}
  if(data.orderId){
    query._id = this.cloud.db.RegExp({
      regexp: '.*' + data.orderId,
      options: 'i',
    })
  }
  if(data.userId){
    query.openId = this.cloud.db.RegExp({
      regexp: '.*' + data.userId,
      options: 'i',
    })
  }
  try{
    const res =  await this.cloud.db.collection("pro_orders").where(query).get();
    return this.success(res.data)
  }catch(err){
    return this.fail(-10010,'failed...',err) 
  }
}
}
module.exports = CmsController