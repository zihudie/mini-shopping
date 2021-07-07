
import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const users_db = db.collection('users')
