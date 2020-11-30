import * as React from 'react';
import { useState } from 'react'
import classNames from 'classnames';
import './style.less';

interface SwitchProps {
  disabled?: boolean,
  name?: string,
  on?: boolean,
  control?: boolean,
  className?: string,
  style?: React.CSSProperties,
  onChange?: (props: { on?: boolean, name?: string }) => void,
}

const Switch: React.FC<SwitchProps> = ({
    disabled,
    name,
    on,
    control,
    onChange = () => null,
    className,
    style,
    children,
}) => {

    const _control =  typeof control === 'boolean'? control : (typeof on !== 'undefined')

    const [stateValue, setStateValue] = useState(on)

    function handleChange () {
        if (disabled) {
            return;
        }

        if (_control) {
            onChange({on: !on, name})
        } else {
            setStateValue(state => {
                onChange({on: !state, name});
                return !state
            })
        }
    }

    const realValue = _control? on : stateValue

    const clsPrefix = 'kui-switch';
    const cls = classNames(clsPrefix, {
        [`${clsPrefix}-checked`]: realValue,
        [`${clsPrefix}-disabled`]: disabled,
    }, className);

    return (
        <div
            className={cls}
            style={style}
        >
            <span className={`${clsPrefix}-label`}>{children}</span>
            <span className={`${clsPrefix}-indicator`} onClick={handleChange} role="button" tabIndex={0} />
        </div>
    );
}

export default Switch;
