import React from 'react';
import PropTypes from 'prop-types';
import KZUIComponent from 'packages/kzui/src/components/base/component.tsx';
import classNames from 'classnames';

/**
 * 普通的 content inner
 */

class MainContentInnner extends KZUIComponent {
    render() {
        const className = classNames(this.props.className)
        return (
            <div
                style={{
                    padding: '30px',
                    maxWidth: this.props.isMaxWidth && '1004px'
                }}
                className={className}
            >
                {this.props.children}
            </div>
        );
    }
}

// 高阶函数
export function mainContentInnnerHoc(com, props = {}) {
    return () => (
        <MainContentInnner {...props}>
            {com()}
        </MainContentInnner>
    )
}

MainContentInnner.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isMaxWidth: PropTypes.bool
};

MainContentInnner.defaultProps = {
    children: null,
    className: undefined,
    isMaxWidth: false
};

export default MainContentInnner;
