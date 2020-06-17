import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent from '../base/component';
import './style.less';
import { UiSizeType } from '../../../types/base';

const clsPrefix = 'kui-spin';

interface SpinProps  {
  size?: UiSizeType //尺寸,
  tip?: string //提示文本,
  spinning?: boolean //是否为加载状态
}

const SpinIcon: React.FC<{ className?: string }> = ({
  className = ''
}) => (
    <div className={`${clsPrefix}-icon ${className}`}>
        <i />
    </div>
);

class Spin extends KZUIComponent<SpinProps> {
    render() {
        const { spinning, size, tip, className, style, children } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-spinning`]: spinning,
            [`${clsPrefix}-nested`]: !!children,
            [`${clsPrefix}-${size}`]: true,
        }, className);

        return (
            <div className={cls} style={style} >
                {
                    spinning ?
                        <div
                            className={`${clsPrefix}-spinning-container`}
                            style={style}
                        >
                            <div className={`${clsPrefix}-note`}>
                                <SpinIcon className={`${clsPrefix}-icon`} />
                                { tip === '' ? null : <span className={`${clsPrefix}-tip`}>{tip}</span> }
                            </div>
                        </div>
                    : null
                }
                <div className={`${clsPrefix}-container`}>
                    { children }
                </div>
            </div>
        );
    }
}

export default Spin;
