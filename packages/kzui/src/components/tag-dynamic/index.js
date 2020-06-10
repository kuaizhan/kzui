import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import {
    Button,
    Input,
} from '../../index';
import './style.less';

export default class TagSelector extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChange', 'handleKeyPress', 'handleBlur', 'handleClick');
        this.state = {
            inputVisible: false,
            inputValue: '',
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState !== this.state);
    }

    handleClick() {
        this.setState({
            inputVisible: true,
            inputValue: '',
        }, () => { this.input.toFocus(); });
    }

    handleBlur() {
        this.setState({
            inputVisible: false,
        }, () => {
            if (this.props.onBlur) {
                this.props.onBlur(this.state.inputValue);
            }
        });
    }

    handleChange({ value }) {
        this.setState({
            inputValue: value,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.inputValue);
            }
        });
    }

    handleKeyPress(event) {
        const { inputValue } = this.state;
        const { maxLength } = this.props;
        if (inputValue.length > maxLength) {
            return;
        }
        if (event.keyCode === 13) {
            this.setState({
                inputVisible: false,
            }, () => {
                if (this.props.onKeyEnter) {
                    this.props.onKeyEnter(inputValue);
                }
            });
        }
        if (event.keyCode === 27) {
            this.setState({
                inputVisible: false,
                inputValue: '',
            }, () => {
                if (this.props.onKeyEsc) {
                    this.props.onKeyEsc();
                }
            });
        }
    }
    render() {
        const clsPrefix = 'kui-tag-dynamic';
        const { className, style, maxLength } = this.props;
        const cls = classNames(clsPrefix, className);
        const { inputVisible, inputValue } = this.state;
        return (
            <div className={cls} style={style}>
                <div className={`${clsPrefix}-toggle-wrapper`} >
                    {
                        inputVisible ?
                            <Input
                                uncontroled
                                ref={this.storeRef('input')}
                                error={inputValue.length >= maxLength}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                            />
                            :
                            <Button
                                type="dashed"
                                onClick={this.handleClick}
                            >
                                {this.props.addBtnText}
                            </Button>
                    }
                </div>
            </div>
        );
    }
}

TagSelector.defaultProps = {
    addBtnText: '+ 标签',
    maxLength: 10,
    onChange: null,
    onBlur: null,
    onKeyEnter: null,
    onKeyEsc: null,
};

TagSelector.propTypes = {
    addBtnText: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyEnter: PropTypes.func,
    onKeyEsc: PropTypes.func,
};
