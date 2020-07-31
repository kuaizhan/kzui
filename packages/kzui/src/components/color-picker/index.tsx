import * as React from 'react'
import classNames from 'classnames'
import Button from '../button';
import KZUIComponent, { baseDefaultProps } from '../base/component'
import ColorPalette from './color-palette'
import ColorList from './color-list'
import './style.less'
import { DimensionType } from '../../../types/base'

interface ColorPickerProps {
  dimensions?: DimensionType //坐标尺寸,
  hide?: boolean //是否隐藏,
  hex?: string //初始色值,
  a?: number //初始透明度,
  recommendColors?: Array<string> //推荐颜色,
  recommendThemeColors?: Array<string> // 推荐主题色,
  recentColors?: Array<string> //最近使用色,
  type?: 'simple' | 'full' //拾色器类型
  onChange?: (hex: string, a: number) => void // 颜色改变
  onBlur?: (e?: MouseEvent, oldHex?: string) => void // 失去焦点
  onConfirm?: () => void
  onCancel?: (oldHex: string) => void
}

// 简拾色器 title
/* const ColorTitle = props => (
 *     <div className="color-title">{props.title}</div>
 * );
 *
 * ColorTitle.defaultProps = {
 *     title: '颜色选择',
 * };
 *
 * ColorTitle.propTypes = {
 *     title: PropTypes.string,
 * }; */

class ColorPicker extends KZUIComponent<
  ColorPickerProps,
  {
    hex?: string
    a?: number
  }
  > {
  colorPicker: HTMLElement
  oldHex: string

  static defaultProps = {
    ...baseDefaultProps,
    type: 'simple',
    hex: '#ff0000',
    a: 100,
    onChange: null,
    onBlur: null,
    recommendColors: [
      '#d2000d',
      '#f7a700',
      '#f9e900',
      '#8c5725',
      '#7bd500',
      '#3f7600',
      '#bf00e3',
      '#9100ff',
      '#468ee5',
      '#47e4c2',
      '#b7eb81',
      '#000000',
      '#4a4a4a',
      '#9b9b9b',
      '#c5c5c5',
      '#ffffff',
    ],
    recommendThemeColors: [
      '#d2000d',
      '#f7a700',
      '#f9e900',
      '#8c5725',
      '#7bd500',
      '#3f7600',
      '#bf00e3',
      '#9100ff',
      '#468ee5',
      '#47e4c2',
      '#b7eb81',
      '#000000',
      '#4a4a4a',
      '#9b9b9b',
      '#c5c5c5',
      '#ffffff'
    ],
    recentColors: [
      '#d2000d',
      '#f7a700',
      '#f9e900',
      '#8c5725',
      '#7bd500',
      '#3f7600',
      '#bf00e3'
    ]
  }

  constructor(props) {
    super(props);
    this.autoBind('handlePaletteChange', 'handleClickList', 'handleBlur');
    this.state = {
      a: props.a,
      hex: props.hex,
    };
    this.oldHex = '';
  }

  initStateFromProps(props) {
    return {
      hex: props.hex,
      a: props.a,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.hide && !nextProps.hide) {
      this.oldHex = nextProps.hex;
    }
    return nextProps.hex !== this.props.hex ||
      nextProps.hide !== this.props.hide ||
      nextState.hex !== this.state.hex;
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBlur, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBlur, false);
  }



  handleBlur(e) {
    if (!this.colorPicker.contains(e.target) && !this.props.hide) {
      if (this.props.onBlur) {
        setTimeout(() => {
          this.props.onBlur(e, this.oldHex);
        }, 0);
        // this.props.onBlur(e, this.oldHex);
      }
    }
  }


  handlePaletteChange(hex, a) {
    if (this.props.onChange) {
      this.props.onChange(hex, a);
    }
  }

  handleClickList(hex, a = 100) {
    this.setState({
      hex,
      a,
    });

    if (this.props.onChange) {
      this.props.onChange(hex, a);
    }
  }

  render() {
    const clsPrefix = 'kui-color-picker';
    const {
      className,
      style,
      type,
      hide,
      recommendColors,
      recommendThemeColors,
      dimensions,
      onConfirm,
      onCancel,
    } = this.props;
    const cls = classNames(clsPrefix, {
      // [`${clsPrefix}-cpe-simple`]: type === 'simple',
      [`${clsPrefix}-hide`]: hide,
    }, className);

    const colorPickerStyle = {
      ...dimensions,
      ...style,
    };

    let mainJSX;

    if (this.props.type === 'simple') {
      mainJSX = (
        <div className={`${clsPrefix}-cpr-simple`}>
          <div className={`${clsPrefix}-title`}>颜色推荐</div>
          <ColorList
            onChange={this.handleClickList}
            list={recommendColors}
            type="simple"
          />
          <div className={`${clsPrefix}-title`}>颜色自定义</div>
          <ColorPalette
            hex={this.state.hex}
            a={this.state.a}
            onChange={this.handlePaletteChange}
            type="simple"
          />
        </div>
      );
    } else {
      mainJSX = (
        <div className={`${clsPrefix}-cpr-full`}>
          <ColorPalette
            hex={this.state.hex}
            a={this.state.a}
            onChange={this.handlePaletteChange}
            type="full"
          />
          <ColorList
            list={recommendThemeColors}
            onChange={this.handleClickList}
            title="主题推荐色"
            type="full"
          />
          <ColorList
            list={this.props.recentColors}
            onChange={this.handleClickList}
            title="最近使用色"
            type="full"
          />
        </div>

      );
    }
    return (
      <div
        style={colorPickerStyle}
        className={cls}
        ref={this.storeRef('colorPicker')}
      >
        <div className={`${clsPrefix}-cpr-container`}>
          {mainJSX}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
            {onCancel ?
              <Button
                type="normal"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCancel(this.oldHex);
                }}
              >取消</Button> : null
            }
            {onConfirm ?
              <Button
                type="confirm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation()
                  onConfirm();
                }}
              >确定</Button> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker
