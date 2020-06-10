import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import TabBar from './TabBar';
import TabPanels from './TabPanels';
import './style.less';

interface TabProps {
  tabTitles?: string[] //标题列表,
  curIndex?: number //选中tab序号,
  tabBarStyle?: React.CSSProperties //tab样式
  tabPanelStyle?: React.CSSProperties //tab样式
  onChange: (tabIndex: number) => void
  defaultIndex?: number // 默认选中的tab序号
  type?: 'normal' | 'card'
}

class Tab extends KZUIComponent<TabProps> {
    static Cache: typeof Cache;

    static defaultProps = {
      ...baseDefaultProps,
      curIndex: 0,
      tabTitles: [],
      onChange: null,
      tabBarStyle: {},
      tabPanelStyle: {},
      defaultIndex: 0,
      type: 'normal',
    }

    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }

    handleChange(tabIndex) {
        if (tabIndex === this.props.curIndex) {
            return;
        }
        if (this.props.onChange) {
            this.props.onChange(tabIndex);
        }
    }

    render() {
        const clsPrefix = 'kui-tab';
        const {
            className,
            style,
            tabTitles,
            curIndex,
            children,
            tabBarStyle,
            tabPanelStyle,
            defaultIndex,
            type,
        } = this.props;
        const cls = classNames(clsPrefix, className);
        return (
            <div className={cls} style={style}>
                <TabBar
                    tabTitles={tabTitles}
                    curIndex={curIndex}
                    onChange={this.handleChange}
                    tabBarStyle={tabBarStyle}
                    type={type}
                />
                <TabPanels
                    curIndex={curIndex}
                    style={tabPanelStyle}
                    defaultIndex={defaultIndex}
                    type={type}
                >
                    {children}
                </TabPanels>
            </div>
        );
    }
}

class Cache extends Tab {
    render() {
        const clsPrefix = 'kui-tab';
        const {
            className,
            style,
            tabTitles,
            curIndex,
            children,
            tabBarStyle,
            tabPanelStyle,
            defaultIndex,
            type,
        } = this.props;
        const cls = classNames(clsPrefix, className);
        return (
            <div className={cls} style={style}>
                <TabBar
                    tabTitles={tabTitles}
                    curIndex={curIndex}
                    onChange={this.handleChange}
                    tabBarStyle={tabBarStyle}
                    type={type}
                />
                <TabPanels.Cache
                    curIndex={curIndex}
                    style={tabPanelStyle}
                    defaultIndex={defaultIndex}
                    type={type}
                >
                    {children}
                </TabPanels.Cache>
            </div>
        );
    }
}

Tab.Cache = Cache;

export default Tab;
