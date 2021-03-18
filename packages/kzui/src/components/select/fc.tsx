import * as React from 'react';
import classNames from 'classnames';
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
    mode?: 'multiple',
    className?: string
    onError?: () => void
    style?: React.CSSProperties
}

const clsPrefix = 'kui-select';

const Select:React.FC<SelectProps> = ({
    defaultText = '请选择',
    value = null,
    name = '',
    disabled = false,
    options = [],
    onChange = null,
    maxHeight = null,
    hasMore = false,
    onLoadMore = null,
    onExpand = null,
    popoverCls = '',
    popoverStyle = {},
    size = '',
    initialExpand = false,
    mode = null,
    className = '',
    onError = null,
    style = {},
}) => {
    const [expand, setExpand] = React.useState(initialExpand)
    const [selectedData, setSelectedData] = React.useState<{
        selectedValue: SelectProps['value'],
        selectedText: string | Array<string>
    }>({
        selectedValue: null,
        selectedText: ''
    })
    const { selectedText, selectedValue}  = selectedData

    const [inLoadMore, setInLoadMore] = React.useState(false)

    const wrpRef = React.useRef<HTMLDivElement>()

    React.useEffect(() => {
        console.log('迷幻 effect', expand, selectedData)
        let changeSelectedText: string | Array<any> = defaultText;

        const selected = options.filter(item => (
            mode === 'multiple' ? value?.indexOf(item.value) > -1 : item.value === value
        ));
        if (selected.length > 0) {
            if (mode == 'multiple') {
                changeSelectedText = selected.map(item => item.text) as string[]
            } else {
                changeSelectedText = selected[0].text as string;
            }
        }

        if (value === selectedValue) {
            return
        } else {
            setSelectedData({
                selectedValue: value,
                selectedText: changeSelectedText,
            })
        }

    },[])

    // React.useEffect(() => {
    //     console.log('init expand', initialExpand)
    //     setExpand(initialExpand)
    // }, [])

    // React.useEffect(() =>{
    //     const selected = options.filter(item => (mode === 'multiple' ? value?.indexOf(item.value) > -1 : item.value === value));
    //     let newSelectedText: string | string[] = defaultText;
    
    //     if (selected.length > 0) {
    //         newSelectedText = mode === 'multiple' ? selected.map(item => item.text) as string[] : selected[0].text as string;
    //     }
    //     setSelectedData({
    //         selectedText: newSelectedText,
    //         selectedValue: value
    //     })
    // }, [value])

    React.useEffect(() => {
        console.log('in load more', inLoadMore)

        if (inLoadMore) {
            setExpand(true)
            setInLoadMore(false)
        }
    }, [inLoadMore])

    function handleClick() {
        if (disabled) {
            return;
        }
        wrpRef.current?.focus();

        console.log('on Click ---expand', expand)
        setExpand(!expand)
        if (!expand) {
            onExpand?.();
        }
    }

    function handleBlur(e) {
        if (e.relatedTarget && wrpRef.current?.contains(e.relatedTarget)) {
            e.preventDefault();
            return;
        }
        console.log('on blur')
        setExpand(false)
    }

    function handleSelect(selected) {  // TODO value是否需要完全受控
        let _selectedText = selected.text;
        let _selectedValue = selected.value;

        setSelectedData(({ selectedText, selectedValue }) => {
            if (mode === 'multiple') {
                if (Array.isArray(selectedText) && Array.isArray(selectedValue)) {
                    const valueIndex = selectedValue.indexOf(selected.value)
                    let textArr = [...selectedText]
                    let valueArr = [...selectedValue]
                    // 已选中的改为未选中
                    if (valueIndex > -1) {
                        textArr.splice(valueIndex, 1)
                        valueArr.splice(valueIndex, 1)
                    } else {
                        textArr.push(selected.text)
                        valueArr.push(selected.value)
                    }
                    _selectedValue = valueArr
                    _selectedText = textArr
                } else {
                    _selectedText = [selected.text]
                    _selectedValue = [selected.value]
                }
            } 

            onChange?.({
                name: name,
                value: _selectedValue,
                selectedText: _selectedText,
                text: selected.text,
            });
            return {
                selectedValue: _selectedValue,
                selectedText: _selectedText,
            }
        })

        console.log('expand in handle select', expand)
    }

    function handleLoadMore() {
        if (!onLoadMore) return;
        // wrpRef.current?.focus();
        setInLoadMore(true)
        onLoadMore();
    }

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
    
    return (
        <div
            ref={wrpRef}
            className={cls}
            style={style}
            role="button"
            tabIndex={0}
            onClick={handleClick}
        >
            <PopTip
                isPopover
                placement='bottom-left'
                visible={expand}
                onVisibleChange={visible => {
                    console.log('poptip on visible', visible)
                    setExpand(visible)
                }}
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
                                    selected={mode === 'multiple' ? ((selectedValue || []).indexOf(option.value) > -1) : selectedValue === option.value}
                                    onClick={handleSelect}
                                    disabled={option.disabled}
                                    isLabel={option.isLabel}
                                    isSubOption={option.isSubOption}
                                    isMultiple={mode === 'multiple'}
                                >
                                    {option.text}
                                </Option>
                            ))}
                            { options.length === 0 && (
                                <Option style={{ color: '#9b9b9b' }}>
                                    没有内容
                                </Option>
                            )}
                            {
                                hasMore ?
                                    <Option
                                        style={{ color: '#9b9b9b' }}
                                        value=""
                                        onClick={handleLoadMore}
                                    >
                                        点击加载更多
                                    </Option> : null
                            }
                        </div>
                    </div>
                )}
            >
                <div className={`${clsPrefix}-selected`} tabIndex={0} onBlur={handleBlur}>
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
    )
}

export default Select