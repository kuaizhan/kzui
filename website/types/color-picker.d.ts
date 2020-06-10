import * as React from 'react'
import { DimensionType } from '../types/base/index'
import { KZUIComponent } from './base/index'

interface ColorPickerProps extends KZUIComponent {
  dimensions?: DimensionType //坐标尺寸,
  hide?: boolean //是否隐藏,
  hex?: string //初始色值,
  a?: number //初始透明度,
  recommendColors?: Array<string> //推荐颜色,
  recommendThemeColors?: Array<string> // 推荐主题色,
  recentColors?: Array<string> //最近使用色,
  type?: 'simple' | 'full'  //拾色器类型
  onChange?: (hex: string, a: number) => void  // 颜色改变
  onBlur?: () => void // 失去焦点	
}

export declare class ColorPicker extends React.Component<ColorPickerProps> {}
