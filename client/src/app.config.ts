export default {
  pages: [
    'pages/index/index',
    'pages/cart/index',
    'pages/mine/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'Taro商城',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#7b7b7a',
    selectedColor: '#c0a369',
    backgroundColor: '#222222',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_active.png'
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/shoppingbag.png',
        selectedIconPath: 'assets/shoppingbag_active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/mine.png',
        selectedIconPath: 'assets/mine_active.png'
      }
    ]
  },
  cloud: true,
  networkTimeout: {
    request: 6000,
    connectSocket: 10000,
    uploadFile: 10000,
    downloadFile: 10000
  }
}
