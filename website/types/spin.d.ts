import * as React from 'react'
import { KZUIComponent, UiSizeType } from './base/index'

interface SpinProps extends KZUIComponent {
  size?: UiSizeType //尺寸,
  tip?: string //提示文本,
  spinning?: boolean //是否为加载状态
}

export declare class Spin extends React.Component<SpinProps> {}
