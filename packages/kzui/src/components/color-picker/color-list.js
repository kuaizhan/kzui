import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';

class ColorList extends KZUIComponent {
    initStateFromProps(props) {
        if (props.type === 'simple') {
            return {
                list: props.list.slice(0, 16),
            };
        }
        return {
            list: props.list,
        };
    }

    render() {
        const clsPrefix = 'kui-color-picker';
        const { title, type } = this.props;
        const cls = classNames(`${clsPrefix}-list`);
        const titleJSX = type === 'simple' ? '' : (
            <div className={`${clsPrefix}-clt-title`}>{title}</div>
        );
        const containerClassName = `${clsPrefix}-clt-container ${clsPrefix}-clt-${type}`;

        return (
            <div className={cls}>
                <div className={containerClassName}>
                    {titleJSX}
                    <div className={`${clsPrefix}-clt-body`}>
                        <div className={`${clsPrefix}-clt-list`}>
                            {this.state.list.map((color, index) => (
                                <div
                                    className={`${clsPrefix}-clt-item`}
                                    key={index}
                                    style={{ backgroundColor: color }}
                                    data-value={color}
                                    onClick={() => { this.props.onChange(color); }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ColorList.defaultProps = {
    type: 'simple',
    title: '主题推荐色',
    onChange: null,
};

ColorList.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
};

export default ColorList;
