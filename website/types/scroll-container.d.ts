import * as React from 'react';
import { KZUIComponent } from './base/index';

interface ScrollContainerProps extends KZUIComponent {
  xScroll?: boolean //x轴方向滚动,
  yScroll?: boolean //y轴方向滚动,
  scrollToBottom?: boolean //滚动条是否在底部,
  reserveSize?: number //触发滚动到顶或滚动到底距离多少像素触发事件
  onHitBottom?: () => void //滚动触底事件,
  onHitTop?: () => void //滚动触顶事件
}

export declare class ScrollContainer extends React.Component<ScrollContainerProps> {}