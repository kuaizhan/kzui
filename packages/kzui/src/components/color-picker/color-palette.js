import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import ColorInput from './color-input';
import { RGBToHEX, HEXToRGB } from './color-utils';

// 根据一个颜色获取画板右上角颜色
const getCornerColor = (rgb) => {
    const arr = [{ key: 'r', val: rgb[0] }, { key: 'g', val: rgb[1] }, { key: 'b', val: rgb[2] }];

    arr.sort((m, n) => m.val - n.val);

    const max = arr[2].key;
    const mid = arr[1].key;
    const min = arr[0].key;

    const color = {};
    color[min] = 0;
    color[mid] = ((arr[1].val + 255) - arr[2].val) - arr[0].val;
    color[max] = 255;

    return [color.r, color.g, color.b];
};

class ColorPalette extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind(
            'initPalette',
            'initPaletteStrap',
            'handlePaletteCanvasMouseDown',
            'handlePaletteCanvasMouseMove',
            'handlePaletteCanvasMouseUp',
            'handlePaletteCanvasMouseOut',
            'handlePaletteCanvasClick',
            'handleStrapCanvasMouseDown',
            'handleStrapCanvasMouseMove',
            'handleStrapCanvasMouseUp',
            'handleStrapCanvasMouseOut',
            'handleStrapCanvasClick',
            'handleClickPalette',
            'handleInputChange',
            'getPosition',
            'rgbToHex',
        );
        this.isPressStrap = false;
        this.isPresspalette = false;
        this.paletteCtx = null;
        this.strapCtx = null;
    }

    initStateFromProps(props) {
        console.log('initStateFromProps', props);
        let state;
        const rgb = HEXToRGB(props.hex);
        if (props.type === 'simple') {
            state = {
                rgb,
                a: props.a,
                hex: props.hex,
                height: 60,
                width: 214,
                strapHeight: 12,
            };
        } else {
            state = {
                rgb,
                a: props.a,
                hex: props.hex,
                height: 130,
                width: 210,
                strapHeight: 12,
            };
        }

        // TODO need to be changed
        if (!this.state) {
            this.state = state;
        }

        const { cursorLeft, pointTop, pointLeft } = this.getPosition(rgb);

        return Object.assign({}, state, {
            cursorLeft,
            pointTop,
            pointLeft,
        });
    }

    componentDidMount() {
        this.initPalette(this.state.rgb);
        this.initPaletteStrap();
    }


    // 在画板完成更新时触发onchange事件
    componentDidUpdate(prevProps) {
        console.log('didupdate');
        // 若prop发生了变话，则说明更新由外部传入了新的色值触发，则需要重新更新palette状态
        // 否则说明更新是由内部input或者canvas状态发生变化引起的，此时不需要重新更新
        if (prevProps.hex !== this.props.hex) {
            this.initPalette(this.state.rgb);
        }
    }

    initPalette(rgb) {
        this.paletteCtx = this.paletteCanvas.getContext('2d');
        this.setPaletteStatus(rgb);
    }

    getPosition(rgb) {
        const cornerRgb = getCornerColor(rgb);
        const arr = [{ key: 'r', val: rgb[0] }, { key: 'g', val: rgb[1] }, { key: 'b', val: rgb[2] }];

        arr.sort((m, n) => m.val - n.val);

        const max = arr[2].key;
        const min = arr[0].key;

        let left;

        switch (min + max) {
        case 'br': left = (cornerRgb[1] / 255) * 0.17; break;
        case 'bg': left = 0.34 - ((cornerRgb[0] / 255) * 0.17); break;
        case 'rg': left = ((cornerRgb[2] / 255) * 0.17) + 0.34; break;
        case 'rb': left = 0.68 - ((cornerRgb[1] / 255) * 0.17); break;
        case 'gb': left = ((cornerRgb[0] / 255) * 0.17) + 0.68; break;
        case 'gr': left = 1 - ((cornerRgb[2] / 255) * 0.15); break;
        default: left = 0; break;
        }

        const cursorLeft = `${parseInt(left * this.state.width, 10)}px`;
        const pointTop = `${parseInt((1 - (arr[2].val / 255)) * this.state.height, 10)}px`;
        const pointLeft = `${parseInt((1 - (arr[0].val / arr[2].val)) * this.state.width, 10)}px`;
        return {
            cursorLeft,
            pointTop,
            pointLeft,
        };
    }

    setPaletteStatus(rgb) {
        console.log('setPaletteStatus: ', rgb, RGBToHEX(rgb));
        const cornerRgb = getCornerColor(rgb);
        const x = 0;
        const y = 0;
        const w = this.state.width;
        const h = this.state.height;
        const unitI = this.state.height / 255;
        let r;
        let g;
        let b;

        for (let i = 0; i < h; i += unitI) {
            const lg6 = this.paletteCtx.createLinearGradient(x, y + i, x + w, y + i);

            // 左侧边缘色彩
            b = Math.floor(255 - ((i * 255) / h));
            r = b;
            g = b;
            lg6.addColorStop(0, `rgb(${r},${g},${b})`);

            // 右侧边缘色彩,因为i被等分了，所以需要反转单位
            r = cornerRgb[0] - ((i * 255) / h);
            g = cornerRgb[1] - ((i * 255) / h);
            b = cornerRgb[2] - ((i * 255) / h);

            // 保证不能小于0，因为是减法，所以也不可能大于 255
            r = r < 0 ? 0 : r;
            g = g < 0 ? 0 : g;
            b = b < 0 ? 0 : b;

            // rgb 函数只接受整数
            r = Math.floor(r) || 0;
            g = Math.floor(g) || 0;
            b = Math.floor(b) || 0;

            lg6.addColorStop(1, `rgb(${r},${g},${b})`);
            this.paletteCtx.strokeStyle = lg6;
            this.paletteCtx.beginPath();
            this.paletteCtx.moveTo(x, y + i);
            this.paletteCtx.lineTo(x + w, y + i);
            this.paletteCtx.stroke();
        }
    }

    // 当输入框内容发生变化时, 与画板prop发生变化处理方式一致，所有需要绘制的地方都需要重绘。
    handleInputChange(rgb, hex, a) {
        const { cursorLeft, pointTop, pointLeft } = this.getPosition(rgb);
        this.setState({
            rgb,
            hex,
            a,
            cursorLeft,
            pointTop,
            pointLeft,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.hex, this.state.a);
            }
        });
        this.setPaletteStatus(rgb);
    }

    initPaletteStrap() {
        const h = this.state.strapHeight;
        const w = this.state.width;

        this.strapCtx = this.strapCanvas.getContext('2d');
        const grd = this.strapCtx.createLinearGradient(0, 0, w, 0);

        grd.addColorStop(0, '#FF0000');
        grd.addColorStop(0.17, '#FFFF00');
        grd.addColorStop(0.34, '#00FF00');
        grd.addColorStop(0.51, '#00FFFF');
        grd.addColorStop(0.68, '#0000FF');
        grd.addColorStop(0.85, '#FF00FF');
        grd.addColorStop(1, '#FF0000');
        this.strapCtx.fillStyle = grd;
        this.strapCtx.fillRect(0, 0, w, h);
    }

    // 上方大cavans相关事件
    handlePaletteCanvasMouseDown() {
        this.isPressPalette = true;
    }

    handlePaletteCanvasMouseMove(e) {
        if (this.isPressPalette) {
            this.handleClickPalette(e, 'palette');
        }
    }

    handlePaletteCanvasMouseUp() {
        this.isPressPalette = false;
    }

    handlePaletteCanvasMouseOut() {
        this.isPressPalette = false;
    }

    handlePaletteCanvasClick(e) {
        this.handleClickPalette(e, 'palette');
    }

    // 条形canvas相关事件
    handleStrapCanvasMouseDown() {
        this.isPressStrap = true;
    }

    handleStrapCanvasMouseMove(e) {
        if (this.isPressStrap) {
            this.handleClickPalette(e, 'strap');
        }
    }

    handleStrapCanvasMouseUp() {
        this.isPressStrap = false;
    }

    handleStrapCanvasMouseOut() {
        this.isPressStrap = false;
    }

    handleStrapCanvasClick(e) {
        this.handleClickPalette(e, 'strap');
    }

    // 点击大画板的时候只需要更圆点的位置, 点击条形画板时需要重绘大画板，并更新圆点与条形版指针位置
    handleClickPalette(e, type) {
        const ctx = type === 'palette' ? this.paletteCtx : this.strapCtx;
        e.preventDefault();
        const nativeEvent = e.nativeEvent;
        const data = ctx.getImageData(
            nativeEvent.offsetX,
            nativeEvent.offsetY,
            1,
            1,
        );

        const [r, g, b] = data.data;
        const rgb = [r, g, b];

        console.log('now color: ', RGBToHEX(rgb), type);
        if (type === 'strap') {
            this.setPaletteStatus(rgb);
        }

        const { cursorLeft, pointTop, pointLeft } = this.getPosition(rgb);
        this.setState({
            rgb,
            hex: RGBToHEX(rgb),
            cursorLeft: type === 'strap' ? cursorLeft : this.state.cursorLeft,
            pointTop,
            pointLeft,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.hex, this.state.a);
            }
        });
    }

    render() {
        const clsPrefix = 'kui-color-picker';
        const cls = classNames(`${clsPrefix}-palette`);
        const typeClassName = `${clsPrefix}-cpe-container ${clsPrefix}-cpe-${this.props.type}`;
        const cursorStyle = {
            left: this.state.cursorLeft,
        };
        const pointStyle = {
            left: this.state.pointLeft,
            top: this.state.pointTop,
        };
        return (
            <div className={cls}>
                <div className={typeClassName}>
                    <div className={`${clsPrefix}-cpe-main`}>
                        <canvas
                            onClick={this.handlePaletteCanvasClick}
                            onMouseDown={this.handlePaletteCanvasMouseDown}
                            onMouseUp={this.handlePaletteCanvasMouseUp}
                            onMouseMove={this.handlePaletteCanvasMouseMove}
                            onMouseOut={this.handlePaletteCanvasMouseOut}
                            width={this.state.width}
                            height={this.state.height}
                            ref={(canvas) => { this.paletteCanvas = canvas; }}
                            className={`${clsPrefix}-cpe-main-canvas`}
                        />
                        <i
                            className={`${clsPrefix}-cpe-point`}
                            style={pointStyle}
                        />
                    </div>
                    <div className={`${clsPrefix}-cpe-row`}>
                        <i
                            className={`${clsPrefix}-cpe-cursor`}
                            style={cursorStyle}
                        />
                        <canvas
                            width={this.state.width}
                            height={this.state.strapHeight}
                            ref={(canvas) => { this.strapCanvas = canvas; }}
                            onClick={this.handleStrapCanvasClick}
                            onMouseDown={this.handleStrapCanvasMouseDown}
                            onMouseMove={this.handleStrapCanvasMouseMove}
                            onMouseUp={this.handleStrapCanvasMouseUp}
                            onMouseOut={this.handleStrapCanvasMouseOut}
                            className={`${clsPrefix}-cpe-row-canvas`}
                        />
                    </div>
                    <ColorInput
                        onChange={this.handleInputChange}
                        rgb={this.state.rgb}
                        hex={this.state.hex}
                        a={this.state.a}
                        type={this.props.type}
                    />
                </div>
            </div>
        );
    }
}

ColorPalette.defaultProps = {
    type: 'simple',
    hex: '#ff0000',
    a: 100,
    onChange: null,
};

ColorPalette.propTypes = {
    type: PropTypes.string,
    hex: PropTypes.string,
    a: PropTypes.number,
    onChange: PropTypes.func,
};

export default ColorPalette;
