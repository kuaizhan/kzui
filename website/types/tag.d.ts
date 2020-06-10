import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class TagProps<T = string> extends KZUIComponent {
  value?: string //tag id,
  label?: string //tag名称,
  active?: boolean //初始状态是否选中,
  cancel?: boolean //选中后是否可取消,
  multi?: boolean //是否为多选,
  disabled?: boolean //是否禁用,
  removeAble?: boolean //是否可以删除,
  showOnly?: boolean //是否为展示标签
  onChange?: (v: T) => void
  onRemove?: (v: T) => void
}

export declare class Tag<T = string> extends React.Component<TagProps<T>> {}
