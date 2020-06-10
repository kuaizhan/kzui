import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';

interface SwitchProps {
  disabled: boolean,
  name: string,
  on: boolean,
  onChange: (props: { on?: boolean, name?: string }) => void,
}

class Switch extends KZUIComponent<Partial<SwitchProps>, {
  on?: boolean
}> {
    static defaultProps = {
        ...baseDefaultProps,
        disabled: false,
        name: '',
        on: false,
        onChange: () => null,
    }

    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }
    initStateFromProps(props) {
        return {
            on: props.on,
        };
    }

    handleClick() {
        const on = !this.state.on;
        this.setState({
            on,
        });
        if (this.props.onChange) {
            this.props.onChange({
                on,
                name: this.props.name,
            });
        }
    }

    render() {
        const clsPrefix = 'kui-switch';
        const { className, style, disabled, children } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-checked`]: this.state.on,
            [`${clsPrefix}-disabled`]: disabled,
        }, className);

        return (
            <div
                className={cls}
                style={style}
            >
                <span className={`${clsPrefix}-label`}>{children}</span>
                <span className={`${clsPrefix}-indicator`} onClick={this.handleClick} role="button" tabIndex={0} />
            </div>
        );
    }
}

export default Switch;
