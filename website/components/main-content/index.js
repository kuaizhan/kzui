import React from 'react';
import PropTypes from 'prop-types';
import KZUIComponent from 'packages/kzui/src/components/base/component.tsx';
import './style.less';

class MainContent extends KZUIComponent {
    render() {
        const className = this.classname('main-content-new');
        const { isBackgroundTransparent } = this.props;

        let style = this.props.style
        const transparentStyle = {
            background: 'transparent'
        }
        if (isBackgroundTransparent) {
            style = {
                ...transparentStyle,
                ...style
            }
        }

        let mainCardStyle = this.props.mainCardStyle
        const mainCardTransparentStyle = {
            background: 'transparent',
            boxShadow: 'none'
        }
        if (isBackgroundTransparent) {
            mainCardStyle = {
                ...transparentStyle,
                ...mainCardTransparentStyle
            }
        }

        return (
            <div className={className} style={style}>
                <div className="main-card" style={mainCardStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export function mainContentHoc(com, props = {}) {
    return ({ ...comProps }) => (
        <MainContent {...props}>
            {com(comProps)}
        </MainContent>
    )
}

MainContent.propTypes = {
    children: PropTypes.node,
    isBackgroundTransparent: PropTypes.bool,
    mainCardStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

MainContent.defaultProps = {
    children: null,
    mainCardStyle: {},
    style: {},
    isBackgroundTransparent: false // 背景为透明的模式
};

export default MainContent;
