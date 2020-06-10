import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class TextAreaProps<T = string> extends KZUIComponent {
  error?: boolean
  name?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (e: { name?: string, value: string }) => void
  onKeyPress?: (e: Event) => void
  maxLength?: number
}

export declare class TextArea<T = string> extends React.Component<TextAreaProps<T>> {}
