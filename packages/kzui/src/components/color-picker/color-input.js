import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import {
    validateHEX,
    validateRGB,
    validateA,
    HEXToRGB,
    RGBToHEX,
    formatHEX,
} from './color-utils';

class ColorInput extends KZUIComponent {
    constructor(props) {
        super(props);

        this.autoBind(
            'handleRGBChange',
            'handleAChange',
            'handleHEXChange',
            'triggerChange',
        );
    }

    initStateFromProps(props) {
        return {
            hex: props.hex,
            rgb: props.rgb,
            a: props.a,
        };
    }

    handleHEXChange(e) {
        const hex = formatHEX(e.target.value);
        if (validateHEX(hex)) {
            const rgb = HEXToRGB(hex);
            this.setState({
                hex,
                rgb,
            });
            this.triggerChange(rgb, hex, this.state.a);
        } else {
            this.setState({
                hex,
            });
        }
    }

    handleRGBChange(e) {
        const name = e.target.name;
        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
        const rgb = [...this.state.rgb];

        switch (name) {
        case 'r': rgb[0] = value;
            break;
        case 'g': rgb[1] = value;
            break;
        case 'b': rgb[2] = value;
            break;
        default: return;
        }

        const hex = RGBToHEX(rgb);

        if (validateRGB(rgb)) {
            this.setState({
                hex,
                rgb,
            });
            this.triggerChange(rgb, hex, this.state.a);
        }
    }

    handleAChange(e) {
        const value = parseInt(e.target.value, 10) || 0;
        if (validateA(value)) {
            this.setState({
                a: value,
            });
            this.triggerChange(this.state.rgb, this.state.hex, value);
        }
    }

    triggerChange(rgb, hex, a) {
        if (this.props.onChange) {
            this.props.onChange(rgb, hex, a);
        }
    }

    render() {
        const clsPrefix = 'kui-color-picker';
        const cls = classNames(`${clsPrefix}-input`);

        return (
            <div className={cls}>
                {this.props.type === 'simple' ? (
                    <div className={`${clsPrefix}-cin-simple`}>
                        <input
                            className={`${clsPrefix}-cin-input`}
                            type="text"
                            name="hex"
                            value={this.state.hex}
                            onChange={this.handleHEXChange}
                        />
                    </div>
                ) : (
                    <div className={`${clsPrefix}-cin-full ${clsPrefix}-clear`}>
                        <div className={`${clsPrefix}-cin-full-cell ${clsPrefix}-cin-full-hex`}>
                            <input
                                className={`${clsPrefix}-cin-input ${clsPrefix}-cin-input-small`}
                                name="hex"
                                type="text"
                                value={this.state.hex}
                                onChange={this.handleHEXChange}
                            />
                            <div className={`${clsPrefix}-cin-full-txt`}>HEX</div>
                        </div>
                        <div className={`${clsPrefix}-cin-full-cell ${clsPrefix}-cin-full-rgba`}>
                            <input
                                className={`${clsPrefix}-cin-input ${clsPrefix}-cin-input-small`}
                                type="text"
                                name="r"
                                value={this.state.rgb[0]}
                                onChange={this.handleRGBChange}
                            />
                            <div className={`${clsPrefix}-cin-full-txt`}>R</div>
                        </div>
                        <div className={`${clsPrefix}-cin-full-cell ${clsPrefix}-cin-full-rgba`}>
                            <input
                                className={`${clsPrefix}-cin-input ${clsPrefix}-cin-input-small`}
                                name="g"
                                type="text"
                                value={this.state.rgb[1]}
                                onChange={this.handleRGBChange}
                            />
                            <div className={`${clsPrefix}-cin-full-txt`}>G</div>
                        </div>
                        <div className={`${clsPrefix}-cin-full-cell ${clsPrefix}-cin-full-rgba`}>
                            <input
                                className={`${clsPrefix}-cin-input ${clsPrefix}-cin-input-small`}
                                name="b"
                                type="text"
                                value={this.state.rgb[2]}
                                onChange={this.handleRGBChange}
                            />
                            <div className={`${clsPrefix}-cin-full-txt`}>B</div>
                        </div>
                        <div className={`${clsPrefix}-cin-full-cell ${clsPrefix}-cin-full-rgba`}>
                            <input
                                className={`${clsPrefix}-cin-input ${clsPrefix}-cin-input-small`}
                                name="a"
                                type="text"
                                value={this.state.a}
                                onChange={this.handleAChange}
                            />
                            <div className={`${clsPrefix}-cin-full-txt`}>A</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ColorInput.defaultProps = {
    type: 'simple',
    hex: '#f00',
    rgb: [255, 0, 0],
    a: 100,
};

ColorInput.propTypes = {
    type: PropTypes.string,
    hex: PropTypes.string,
    rgb: PropTypes.arrayOf(PropTypes.number),
    a: PropTypes.number,
};

export default ColorInput;
