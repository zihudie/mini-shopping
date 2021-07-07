import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import { CoverView, CoverImage } from '@tarojs/components';
import './index.scss';

const list = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconPath: 'assets/home.png',
    selectedIconPath: 'assets/home_active.png'
  },
  {
    pagePath: '/pages/cart/index',
    text: '购物车',
    iconPath: 'assets/shoppingbag.png',
    selectedIconPath: 'assets/shoppingbag_active.png'
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath: 'assets/mine.png',
    selectedIconPath: 'assets/mine_active.png'
  }

];

class CustomTabBar extends Component<{selected:number}> {
  state = {
    // 建立一个全局变量储存selectedIndex
    // 创建方法可以按照自己的方法或taro提供的示例
    // 当然没有这个全局变量也可以解决问题
    selected: -1 //global.globalData.selectedIndex,
  };

  switchTab = (item, index) => {
    const url = item.pagePath;
    // global.globalData.selectedIndex = index;
    this.setState({ selected: index });
    Taro.switchTab({ url });
  };

  shouldComponentUpdate = (_nextProps, nextState) => {
    return this.state.selected !== nextState.selected;
  };

  render() {
    const { selected } = this.props
    return (
      <CoverView className= 'tabBar'>
        <CoverView className='tabBarBorder'/>
        {list.map((item, index) => {
          const isSelected = selected === index;
          return (
            <CoverView
              className="tabBarItem"
              onClick={() => this.switchTab(item, index)}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage src={isSelected ? item.selectedIconPath : item.iconPath} />
              <CoverView
                style={{
                  color: isSelected ? 'rgba(0, 162, 0, 1)' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}

export default CustomTabBar;
