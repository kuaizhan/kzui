import  * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Icon from '../icon/index';
import PopTip from '../poptip/index';
import Option from './Option';
import './style.less';
import { UiSizeType, OptionListType } from '../../../types/base';

interface onChangeArg {
  name: string
  value: any | any[]
  selectedText: string | string[]
  text: string
}

interface SelectProps {
    defaultText?: string //默认显示文案,
    name?: string //表单项名,
    value?: any | Array<any>//当前值,
    size?: UiSizeType //大小,
    options?: OptionListType //可选项,
    disabled?: boolean //是否禁用
    onChange?: (e: onChangeArg) => void
    onExpand?: () => void
    maxHeight?: number,
    hasMore?: boolean,
    onLoadMore?: () => void,
    popoverCls?: string,
    popoverStyle?: React.CSSProperties,
    initialExpand: boolean,
    mode?: 'multiple'
}

interface SelectStates {
    value?: any | Array<any>
    expand?: boolean
    selectedText?: string | Array<string>
}

class Select extends KZUIComponent<SelectProps, SelectStates> {
    wrp: React.RefObject<HTMLDivElement>;

    static defaultProps = {
        ...baseDefaultProps,
        defaultText: '请选择',
        value: null,
        name: '',
        disabled: false,
        options: [],
        onChange: null,
        maxHeight: null,
        hasMore: false,
        onLoadMore: null,
        onExpand: null,
        popoverCls: '',
        popoverStyle: {},
        size: '',
        initialExpand: false,
        mode: null,
    }

    constructor(props) {
        super(props);
        this.autoBind('handleSelect', 'handleBlur', 'handleLoadMore', 'handleClick');
        this.wrp = React.createRef<HTMLDivElement>()
    }

