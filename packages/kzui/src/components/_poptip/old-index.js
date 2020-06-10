import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import { dimensionType } from '../base/types';
import './style.less';

class PopTip extends KZUIComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { isTip } = this.props;
        const clsPrefix = isTip ? 'kui-poptip' : 'kui-popover';
        const { className, style, children, hide, placement } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-hide`]: hide,
        }, className, `${clsPrefix}--${placement}`);

        return (
            <div
                className={cls}
                style={style}
                ref={this.storeRef('poptip')}
            >
                {children}
            </div>
        );
    }
}

PopTip.defaultProps = {
    dimensions: {},
    children: null,
    className: '',
    style: null,
    isTip: true,
    placement: 'bottom',
};

PopTip.propTypes = {
    dimensions: dimensionType,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    isTip: PropTypes.bool,
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};
export default PopTip;
