import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { KZUIComponent, Icon } from 'packages/kzui/src';

class HeaderPulldown extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind('pushRef');
        this.itemDoms = [];
    }

    pushRef(dom) {
        this.itemDoms.push(dom);
    }
    // 计算条目子级菜单的定位位置
    computeSubDomsPt() {
        this.itemDoms.forEach((itemDom) => {
            if (itemDom) {
                const itemSubContentDom = itemDom.querySelector('.pulldown-content');
                if (itemSubContentDom) {
                    const itemSubTriangleDom = itemDom.querySelector('.pulldown-triangle');
                    const itemDomHeight = parseFloat(itemDom.getBoundingClientRect().height);
                    // 子级菜单相对视口左上角的top距离
                    const subDomTop = parseFloat(itemSubContentDom.getBoundingClientRect().top);
                    // 子级菜单定位，bottom位置
                    const subDomPtBottom =
                        parseFloat(window.getComputedStyle(itemSubContentDom).bottom.slice(0, -2));
                    if (subDomTop < 0) {
                        // 设置定位，bottom位置
                        itemSubContentDom.style.bottom = `${subDomTop + subDomPtBottom}px`;
                        // 设置子级菜单左侧三角icon的位置
                        itemSubTriangleDom.style.bottom =
                            `${((itemDomHeight / 2) - (subDomTop + subDomPtBottom) - 6)}px`;
                        return;
                    }
                    // 设置子级菜单左侧三角icon的位置
                    itemSubTriangleDom.style.bottom =
                        `${((itemDomHeight / 2) - subDomPtBottom) - 6}px`;
                }
            }
        });
    }
    componentDidMount() {
        this.computeSubDomsPt();
    }
    componentDidUpdate() {
        this.computeSubDomsPt();
    }
    // 渲染一级菜单
    renderFirstLevelMenu() {
        const { list } = this.props;
        return this.renderPullDownList(list);
    }
    // 渲染二级菜单
    renderTwoLevelMenu() {
        const { list } = this.props;
        const twoLevelList = [];
        if (Array.isArray(list) && list.length > 0) {
            twoLevelList.push(this.renderPullDownList(list));
        }
        return (
            <div className="pulldown-wrapper">
                {
                    twoLevelList.map((listComp, index) => (
                        cloneElement(listComp, { key: index })
                    ))
                }
            </div>
        );
    }
    // 渲染下拉列表
    renderPullDownList(list) {
        const { curPage } = this.props;
        if (Array.isArray(list) && list.length > 0) {
            const listContent = list.map((item, index) => {
                const listCls = classNames({
                    'pulldown-item': true,
                    [`${item.classNames}`]: !!item.classNames,
                });
                return (
                    <li
                        className={item.text === curPage ? `${listCls} cur` : listCls}
                        key={index}
                        ref={this.pushRef}
                    >
                        <a className="item-link" href={item.link}>
                            <div className="link-text-wrap">
                                <div className="link-text">{ item.text }</div>
                                {
                                    item.desc ? (
                                        <div className="link-desc">{ item.desc }</div>
                                    ) : null
                                }
                            </div>
                            {
                                item.iconClass ? (
                                    <i className={`link-icon ${item.iconClass}`} />
                                ) : null
                            }
                        </a>
                        {
                            // 相应条目，存在子级菜单
                            item.subList && item.subList.length ? (
                                <div className="pulldown-content">
                                    <div className="pulldown-triangle" />
                                    {
                                        item.subList ? this.renderPullDownList(item.subList) : null
                                    }
                                </div>
                            ) : null
                        }
                    </li>
                );
            });
            return (
                <ul className="pulldown-list">
                    { listContent }
                </ul>
            );
        }
        return null;
    }
    renderList() {
        const { type } = this.props;
        if (type === 'sub') {
            // 渲染二级导航
            return this.renderTwoLevelMenu();
        }
        // 渲染一级导航
        return this.renderFirstLevelMenu();
    }
    render() {
        const { type, curPage } = this.props;
        const contentClassName = type === 'sub' ? 'pulldown-content sub' : 'pulldown-content';

        return (
            <div
                className="header-pulldown"
                ref={this.storeRef('pulldown')}
            >
                <div
                    role="button"
                    tabIndex={0}
                    className="pulldown-btn"
                    onClick={this.handleClickBtn}
                >
                    {curPage}
                    <Icon className="pulldown-arrow" iconClass="kz-e-nav-pull-down" />
                </div>
                <div
                    className={contentClassName}
                >
                    <div className="pulldown-triangle" />
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default HeaderPulldown;
