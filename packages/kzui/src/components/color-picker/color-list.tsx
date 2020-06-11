import * as React from 'react'
import classNames from 'classnames'
import KZUIComponent, { baseDefaultProps } from '../base/component'

interface ColorListProps {
  type?: string
  title?: string
  list: string[]
  onChange: (color: string) => void
}

class ColorList extends KZUIComponent<
  ColorListProps,
  {
    list: ColorListProps['list']
  }
> {
  static defaultProps = {
    ...baseDefaultProps,
    type: 'simple',
    title: '主题推荐色',
    onChange: null
  }

  initStateFromProps (props: ColorListProps) {
    if (props.type === 'simple') {
      return {
        list: props.list.slice(0, 16)
      }
    }
    return {
      list: props.list
    }
  }

  render () {
    const clsPrefix = 'kui-color-picker'
    const { title, type } = this.props
    const cls = classNames(`${clsPrefix}-list`)
    const titleJSX =
      type === 'simple' ? (
        ''
      ) : (
        <div className={`${clsPrefix}-clt-title`}>{title}</div>
      )
    const containerClassName = `${clsPrefix}-clt-container ${clsPrefix}-clt-${type}`

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
                  onClick={() => {
                    this.props.onChange(color)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ColorList
