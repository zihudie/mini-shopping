export default {
  pages: [
    'pages/index/index',
    'pages/details/index',
    'pages/order/orderDetails/index',
    'pages/order/orderConfirm/index',
    'pages/cart/index',
    'pages/address/details/index',
    'pages/address/index',
    'pages/order/index',
    'pages/mine/index',
    'pages/proManage/setting/index',
    'pages/proManage/index',
    'pages/category/index',
    'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '手表商城',
    navigationBarTextStyle: 'black',
  },

  tabBar: {
    // custom: true,
    color: '#7b7b7a',
    selectedColor: '#6190e8',
    backgroundColor: '#222222',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_active.png',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: 'assets/type.png',
        selectedIconPath: 'assets/type_active.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/shoppingbag.png',
        selectedIconPath: 'assets/shoppingbag_active.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/mine.png',
        selectedIconPath: 'assets/mine_active.png',
      },
    ],
  },
  cloud: true,
  networkTimeout: {
    request: 6000,
    connectSocket: 10000,
    uploadFile: 10000,
    downloadFile: 10000,
  },
}
