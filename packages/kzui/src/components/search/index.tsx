import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Icon from '../icon/index';
import Input from '../input/index';
import { UiSizeType } from '../../../types/base';
import './style.less';

const enterCode = 13;

interface SearchProps {
  size?: UiSizeType //按钮尺寸,
  disabled?: boolean //是否禁用输入,
  error?: boolean //是否输入验证出错,
  name?: string //表单输入项名,
  value?: string //初始值,
  placeholder?: string //输入默认显示,
  hasMore?: boolean //是否下拉加载更多
  onChange?: (e: {name: string, value: string}) => void //回调函数第一个参数为一个包含 name, value属性的对象
  onSearch?: (e: {name: string, value: string}) => void //回调函数第一个参数为一个包含 name, value属性的对象
}

class Search extends KZUIComponent<SearchProps, {
  value?: string,
}> {
    static defaultProps = {
      ...baseDefaultProps,
      size: 'normal',
      disabled: false,
      error: false,
      name: '',
      placeholder: '',
      value: '',
      onChange: null,
      onSearch: null,
    }

    constructor(props: SearchProps) {
        super(props);
        this.autoBind('handleChange', 'handleSearch', 'handleKeyPress');
    }

    initStateFromProps(props: SearchProps) {
        return {
            value: props.value,
        };
    }

    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch({ value: this.state.value, name: this.props.name });
        }
    }

    handleKeyPress(e) {
        if (e.keyCode === enterCode) {
            this.handleSearch();
        }
    }

    handleChange({ value }) {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange({ value, name: this.props.name });
        }
    }

    render() {
        const clsPrefix = 'kui-search';
        const {
            className,
            style,
            disabled,
            placeholder,
            error,
            name,
            size,
        } = this.props;

        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-disabled`]: disabled,
        }, className);

        return (
            <div className={cls} style={style}>
                <Input
                    size={size}
                    disabled={disabled}
                    error={error}
                    name={name}
                    value={this.state.value}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <Icon type="search" onClick={this.handleSearch} />
            </div>
        );
    }
}

export default Search;
