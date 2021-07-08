const cloud = require('../tcb')
class BaseController {
  constructor( ) {
    this.cloud  = cloud
  }
  /**
   * success
   */
  success(data){
    return {
      status:0,
      data,
      message:''
    }
  }
  fail(status = -1, message = 'api error', data = {}) {
    return { message, status, data }
  }
}

module.exports = BaseController 