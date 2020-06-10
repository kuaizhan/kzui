import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Overlay from '../overlay/index';
import Portal from '../portal/index';
import './style.less';
import { outerWidth, outerHeight, css } from '../../utils';

export interface DialogProps {
  hide?: boolean //是否隐藏,
  actions?: Array<React.ReactNode | React.ReactElement> //传入下方操作按钮,
  title?: string  | React.ReactNode //对话框标题,
  portal?: boolean //是否使用react16 portal
  onClose?: () => void // 关闭回调
  center?: boolean
  destoryOnClose?: boolean
  bodyStyle?: React.CSSProperties
  position?: 'bottom' | 'top'
  onClickOverLay?: () => void
}

class Dialog extends KZUIComponent<DialogProps> {
    topGutter: number;
    headerHeight: number;
    footerHeight: number;
    content: any;
    body: any;
    wrp: any;


    static defaultProps = {
      ...baseDefaultProps,
      hide: false,
      actions: [],
      title: '',
      onClose: () => {},
      portal: false,
      center: false,
      style: {},
      destoryOnClose: false,
      bodyStyle: {},
      onClickOverLay: () => {}
    }

    constructor(props) {
        super(props);
        this.topGutter = 8;
        this.headerHeight = props.title ? 50 : 0;
        this.footerHeight = props.actions.length > 0 ? 72 : 0;
        this.autoBind('resize');
    }
    componentDidUpdate() {
        this.headerHeight = this.props.title ? 50 : 0;
        this.footerHeight = this.props.actions.length > 0 ? 72 : 0;
        this.resize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize() {
        if (this.props.hide) return;

        const content = this.content;
        const body = this.body;
        const wrp = this.wrp;
        const extraHeight = this.headerHeight + this.footerHeight;
        const contentHeight = content.scrollHeight;
        const maxDialogHeight = window.innerHeight - (this.topGutter * 2);
        const maxBodyHeight = maxDialogHeight - extraHeight;
        const bodyHeight = Math.min(maxBodyHeight, contentHeight);
        const wrpHeight = (bodyHeight + extraHeight) + 2; // 有2px的border
        // const wrpTop = outerHeight(wrp, 'height');
        // const wrpLeft = outerWidth(wrp, 'width');
        // const topoffset = 0 - (parseFloat(wrpTop) / 2);
        // const leftoffset = 0 - (parseFloat(wrpLeft) / 2);

        css(content, {
            height: bodyHeight,
        });

        css(body, {
            height: `calc(100% - ${extraHeight}px)`,
        });

        css(wrp, {
            height: wrpHeight,
            visibility: 'visible',
        });
    }

    render() {
        const clsPrefix = 'kui-dialog';
        const {
            className,
            style,
            position,
            children,
            portal,
            hide,
            destoryOnClose,
            title,
            actions,
            onClose,
            center,
            bodyStyle
        } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-${position}`]: !!position,
        }, className);
        const centerStyle = center ? {
            top: '50%',
            transform: 'translate(-50%, -50%)'
        } : {}
        const dialogStyle = {
            ...centerStyle,
            ...style,
        };

        if (destoryOnClose && hide) {
            return null;
        }

        const JSX = (
            <Overlay
                hide={hide}
                onClick={this.props.onClickOverLay}
            >
                <div ref={this.storeRef('wrp')} style={dialogStyle} className={cls}>
                    {
                        title ?
                            <div className={`${clsPrefix}-header`}>
                                {title}
                                <i
                                    className="kz-e-close-4"
                                    onClick={onClose}
                                    role="button"
                                    tabIndex={0}
                                />
                            </div> : null
                    }
                    <div
                        className={`${clsPrefix}-body`}
                        style={bodyStyle}
                        ref={this.storeRef('body')}
                    >
                        <div
                            ref={this.storeRef('content')}
                        >
                            { children }
                        </div>
                    </div>
                    {
                        actions.length > 0 ?
                            <div className={`${clsPrefix}-footer`}>
                                <div className={`${clsPrefix}-footer-buttons`}>
                                    {actions}
                                </div>
                            </div> : null
                    }
                </div>
            </Overlay>
        );
        if (portal) {
            return (
                <Portal>
                    {JSX}
                </Portal>
            );
        }
        return JSX;
    }
}

export default Dialog;
