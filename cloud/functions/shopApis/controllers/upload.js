const BaseController = require('./baseController.js')

class FileController extends BaseController{
  async uploadFile(event) {
    try {
      // Buffer.from(event.fileContent, 'base64')
      const result =   await this.cloud.uploadFile({
        fileContent: Buffer.from(event.fileContent, 'base64'),
        cloudPath: 'products/'+ 'shop'+ `${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` +  event.name // 使用随机文件名
      })

      const finalData = await this.cloud.getTempFileURL({
        fileList: [result.fileID],
      })
      
      return this.success(finalData.fileList)
      
    }catch (err){
      return this.fail(-10010,'failed...',err) 
    }
  }
}

module.exports = FileController
