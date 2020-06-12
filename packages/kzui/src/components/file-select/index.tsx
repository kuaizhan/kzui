/**
 * @description 文件选择组件
 */
import React from 'react'
import classNames from 'classnames'
import KZUIComponent, { baseDefaultProps } from '../base/component'
import Icon from '../icon/index'
import Button from '../button/index'
import ImageCard from './image-card'
import './style.less'
import { IconTypes } from '../../../types/base/icon-types'

interface FileSelectProps {
  disabled?: boolean //是否禁用,
  last?: boolean //是否是最后一个按钮,
  accept?: string //文件类型MIME,
  multiple?: boolean //是否支持多选,
  maxFileSize?: number //单个文件最大尺寸，以字节计,
  maxFileCount?: number //可选取的文件数目
  buttonText?: string
  onChange?: (files: any[]) => void // TODO
  fileList?: any[] // TODO
  iconClass?: string
  type?: IconTypes
}

const getBase64 = file => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      resolve(e.target.result)
    }
  })
}

class FileSelect extends KZUIComponent<FileSelectProps> {
  fileInput: HTMLInputElement

  static defaultProps = {
    ...baseDefaultProps,
    iconClass: '',
    accept: '*/*',
    last: false,
    disabled: false,
    multiple: false,
    maxFileSize: 4194304, // 4MB
    maxFileCount: 1,
    onChange: null,
    onError: null,
    buttonText: undefined,
    fileList: []
  }
  
  constructor (props) {
    super(props)
    this.autoBind('handleChange', 'handleClick', 'handleDelete')
  }

  handleClick () {
    if (!this.props.disabled) {
      this.fileInput.click()
    }
  }

  handleChange () {
    const files = this.fileInput.files
    if (this.props.multiple && files.length > this.props.maxFileCount) {
      return this.raiseError(1, '超过文件选择上限')
    }

    let file
    for (let i = 0; i < files.length; i += 1) {
      file = files[i]
      if (this.props.maxFileSize && file.size > this.props.maxFileSize) {
        return this.raiseError(2, '超过大小上限')
      }
    }

    const arrayFiles = Array.from(files)

    Promise.all(
      arrayFiles.map((file, index) =>
        // @ts-ignore
        getBase64(file).then(url => (arrayFiles[index].url = url))
      )
    ).then(() => {
      if (this.props.onChange) {
        this.props.onChange([...this.props.fileList, ...arrayFiles])
      }
    })
  }

  handleDelete (index) {
    const newArrayFiles = [...this.props.fileList]
    newArrayFiles.splice(index, 1)
    this.props.onChange(newArrayFiles)
  }

  render () {
    const clsPrefix = 'kui-file-select'
    const {
      className,
      style,
      iconClass,
      type,
      buttonText,
      fileList
    } = this.props
    const cls = classNames(clsPrefix, className)
    return (
      <div className={cls} style={style}>
        {fileList.map((file, index) => (
          <ImageCard
            className={`${clsPrefix}-upload`}
            url={file.url}
            onDelete={() => this.handleDelete(index)}
          />
        ))}
        <div onClick={this.handleClick} className={`${clsPrefix}-upload`}>
          {this.props.children ? (
            this.props.children
          ) : (
            <Button type='confirm' last={this.props.last}>
              {iconClass && <Icon iconClass={iconClass} type={type} />}
              {buttonText}
            </Button>
          )}
        </div>
        <input
          className={`${clsPrefix}-input`}
          ref={this.storeRef('fileInput')}
          type='file'
          accept={this.props.accept}
          multiple={this.props.multiple}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default FileSelect
