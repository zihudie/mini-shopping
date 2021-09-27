 // eslint-disable-next-line import/no-commonjs
const BaseController = require('./baseController.js')
// const {parseTime} = require('../utils.js');

class CmsController extends BaseController{
  // 获取商品列表
  async getList(event) {
    // const {proCode,productName} = event.data || {}
    try {
      const result = await this.cloud.db.collection("cms_commodity")
      // .where(
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
      
      

      return this.success(result.data) 
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  // 添加进入购物车
  async addToCart(event) {
    const {data} = event
    // 判断商品id ,如果存在直接叠加 商品的数量，更新原有数据 否则新商品入表
    try {
      await this.cloud.db.collection("pro_cart")
      .add({
        data:data
      })
      return this.success({})
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  // 获取购物车列表
  async getCartData() {
    // 根据商品
    try {
      const result = await this.cloud.db.collection("pro_cart").get()
      // const result1 =  
      const _result = []

      if(result){
        (result.data||[]).map( async (item)=>{
          const details = await this.cloud.db.collection("cms_commodity")
          .where({
            _id:this.cloud._.eq(item.proId)
          })
          .get()
          const _sku =  ((details.data && details.data.productLists) || []).filter(list=>{
            list.skuId === result.data.skuId
          })[0]

          _result.push({...details.data, ..._sku, ...result.data})
        })

        return this.success(_result)
      }
      return this.success({})

    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  async addAddress(event){
    const {data} = event
    try{
      await this.cloud.db.collection("addressLists").add({
        data:data
      })

      return this.success({})

    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }


  async editAddress(event){
    const {data} = event
    const _id  = data._id
    delete data._id

    try{
      await this.cloud.db.collection("addressLists").where({
        _id: this.cloud._.eq(_id)
      }).update({
        data:data
      })
      return this.success({})
    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  async getAddress(event){
    const {data} = event
    try{
     const res =  await this.cloud.db.collection("addressLists").where({
        openId: this.cloud._.eq(data.openId)
      }).get()

      return this.success(res.data)

    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }



  

 
}

module.exports = CmsController
// export default CmsController