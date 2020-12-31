import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { getStyle, position, css } from '../../utils';

interface TabBarProps {
  tabTitles?: string[] //标题列表,
  curIndex?: number //选中tab序号,
  onChange: (tabIndex: number) => void
  type?: 'normal' | 'card'
  tabBarStyle: React.CSSProperties
}

class TabBar extends KZUIComponent<TabBarProps> {
    slider: HTMLElement;

    static defaultProps = {
      ...baseDefaultProps,
      curIndex: 0,
      onChange: null,
      tabTitles: [],
      tabBarStyle: {},
      type: 'normal'
    }  

    constructor(props) {
        super(props);
        this.autoBind('handleClick', 'animateSlider');
    }

    componentDidMount() {
        if (this.props.type === 'normal') {
            this.animateSlider();
        }
    }

    componentDidUpdate() {
        if (this.props.type === 'normal') {
            this.animateSlider();
        }
    }

    animateSlider() {
        const { curIndex } = this.props;
        const liDom = this[`tab${curIndex}`];
        const slider = this.slider;
        const width = parseInt(getStyle(liDom, 'width'), 10);
        const offset = parseInt(position(liDom).left, 10);

        css(slider, {
            width: `${width}px`,
            transform: `translate3d(${offset}px, 0, 0)`,
        });

        css(slider, {
            display: 'block',
        });
    }

    handleClick(index) {
        if (this.props.onChange) {
            this.props.onChange(index);
        }
    }

    render() {
        const clsPrefix = 'kui-tab';
        const { className, tabTitles, curIndex, tabBarStyle, type } = this.props;
        const cls = classNames(`${clsPrefix}-bar`, className, {
            [`${clsPrefix}-bar--card`] : type === 'card'
        });

        return (
            <ul className={cls}>
                { type === 'normal' && <li ref={this.storeRef('slider')} className={`${clsPrefix}-slider`} /> }
                {tabTitles.map(
                    (text, index) => (
                        <li
                            ref={this.storeRef(`tab${index}`)}
                            key={index}
                            role="presentation"
                            onClick={() => { this.handleClick(index); }}
                            style={tabBarStyle}
                            className={curIndex === index ? `${clsPrefix}-bar-item ${clsPrefix}-cur` : `${clsPrefix}-bar-item`}
                        >
                            <a>{text}</a>
                        </li>
                    ),
                )}
            </ul>
        );
    }
}

export default TabBar;
