import BaseController from './baseController.js'

class SumController extends BaseController{
  async getData() {
    try {
      const result = await this.cloud.db.collection("china")
      .where({
        gdp:this.cloud._.gt(5000)
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
      return this.success(result.data) 
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  
  }
}


export default SumController