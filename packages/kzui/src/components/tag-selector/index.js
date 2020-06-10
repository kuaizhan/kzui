import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import Tag from '../tag';

export default class TagSelector extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleSelectTag');
    }

    initStateFromProps(props) {
        const key = props.default;
        return {
            selected: key < 0 ? {} : {
                [key]: {
                    value: key,
                    label: props.tags[key],
                },
            },
        };
    }

    handleSelectTag(tag) {
        const value = tag.value;
        let data = {};
        if (this.props.multi) {
            if (Object.prototype.hasOwnProperty.call(this.state.selected, value)) {
                const temp = Object.assign({}, this.state.selected);
                delete temp[value];
                data = temp;
                this.setState({
                    selected: data,
                });
            } else {
                data = Object.assign({}, this.state.selected, {
                    [value]: tag,
                });
                this.setState({
                    selected: data,
                });
            }
        } else {
            data = {
                [value]: tag,
            };
            this.setState({
                selected: data,
            });
        }
        if (this.props.onChange) {
            const arr = Object.keys(data).map(key => data[key]);
            this.props.onChange(arr);
        }
    }

    render() {
        const clsPrefix = 'kui-tag-selector';
        const { className, style, tagClassName, tagStyle } = this.props;
        const cls = classNames(clsPrefix, className);
        return (
            <div className={cls} style={style}>
                {this.props.tags.map(
                    (label, key) => (
                        <Tag
                            key={`${key}-${Object.prototype.hasOwnProperty.call(this.state.selected, key)}`}
                            value={key}
                            label={label}
                            multi={this.props.multi}
                            active={Object.prototype.hasOwnProperty.call(this.state.selected, key)}
                            cancel={this.props.multi}
                            onChange={this.handleSelectTag}
                            className={tagClassName}
                            style={tagStyle}
                        />
                    ),
                )}
            </div>
        );
    }
}

TagSelector.defaultProps = {
    tags: [],
    default: -1,
    multi: false,
    onChange: null,
    style: {},
    className: '',
    tagStyle: {},
    tagClassName: '',
};

TagSelector.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    default: PropTypes.number,
    multi: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.objectOf(PropTypes.any),
    className: PropTypes.string,
    tagStyle: PropTypes.objectOf(PropTypes.any),
    tagClassName: PropTypes.string,
};
