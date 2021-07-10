import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import { CoverView, CoverImage } from '@tarojs/components';
import './index.scss'
import homeIco from 'assets/home.png'
import homeActiveIco from 'assets/home_active.png'
import shoppingIco from 'assets/shoppingbag.png'
import shoppingActiveIco from 'assets/shoppingbag_active.png'
import mineIco from 'assets/mine.png'
import mineActiveIco from 'assets/mine_active.png'
const list = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconPath: homeIco,
    selectedIconPath: homeActiveIco
  },
  {
    pagePath: '/pages/cart/index',
    text: '购物车',
    iconPath: shoppingIco,
    selectedIconPath: shoppingActiveIco
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath: mineIco ,
    selectedIconPath: mineActiveIco
  }

];

class CustomTabBar extends Component<{selected:number}> {
  state = {
    selected: -1  
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
              className={`tabBarItem ${isSelected ? 'actived' :''} `}
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
