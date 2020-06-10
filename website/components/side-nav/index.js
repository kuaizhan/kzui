import React from 'react';
import PropTypes from 'prop-types';
import { KZUIComponent, ScrollContainer } from '@kzui/core';
import { Link } from 'react-router-dom';
import './style.less';

const SideNavSection = ({ items, title, noDivider, cur }) => (
    <section className="side-nav-section">
        {noDivider ? null : <div className="side-section-divider" />}
        <h1>{title}</h1>
        <ScrollContainer
            className="nav"
        >
            {items.map((item, key) => {
                if (item.linkType === 'Link') {
                    return (
                        <Link
                            key={`${key}`}
                            className={(item.cur || item.name === cur) ? 'cur' : ''}
                            to={item.href}
                        >{item.text}</Link>
                    );
                }
                return (
                    <a
                        key={`${key}`}
                        className={(item.cur || item.name === cur) ? 'cur' : ''}
                        href={item.href}
                    >{item.text}</a>
                );
            })}
        </ScrollContainer>
    </section>
);

SideNavSection.defaultProps = {
    noDivider: false,
    cur: '',
};

SideNavSection.propTypes = {
    noDivider: PropTypes.bool,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    cur: PropTypes.string,
};


class SideNav extends KZUIComponent {
    render() {
        const className = this.classname('side-navigation');
        const { headerContent, footerContent, sections, cur } = this.props;

        const innerCur = cur || window.location.pathname.slice(1);

        return (
            <div
                className={className}
            >
                <div
                    ref={this.storeRef('navContainer')}
                    className="side-container"
                >
                    <header className="side-header">{headerContent}</header>
                    {sections.map((section, key) => (
                        <SideNavSection
                            key={`${key}`}
                            title={section.title}
                            items={section.items}
                            noDivider={!headerContent}
                            cur={innerCur}
                        />
                    ))}
                    <footer className="side-footer">{footerContent}</footer>
                </div>
            </div>
        );
    }
}

SideNav.propTypes = {
    headerContent: PropTypes.node,
    sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.any),
    })),
    footerContent: PropTypes.node,
    cur: PropTypes.string,
};

SideNav.defaultProps = {
    headerContent: null,
    sections: [],
    footerContent: null,
    cur: '',
};

export default SideNav;
