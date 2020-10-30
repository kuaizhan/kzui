import * as React from 'react'
import classNames from 'classnames'
import KZUIComponent from '../base/component'
import Tag from '../tag'
import { StringObject } from '../../types'

interface TagSelectorProps {
  tags: string[]
  default?: number
  multi?: boolean
  onChange?: (props: Array<{ label: string; value: string }>) => void
  tagClassName?: string
  tagStyle?: React.CSSProperties
}

interface TagSelectorState {
    selected: StringObject<{ value?: string | number, label?: string }>
}

export default class TagSelector extends KZUIComponent<TagSelectorProps, TagSelectorState> {
  constructor (props) {
    super(props)
    this.autoBind('handleSelectTag')
  }

  initStateFromProps (props) {
    const key = props.default
    return {
      selected:
        key < 0
          ? {}
          : {
              [key]: {
                value: key,
                label: props.tags[key]
              }
            }
    }
  }

  handleSelectTag (tag) {
    const value = tag.value
    let data = {}
    if (this.props.multi) {
      if (Object.prototype.hasOwnProperty.call(this.state.selected, value)) {
        const temp = Object.assign({}, this.state.selected)
        delete temp[value]
        data = temp
        this.setState({
          selected: data
        })
      } else {
        data = Object.assign({}, this.state.selected, {
          [value]: tag
        })
        this.setState({
          selected: data
        })
      }
    } else {
      data = {
        [value]: tag
      }
      this.setState({
        selected: data
      })
    }
    if (this.props.onChange) {
      const arr = Object.keys(data).map(key => data[key])
      this.props.onChange(arr)
    }
  }

  render () {
    const clsPrefix = 'kui-tag-selector'
    const { className, style, tagClassName, tagStyle } = this.props
    const cls = classNames(clsPrefix, className)
    return (
      <div className={cls} style={style}>
        {this.props.tags.map((label, key) => (
          <Tag
            key={`${key}-${Object.prototype.hasOwnProperty.call(
              this.state.selected,
              key
            )}`}
            value={key}
            label={label}
            multi={this.props.multi}
            active={Object.prototype.hasOwnProperty.call(
              this.state.selected,
              key
            )}
            onChange={this.handleSelectTag}
            className={tagClassName}
            style={tagStyle}
          />
        ))}
      </div>
    )
  }
}

TagSelector.defaultProps = {
  // @ts-ignore
  tags: [],
  default: -1,
  multi: false,
  onChange: null,
  style: {},
  className: '',
  tagStyle: {},
  tagClassName: ''
}
