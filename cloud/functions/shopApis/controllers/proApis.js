 // eslint-disable-next-line import/no-commonjs
const BaseController = require('./baseController.js')
const dayjs = require("dayjs");

// const {parseTime} = require('../utils.js');

class CmsController extends BaseController{
  // 获取商品列表
  async getList(event) {
    // const {proCode,productName} = event.data || {}
    const query = {
      status:1
    }
    if(event.data && event.data.proId){
      query._id =  this.cloud._.eq(event.data.proId)
    }
    try {
      const result = await this.cloud.db.collection("cms_commodity").where(query)
      .get()
      return this.success(result.data) 
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  // 添加进入购物车
  async addToCart(event) {
    const {data} = event
    let cartId = ''
    // 判断商品id ,如果存在直接叠加 商品的数量，更新原有数据 否则新商品入表
    // if(data.proId)
    // proId skuId , openId
    // add ,update
    try {
      const cartDatas = await this.cloud.db.collection("pro_cart").where({
        openId: this.cloud._.eq(data.openId)
      }).get();
      if(cartDatas.data.length){
        const _data = cartDatas.data
        for(let i =0; i<_data.length;i++){
          const {skuId,proId} = _data[i]
          if(skuId === data.skuId && proId === data.proId){
            cartId = _data[i]._id
            break;
          }
        }
      }
     
      // cartDatas.length && cartDatas.map(item=>{
      //   const {openId,skuId,proId} = item
      //   if(openId === data.openId && skuId === data.skuId && proId === data.proId){
      //     cartId = item._id
      //   }
      // })
     
     if(cartId){
       await this.cloud.db.collection("pro_cart").where({
         _id: this.cloud._.eq(cartId)
       })
      .update({
        data:{
          buyNum:this.cloud._.inc(data.buyNum)
        }
      })
     }else{
       await this.cloud.db.collection("pro_cart")
      .add({
        data:data
      })
     }

      
      return this.success({})
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  // 获取购物车列表
  async getCartData(event) {
    const {data} =  event
    // 根据商品
    try {
      const result = await this.cloud.db.collection("pro_cart").where({
        openId: this.cloud._.eq(data.openId)
      }).get()
      const _result = []

      if(result.data){
 
        for(let item of result.data){
          const details = await this.cloud.db.collection("cms_commodity")
          .where({
            _id:this.cloud._.eq(item.proId)
          })
          .get()
          const _tmpData = details.data[0]
          const _sku =  ((_tmpData && _tmpData.productLists) || []).filter(list=>list.skuId === item.skuId)[0]
          _result.push({..._tmpData, curSku:_sku, ...item})
        }
        return this.success(_result)
      }else{
        return this.success({})
      }

    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }
// 添加地址
  async addAddress(event){
    const {data} = event
    delete data._id
    try{
      await this.cloud.db.collection("addressLists").add({
        data:data
      })

      return this.success({})

    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }


  async updateAddress(event){
    const {data} = event
    const _id  = data.addressId
    delete data._id

    console.log('_id....',_id,data)

    try{
       // 如果是delete  则删除当前数据
      if(data.type === "delete"){
        console.log("delete")
        await this.cloud.db.collection("addressLists").where({
          _id: this.cloud._.eq(_id)
        }).remove()

      }else if(data.type === 'setDefault'){
         // 如果是设置为默认，则更新当前数据，并将之前设置过的默认选项去除
        await this.cloud.db.collection("addressLists").where({
          openId: this.cloud._.eq(data.openId)
        }).update({
          data:{
            isDefault:false
          }
        })

        await this.cloud.db.collection("addressLists").where({
          _id: this.cloud._.eq(_id)
        }).update({
          data:{
            isDefault: true
          }
        })
      }
      return this.success({})
    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }
  

// 编辑地址
  async editAddress(event){
    const {data} = event
    const _id  = data._id
    delete data._id

    try{
      if(data.isDefault){
        // 如果当前设置为默认地址，则需将原有记录中的默认字段设置为false
        await this.cloud.db.collection("addressLists").where({
          openId: this.cloud._.eq(data.openId)
        }).update({
          data:{
            isDefault:false
          }
        })
      }
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
    const query = {
      openId: this.cloud._.eq(data.openId)
    }
    if(data.isDefault){
      query.isDefault = data.isDefault
    }
    try{
     const res =  await this.cloud.db.collection("addressLists").where(query).get()
      return this.success(res.data)

    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }



  // 创建订单

  async createOrder(event){
    const {data} = event
    const _time  =  this.cloud.db.serverDate()
    // add(8,'hour')
    const createTime = dayjs(new Date().getTime()).add(8,'hour').format('YYYY/MM/DD HH:mm:ss')
    data.lists.map(list=>{
      list.openId = data.openId
      list.createTime = createTime
    })
    try{
    // data.lists.map(async(list)=>{
    //   /**创建订单 */
    //   await this.cloud.db.collection("pro_orders").add({
    //     data:{
    //       openId:data.openId,
    //       ...list,
    //       createTime:createTime
    //     }
    //   })
    // })
     await this.cloud.db.collection("pro_orders").add({
        data: [...data.lists]
     })

    //将购物车列表中对应的id 商品删除
    data.lists.map(async(list)=>{
      await this.cloud.db.collection("pro_cart").where({
        _id: this.cloud._.eq(list.productId)
      }).remove()
    })
    // productId 
    return this.success({})
    }catch(err){
      return this.fail(-10010,'failed...',err) 
    }
  }

  // 获取用户的订单列表
  async getOrder(event){
    const {data} = event
    try{
      const res =  await this.cloud.db.collection("pro_orders").where({
        openId: this.cloud._.eq(data.openId),
      }).get();
      
      return this.success(res.data)

    }catch(err){

      return this.fail(-10010,'failed...',err) 
    }
  }

}

module.exports = CmsController