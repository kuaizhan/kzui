import * as React from 'react';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';

const emptyFunc = () => {};

interface ScrollContainerProps {
  xScroll?: boolean //x轴方向滚动,
  yScroll?: boolean //y轴方向滚动,
  scrollToBottom?: boolean //滚动条是否在底部,
  reserveSize?: number //触发滚动到顶或滚动到底距离多少像素触发事件
  onHitBottom?: () => void //滚动触底事件,
  onHitTop?: () => void //滚动触顶事件
  onClick?: () => void
}

class ScrollContainer extends KZUIComponent<ScrollContainerProps> {
  lastScrollTop: number;
  wrp: Element;

  static defaultProps = {
    ...baseDefaultProps,
    xScroll: false,
    yScroll: false,
    scrollToBottom: false,
    reserveSize: 10,
    onHitBottom: emptyFunc,
    onHitTop: emptyFunc,
    onClick: emptyFunc
  }

  constructor(props) {
        super(props);
        this.autoBind('handleScroll');
        this.lastScrollTop = 0;
    }

    componentDidMount() {
        const wrp = this.wrp;
        const { scrollToBottom } = this.props;
        const bottomHeight = wrp.scrollHeight - wrp.clientHeight;
        if (scrollToBottom) {
            wrp.scrollTop = bottomHeight;
            this.lastScrollTop = bottomHeight;
        }
    }

    handleScroll() {
        const wrp = this.wrp;
        const reserveSize = this.props.reserveSize;

        if (this.props.yScroll) {
            if (wrp.scrollTop > this.lastScrollTop) { // 向下滚动
                if (wrp.scrollHeight - wrp.clientHeight - wrp.scrollTop <= this.props.reserveSize) {
                    this.props.onHitBottom();
                }
            } else if (wrp.scrollTop <= reserveSize) {
                this.props.onHitTop();
            }
        }

        this.lastScrollTop = wrp.scrollTop;
    }

    render() {
        const classNames = this.classname('kui-scroll-container', {
            'x-scroll': this.props.xScroll,
            'y-scroll': this.props.yScroll,
        }, true);
        return (
            <div
                ref={this.storeRef('wrp')}
                className={classNames}
                onScroll={this.handleScroll}
                style={this.props.style}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        );
    }
}

export default ScrollContainer;
