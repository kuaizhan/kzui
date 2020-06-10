import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class TagSelectorProps<T = string> extends KZUIComponent {
  tags: string[]
  default?: number
  multi?: boolean
  onChange?: (props: Array<{ label: string, value: string }>) => void
}

export declare class TagSelector<T = string> extends React.Component<TagSelectorProps<T>> {}
