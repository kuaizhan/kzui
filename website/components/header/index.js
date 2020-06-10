import React from 'react';
import PropTypes from 'prop-types';
import { KZUIComponent, Icon } from 'packages/kzui/src';
import HeaderPulldown from './header-pulldown';
import Logo from '../logo/index';
import './style.less';

const HeaderBreadCrumb = props => (
    <div className="header-crumb">
        {
            props.list.map(item => (
                <div key={item.name} className="header-crumb-item">
                    <a href={item.link}>{item.text}</a>
                </div>
            ))
        }
    </div>
);

HeaderBreadCrumb.defaultProps = {
    list: [],
};

HeaderBreadCrumb.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
};

const HeaderHelp = ({ link }) => (
    <div className="header-cell header-help">
        <a target="_blank" href={link}>
            <Icon iconClass="kz-e-question-new" />
        </a>
    </div>
);

HeaderHelp.defaultProps = {
    link: 'https://wiki.kuaizhan.com',
};

HeaderHelp.propTypes = {
    link: PropTypes.string,
};

class Header extends KZUIComponent {
    render() {
        const classname = this.classname('header-new');
        return (
            <div className={classname}>
                <div className="header-container">
                    <div className="header-left">
                        <Logo href="/" newLogo />
                    </div>
                    <div className="header-center">
                        {this.props.curPage ?
                            <HeaderPulldown
                                list={this.props.pages}
                                curPage={this.props.curPage}
                            /> :
                            null
                        }
                        {
                            this.props.subPages.length > 0 ?
                                <HeaderPulldown
                                    list={this.props.subPages}
                                    curPage={this.props.curSubPage}
                                    type="sub"
                                />
                                : ''
                        }
                    </div>
                    <div className="header-right">
                        <HeaderBreadCrumb list={this.props.crumbData} />
                    </div>
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    crumbData: [],
    subPages: [],
    curSubPage: '',
};

Header.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    subPages: PropTypes.arrayOf(PropTypes.any),
    crumbData: PropTypes.arrayOf(PropTypes.object).isRequired,
    curPage: PropTypes.string.isRequired,
    curSubPage: PropTypes.string,
};

export default Header;
