import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class TabProps extends KZUIComponent {
  tabTitles?: string[] //标题列表,
  curIndex?: number //选中tab序号,
  tabBarStyle?: React.CSSProperties //tabBarItem样式
  tabPanelStyle?: React.CSSProperties //tabPanel样式
  onChange: (tabIndex: number) => void
  defaultIndex?: number // 默认选中的tab序号
  type?: 'normal' | 'card'
}

export declare class TabBarProps extends KZUIComponent {
  tabTitles?: string[] //标题列表,
  curIndex?: number //选中tab序号,
  onChange: (tabIndex: number) => void
  type?: 'normal' | 'card'
  tabBarStyle: React.CSSProperties
}

export declare class Tab extends React.Component<TabProps> {
  static Cache: any
}
export declare class TabBar extends React.Component<TabBarProps> {}