    initStateFromProps(props) {
        let selectedText = props.defaultText;
        let value = props.value;
        const initialExpand = props.initialExpand;
        const selected = props.options.filter(item => (
            props.mode === 'multiple' ? props.value?.indexOf(item.value) > -1 : item.value === props.value
        ));
        if (selected.length > 0) {
            if (props.mode == 'multiple') {
                selectedText = selected.map(item => item.text)
                value = selected.map(item => item.value)
            } else {
                selectedText = selected[0].text;
                value = selected[0].value;
            }
        }

        console.log(selectedText, 'selectedText')
        
        return {
            expand: initialExpand || false,
            value,
            selectedText,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { options, value, mode } = nextProps
        const selected = options.filter(item => (mode === 'multiple' ? value?.indexOf(item.value) > -1 : item.value === value))
        let newSelectedText = this.props.defaultText
        if (selected.length > 0) {
            newSelectedText = mode === 'multiple' ? selected.map(item => item.text) : selected[0].text;
        }
        this.setState({
            selectedText: newSelectedText,
            value
        })
    }

    handleClick() {
        if (this.props.disabled) {
            return;
        }
        const { expand } = this.state;
        this.wrp.current.focus();

        this.setState({
            expand: !expand,
        }, () => {
            if (!expand && this.props.onExpand) {
                this.props.onExpand();
            }
        });
    }

    handleBlur(e) {
        if (e.relatedTarget && this.wrp.current.contains(e.relatedTarget)) {
            e.preventDefault();
            return;
        }
        this.setState({
            expand: false,
        });
    }

    handleSelect(selected) {  // TODO value是否需要完全受控
        let selectedText = selected.text
        let selectedValue = selected.value

        this.setState((state) => {
            if (this.props.mode === 'multiple') {
                if (Array.isArray(state.selectedText) && Array.isArray(state.value)) {
                    const valueIndex = state.value.indexOf(selected.value)
                    let textArr = [...state.selectedText]
                    let valueArr = [...state.value]
                    // 已选中的改为未选中
                    if (valueIndex > -1) {
                        textArr.splice(valueIndex, 1)
                        valueArr.splice(valueIndex, 1)
                    } else {
                        textArr.push(selected.text)
                        valueArr.push(selected.value)
                    }
                    selectedValue = valueArr
                    selectedText = textArr
                } else {
                    selectedText = [selected.text]
                    selectedValue = [selected.value]
                }
            }
            return ({
                selectedText: selectedText,
                value: selectedValue,
                expand: this.props.mode === 'multiple',
            })
        }, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    value: this.state.value,
                    selectedText: this.state.selectedText,
                    text: selected.text,
                });
            }
        });
        
    }

    handleLoadMore() {
        const { onLoadMore } = this.props;
        if (onLoadMore === null) return;
        this.wrp.current.focus();
        setTimeout(() => {
            this.setState({ expand: true });
        }, 50)
        onLoadMore();
    }

    render() {
        const clsPrefix = 'kui-select';
        const {
            className,
            style,
            disabled,
            size,
            popoverCls,
            popoverStyle,
            maxHeight,
            mode,
            options,
        } = this.props;
        const { expand, selectedText } = this.state;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-expand`]: expand,
            [`${clsPrefix}-disabled`]: disabled,
            [`${clsPrefix}-${size}`]: !!size,
        }, className);

        const optionsPanelCls = classNames(popoverCls, `${clsPrefix}-options-panel`);

        let finalPopoverStyle = {
            ...popoverStyle,
        };

        if (maxHeight) {
            finalPopoverStyle = {
                ...popoverStyle,
                maxHeight: `${maxHeight}px`,
            };
        }

        console.log(expand, 'expand')
        
        return (
            <div
                ref={this.wrp}
                className={cls}
                style={style}
                role="button"
                tabIndex={0}
                onClick={this.handleClick}
            >
                <PopTip
                    isPopover
                    placement='bottom-left'
                    visible={expand}
                    onVisibleChange={visible => this.setState({ expand: visible })}
                    trigger='click'
                    tipStyle={{ padding: 0, width: style?.width || 200, minWidth: 'auto' }}
                    theme='light'
                    style={{ width: "100%", height: '100%', display: 'block' }}
                    tip={(
                        <div className={optionsPanelCls} style={{ ...finalPopoverStyle, display: expand ? 'block' : 'none', width: style?.width || 200 }}>
                            <div className={`${clsPrefix}-options`}>
                                {options?.map((option, index) => (
                                    <Option
                                        key={`option-${index}`}
                                        value={option.value}
                                        selected={mode === 'multiple' ? ((this.state.value || []).indexOf(option.value) > -1) : this.state.value === option.value}
                                        onClick={this.handleSelect}
                                        disabled={option.disabled}
                                        isLabel={option.isLabel}
                                        isSubOption={option.isSubOption}
                                        isMultiple={mode === 'multiple'}
                                    >
                                        {option.text}
                                    </Option>
                                ))}
                                { this.props.options.length === 0 && (
                                    <Option style={{ color: '#9b9b9b' }}>
                                        没有内容
                                    </Option>
                                )}
                                {
                                    this.props.hasMore ?
                                        <Option
                                            style={{ color: '#9b9b9b' }}
                                            value=""
                                            onClick={this.handleLoadMore}
                                        >
                                            点击加载更多
                                        </Option> : null
                                }
                            </div>
                        </div>
                    )}
                >
                    <div className={`${clsPrefix}-selected`} tabIndex={0} onBlur={this.handleBlur}>
                        <div className={classNames(`${clsPrefix}-selected-title`, {[`${clsPrefix}-selected-title--multiple`] : mode === 'multiple'})}>
                            {mode === 'multiple' ? 
                                (Array.isArray(selectedText) ? 
                                    selectedText.map((text, index) => (
                                        index == selectedText.length - 1 ? ` ${text}` : ` ${text} |`
                                    )) : selectedText
                                )
                                : selectedText 
                            }
                        </div>
                        <div className={`${clsPrefix}-indicator`}>
                            <Icon type="nav-pull-down" />
                        </div>
                    </div>
                </PopTip>
            </div>
        );
    }
}

export default Select;

export {
    Option,
};
