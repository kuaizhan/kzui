import React from 'react';
import PropTypes from 'prop-types';
import { KZUIComponent } from 'packages/kzui/src';
import './style.less';

class SideLayout extends KZUIComponent {
    render() {
        const className = this.classname('side-layout');
        return (
            <div className={`${className}-container`}>
                <div className={className}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

SideLayout.propTypes = {
    children: PropTypes.node,
};

SideLayout.defaultProps = {
    children: null,
};

export default SideLayout;
