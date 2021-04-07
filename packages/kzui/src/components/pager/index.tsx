import * as React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Input from '../input/index';
import Icon from '../icon/index';
import './style.less';

export interface PagerProps {
    totalPage: number //总页数,
    curPage: number //当前页面，页面从 1 开始
    onPageChange?: (value: number) => void //页码改变事件
    size?: 'normal' | 'small'
}

interface PagerStates {
    curPage: number
}

interface PageButtonProps {
    cur: boolean
    num: number
    className: string,
    disabled: boolean,
    children: React.ReactNode,
    onClick: (props: Partial<PageButtonProps>) => void,
    size?: 'normal' | 'small'
}

const PAGE_PRE_LEVEL = 5;
const clsPrefix = 'kui-pager';

const PageButton: React.FC<Partial<PageButtonProps>> = (props = {
    cur: false,
    num: 1,
    className: '',
    disabled: false,
    children: null,
    onClick: () => null,
    size: 'normal'
}) => {
    const { cur, num, className, disabled } = props;
    const onClick = () => {
        if (!props.disabled) {
            props.onClick(props);
        }
    };

    if (num < 0) {
        return (
            <a className={`${clsPrefix}-page-button ${clsPrefix}-more`}>
                <Icon type="more" />
            </a>
        );
    }

    const text = props.children ? props.children : num;
    const cls = classNames(`${clsPrefix}-page-button`, {
        [`${clsPrefix}-cur`]: cur,
        [`${clsPrefix}-disabled`]: disabled,
    }, className);
    return <a className={cls} onClick={onClick} role="button" tabIndex={0}>{text}</a>;
};

const JumpPageButton:React.FC<{
    totalPage: number,
    onConfirm: (props: { num: number }) => void
}> = ({ totalPage, onConfirm }) => {
    const handleKeyPress = (e) => { 
        if (e.keyCode === 13) {
            const num = parseInt(e.target.value, 10);

            if (isNaN(num) || num > totalPage || num < 1) return;
            onConfirm({ num });
        }
    };
    return (
        <div className={`${clsPrefix}-jump-page-button`}>
            <span>前往</span>
            <Input
                onKeyPress={handleKeyPress}
                className={`${clsPrefix}-page-input`}
            />
            <span>页</span>
        </div>
    );
};

class Pager extends KZUIComponent<PagerProps, PagerStates> {
    static defaultProps = {
        ...baseDefaultProps,
        onPageChange: () => null
    }

    constructor(props) {
        super(props);
        this.autoBind('handleClick', 'handleInputConfirm', 'handlePageChange', 'getButtons');
    }
    initStateFromProps(props) {
        return {
            curPage: props.curPage,
        };
    }

    handlePageChange(num) {
        this.setState({ curPage: num }, () => {
            this.props.onPageChange?.(num);
        });
    }
    handleClick({ num }) {
        console.log(num, 'handle click')
        this.handlePageChange(num);
    }

    handleInputConfirm({ num }) {
        this.handlePageChange(num);
    }
    getButtons() {
        const { totalPage } = this.props;
        const { curPage } = this.state;

        const buttons = [];

        const half = Math.floor((PAGE_PRE_LEVEL - 1) / 2);
        const leftPartStart = (curPage - half) > 0 ? (curPage - half) : 1;

        if (leftPartStart > 1) {
            buttons.push(1);

            if (leftPartStart > 2) {
                buttons.push(-1);
            }
        }
        for (let i = leftPartStart; i < curPage; i += 1) {
            buttons.push(i);
        }

        const rightPartEnd = curPage + (PAGE_PRE_LEVEL - (curPage - leftPartStart) - 1);
        const lastOne = Math.min(rightPartEnd, totalPage);
        for (let i = curPage; i <= lastOne; i += 1) {
            buttons.push(i);
        }

        if (rightPartEnd < totalPage) {
            if (rightPartEnd < totalPage - 1) {
                buttons.push(-2);
            }

            buttons.push(totalPage);
        }

        return buttons;
    }

    render() {
        const { className, style, totalPage, children, size } = this.props;
        const { curPage } = this.state;
        const cls = classNames(clsPrefix, className, { [`${clsPrefix}--small`]: size === 'small' } );
        const buttons = this.getButtons();

        if (totalPage === 0) {
            return null;
        }

        return (
            <div className={cls} style={style}>
                {children}
                <div className={`${clsPrefix}-pager-controls`}>
                    <PageButton
                        key="page-button-prev"
                        className={`${clsPrefix}-prev`}
                        num={curPage - 1}
                        onClick={this.handleClick}
                        disabled={curPage === 1}
                    >
                        <Icon type="drop-left" />
                    </PageButton>
                    {buttons.map(
                        num => (
                            <PageButton
                                key={`page-button-${num}`}
                                num={num}
                                cur={num === curPage}
                                onClick={this.handleClick}
                            />
                        ),
                    )}
                    <PageButton
                        key="page-button-next"
                        className={`${clsPrefix}-next`}
                        num={curPage + 1}
                        onClick={this.handleClick}
                        disabled={curPage === totalPage}
                    >
                        <Icon type="drop-right" />
                    </PageButton>
                    {
                        totalPage > PAGE_PRE_LEVEL + 2 ?
                            <JumpPageButton
                                totalPage={totalPage}
                                onConfirm={this.handleInputConfirm}
                            />
                            : null
                    }
                </div>
            </div>
        );
    }
}

// Pager.propTypes = {
//     totalPage: PropTypes.number.isRequired,
//     curPage: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func,
// };

// Pager.defaultProps = {
//     onPageChange: null,
// };

export default Pager;
