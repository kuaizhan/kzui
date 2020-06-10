import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { DimensionType } from '../../../types/base';
import './style.less';

interface PopTipProps {
  dimensions?: DimensionType,
  isPopover?: boolean
  tip: string | React.ReactNode // 提示内容
  trigger?: 'click' | 'hover'
  placement?: 'left' | 'right' | 'top' | 'bottom'
  theme?: 'light' | 'dark'
  tipStyle?: React.CSSProperties,
  onVisible?: () => void  // 内部控制显隐的显示后的回调
  visible?: boolean // 用于手动控制气泡显隐
  onVisibleChange?: (visible: boolean) => void // 用于手动控制气泡显隐
}

class PopTip extends KZUIComponent<PopTipProps, {
  popVisible: boolean
}> {
    poptip: HTMLElement;

    static defaultProps = {
        ...baseDefaultProps,
        dimensions: {},
        children: null,
        className: '',
        style: {},
        isPopover: false,
        trigger: 'hover',
        placement: 'bottom',
        theme: 'dark',
        onVisible: () => null,
        tipStyle: {},
    };

    
    constructor(props) {
      super(props)
      this.autoBind(
        'handleBlur',
        'handleClick',
        'handleMouseOver',
        'handleMouseOut',
      );
      this.state = {
        popVisible: this.props.visible || false
      }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleBlur, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleBlur, false);
    }



    handleBlur(e) {
      if (this.props.trigger !== 'click') {
        return;
      }

      if (this.poptip.contains(e.target)) {
        return;
      }

      if (typeof this.props.visible !== 'undefined') {
        this.props.onVisibleChange(false)
        return
      }

      this.setState({
        popVisible: false,
      });
    }

    handleMouseOver() {
        if (this.props.trigger !== 'hover') return;
        if (typeof this.props.visible !== 'undefined') {
          this.props.onVisibleChange(!this.props.visible)
          return
        }
        this.setState({
          popVisible: true,
        });
    }

    handleMouseOut() {
        if (this.props.trigger !== 'hover') return;
        if (typeof this.props.visible !== 'undefined') {
          this.props.onVisibleChange(false)
          return
        }
        this.setState({
          popVisible: false,
        });
    }

    handleClick() {
        if (this.props.trigger !== 'click') return;
        if (typeof this.props.visible !== 'undefined') {
          this.props.onVisibleChange(!this.props.visible)
          return
        }
        this.setState({
          popVisible: !this.state.popVisible,
        }, () => {
          this.props.onVisible?.()
        });
    }
    render() {
        const clsPrefix = 'kui-poptip'
        const {
            className,
            style,
            children,
            tip,
            placement,
            theme,
            trigger,
            tipStyle,
            isPopover,
            visible
            // renderChildren
        } = this.props;
        const isManualShow = typeof visible !== 'undefined'
        const { popVisible } = this.state
        const cls = classNames(clsPrefix, className,
          `${clsPrefix}--${trigger}`, 
          `${clsPrefix}--${theme}`, {
          [`${clsPrefix}__popover`]: isPopover,
          [`${clsPrefix}--visible`]: isManualShow ? visible : popVisible
        });
        const triggerCls = classNames(`${clsPrefix}__trigger--${placement}`, `${clsPrefix}__trigger`)
        const tipCls = classNames(`${clsPrefix}__tip--${placement}`, `${clsPrefix}__tip`)

        return (
          <div
            className={cls}
            style={style}
            ref={this.storeRef('poptip')}
          >
            <div
              className={triggerCls}
              onClick={this.handleClick}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
            >
              {children}
            </div>
            <div className={tipCls} style={tipStyle}>
              {tip}
            </div>
          </div>
        );
    }
}

export default PopTip;
