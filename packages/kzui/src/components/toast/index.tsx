import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';

interface ToastProps {
  hide?: boolean
  onHide?: () => void
}

class Toast extends KZUIComponent<ToastProps, {
  timer: any,
  hide: boolean,
  visible: boolean
}> {
    static defaultProps = {
      ...baseDefaultProps,
      hide: true,
      onHide: null,
    }
    constructor(props) {
        super(props);
        this.autoBind(
            'handleHide',
        );
        this.state = {
            visible: false,
            hide: true,
            timer: null,
        };
    }

    componentWillReceiveProps(props) {
        if (props.hide === false) {
            clearTimeout(this.state.timer);
            this.setState({
                hide: false,
                visible: true,
                timer: setTimeout(() => {
                    this.setState({
                        hide: true,
                    }, () => {
                        if (this.props.onHide) {
                            this.props.onHide();
                        }
                    });
                }, 2000),
            });
        }
    }
    shouldComponentUpdate(nextProps) {
        return this.props.hide !== nextProps.hide;
    }

    render() {
        const clsPrefix = 'kui-toast';
        const { className, style, hide, children } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-hide`]: hide,
            [`${clsPrefix}-visible`]: this.state.visible,
        }, className);
        return (
            <div className={cls} style={style}>
                <span className={`${clsPrefix}-warning-icon kz-e-warning`} />
                <span className={`${clsPrefix}-warning-content`}>{children}</span>
            </div>
        );
    }
}

export default Toast;
