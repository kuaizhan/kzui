import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';

/**
 * TODO: our cache tab has bug
<Tab
    curIndex={curTab}
    onChange={handleChangeTab}
    tabTitles={tabTitles}
>
        <CreateQrcode
        onCreateSuccess={() => {
            setCurTab(1)
        }} 
        itemId={itemId}     // when itemId change, children will not re-render
    />
    <QrcodeList onEdit={handleEdit} />
</Tab>
*/

interface TabPanelsProps {
  curIndex: number,
  style: React.CSSProperties,
  className: string,
  children: React.ReactNode | React.ReactNode[],
  defaultIndex: number,
  type?: 'normal' | 'card'
}

class Cache extends KZUIComponent<Partial<TabPanelsProps>, {
  renderChildren: React.ReactNode[]
}> {
    constructor(props) {
        super(props);
        this.state = {
            renderChildren: this.initialChildren,
        }
    }

    get initialChildren() {
        const {
            defaultIndex,
            children,
        } = this.props;
        const initialChildren = [];
        initialChildren[defaultIndex] = Array.isArray(children) ? children[defaultIndex] : children;
        return initialChildren;
    }


    static getDerivedStateFromProps(props, state) {
        const {
            curIndex,
            defaultIndex,
            children,
        } = props;
        const { renderChildren } = state;
        if (curIndex !== defaultIndex) {
            const newChildren = [...renderChildren]
            newChildren[curIndex] = children[curIndex];
            return {
                renderChildren: newChildren
            }
        }
        return null
    }

    render() {
        const {
            className,
            style,
            curIndex,
            type
        } = this.props;

        const clsPrefix = 'kui-tab';
        const cls = classNames(`${clsPrefix}-panels`, className, {
          [`${clsPrefix}-panels--card`] : type === 'card'
        });

        const { renderChildren } = this.state;
        return (
            <div className={cls} style={style}>
                {
                    renderChildren.map((child, index) => (
                        <div
                            key={index}
                            className={curIndex === index ? `${clsPrefix}-content ${clsPrefix}-cur` : `${clsPrefix}-content`}
                        >
                            {child}
                        </div>
                    ))
                }
            </div>
        );
    };
};

class TabPanels extends KZUIComponent<Partial<TabPanelsProps>> {
    static Cache: typeof Cache;

    static defaultProps = {
      ...baseDefaultProps,
      curIndex: 0,
      style: {},
      className: '',
      defaultIndex: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            renderChildren: this.initialChildren,
        }
    }

    get initialChildren() {
        const {
            defaultIndex,
            children,
        } = this.props;
        const initialChildren = [];
        initialChildren[defaultIndex] = Array.isArray(children) ? children[defaultIndex] : children;
        return initialChildren;
    }
    

    render() {
        const {
            className,
            style,
            curIndex,
            type,
            children
        } = this.props;

        const clsPrefix = 'kui-tab';
        const cls = classNames(`${clsPrefix}-panels`, className, {
          [`${clsPrefix}-panels--card`] : type === 'card'
        });

        return (
            <div className={cls} style={style}>
                {
                    Array.isArray(children) ? children.map((child, index) => (
                        <div
                            key={index}
                            className={curIndex === index ? `${clsPrefix}-content ${clsPrefix}-cur` : `${clsPrefix}-content`}
                        >
                            {child}
                        </div>
                    )) : (
                      <div className={`${clsPrefix}-content ${clsPrefix}-cur`}>{children}</div>
                    )
                }
            </div>
        );
    };
};

TabPanels.Cache = Cache;

export default TabPanels;
