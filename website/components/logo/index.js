import React from 'react';
import KZUIComponent from 'packages/kzui/src/components/base/component.tsx';
import PropTypes from 'prop-types';
import './style.less';

class Logo extends KZUIComponent {
    render() {
        const className = this.classname('logo');
        const logoClassName = this.props.newLogo ? 'logo-new' : 'logo';

        return (
            <a className={className} href={this.props.href}>
                <span className={logoClassName} />
            </a>
        );
    }
}

Logo.defaultProps = {
    newLogo: false,
};

Logo.propTypes = {
    newLogo: PropTypes.bool,
};

export default Logo;
