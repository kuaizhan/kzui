import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Icon from '../icon/index';
import EventBlackHole from '../event-black-hole/index';
import Option from '../select/Option';
import Search from '../search/index';
import './style.less';
import { outerHeight } from '../../utils';
import { UiSizeType, OptionListType, DimensionType, valueType } from '../../../types/base';

interface onChangeArg {
  name: string
  value: string
  selectedText: string
  text: string
}

interface onSearchArg {
  name: "search-text"
  value: string
}

interface SearchSelectProps {
  defaultText?: string //默认显示文案,
  emptyWarning?: string //搜索结果为空的提示文案,
  name?: string //表单项名,
  value?: string //当前值,
  size?: UiSizeType //大小,
  options?: OptionListType //可选项,
  disabled?: boolean //是否禁用
  onChange?: (e: onChangeArg) => void
  onSearch?: (e: onSearchArg) => void
  onExpand?: () => void
}

interface SearchSelectStates {
  expand?: boolean
  searchText?: string
  dimensions?: Partial<DimensionType>
  checkEmpty?: boolean
  selectedText?: string | React.ReactNode
  value?: valueType
}

class SearchSelect extends KZUIComponent<SearchSelectProps, SearchSelectStates> {
    wrp: HTMLElement;

    static defaultProps = {
      ...baseDefaultProps,
      defaultText: '请选择',
      emptyWarning: '暂无搜索结果',
      value: null,
      name: '',
      options: [],
      onChange: null,
      onSearch: null,
      disabled: false,
      size: '',
      onExpand: null,
    }

    constructor(props) {
        super(props);
        this.autoBind('handleSelect', 'handleClick', 'handleBlur', 'handleSearch', 'handleSearchTextChange');
    }

    initStateFromProps(props: SearchSelectProps) {
        let selectedText: string | React.ReactNode = props.defaultText;
        let value: valueType = props.value;
        const selected = props.options.filter((item) => {
            if (item.selected || item.value === props.value) {
                return item;
            }
            return undefined;
        });
        if (selected.length > 0) {
            selectedText = selected[0].text;
            value = selected[0].value;
        }
        const searchText = this.state ? this.state.searchText : '';
        const expand = this.state ? this.state.expand : false;
        const dimensions = this.state ? this.state.dimensions : {};
        const checkEmpty = this.state ? this.state.checkEmpty : false;

        return {
            value,
            selectedText,
            searchText,
            expand,
            dimensions,
            checkEmpty,
        };
    }

    handleClick() {
        const wrp = this.wrp;
        const dimensions = {
            left: 0,
            top: outerHeight(wrp) + 5,
            width: '100%',
            height: 'auto',
        };
        this.wrp.focus();
        this.setState({
            dimensions,
            expand: !this.state.expand,
        }, () => {
            if (this.state.expand && this.props.onExpand) {
                this.props.onExpand();
            }
        });
    }

    handleBlur(e) {
        if (e.relatedTarget && this.wrp.contains(e.relatedTarget)) {
            e.preventDefault();
            return;
        }
        this.setState({
            expand: false,
        });
    }

    handleSelect(selected) {
        this.setState({
            selectedText: selected.text,
            value: selected.value,
            expand: false,
        });
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                value: selected.value,
                selectedText: selected.text,
                text: selected.text,
            });
        }
    }

    handleSearch({ name, value }) {
        if (this.props.onSearch) {
            this.props.onSearch({ name, value });
        }
        setTimeout(() => {
            this.setState({
                checkEmpty: true,
            });
        }, 1000);
    }

    handleSearchTextChange({ value }) {
        this.setState({
            checkEmpty: false,
            searchText: value,
        });
    }

    render() {
        const clsPrefix = 'kui-select';
        const { className, style, disabled, options, emptyWarning, size } = this.props;
        const { expand } = this.state;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-expand`]: expand,
            [`${clsPrefix}-disabled`]: disabled,
            [`${clsPrefix}-with-search`]: true,
            [`${clsPrefix}-${size}`]: !!size,
        }, className);

        return (
            <div
                ref={this.storeRef('wrp')}
                className={cls}
                style={style}
                role="button"
                tabIndex={0}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
            >
                <div className={`${clsPrefix}-selected`}>
                    <div className={`${clsPrefix}-indicator`}>
                        <Icon type="nav-pull-down" />
                    </div>
                    <div className={`${clsPrefix}-selected-title`}>{this.state.selectedText}</div>
                </div>
                <EventBlackHole className={`${clsPrefix}-options`} captureEvents={['click']}>
                    <div className={`${clsPrefix}-options-panel ${expand ? 'options-panel-visible' : ''}`}>
                        <Search
                            className={`${clsPrefix}-search-input`}
                            name="search-text"
                            value={this.state.searchText}
                            onSearch={this.handleSearch}
                            onChange={this.handleSearchTextChange}
                        />
                        {options.map(option => (
                            <Option
                                key={`option-${option.value}`}
                                value={option.value}
                                selected={this.state.value === option.value}
                                onClick={this.handleSelect}
                            >
                                {option.text}
                            </Option>
                        ))}
                        {
                            !options.length && this.state.checkEmpty ?
                                <Option
                                    value={0}
                                >
                                    {emptyWarning}
                                </Option> : null
                        }
                    </div>
                </EventBlackHole>
            </div>
        );
    }
}

// SearchSelect.defaultProps = {
//     defaultText: '请选择',
//     emptyWarning: '暂无搜索结果',
//     value: null,
//     name: '',
//     options: [],
//     onChange: null,
//     onSearch: null,
//     disabled: false,
//     size: '',
//     onExpand: null,
// };

// SearchSelect.propTypes = {
//     defaultText: PropTypes.string,
//     emptyWarning: PropTypes.string,
//     name: PropTypes.string,
//     value: valueType,
//     size: PropTypes.string,
//     options: optionListType,
//     onChange: PropTypes.func,
//     onSearch: PropTypes.func,
//     disabled: PropTypes.bool,
//     onExpand: PropTypes.func,
// };

export default SearchSelect;
