import * as React from 'react'
import { KZUIComponent, valueType, OptionListType } from './base/index';

interface RadioGroupProps<T = valueType> extends KZUIComponent {
  disable?: boolean
  name?: string
  value?: T
  options: OptionListType
  onChange?: (value: { value: T, name: string}) => void
  layout?: 'vertical' | 'horizontal'
  type?: 'radio' | 'button'
  radioStyle?: React.CSSProperties
}

export declare class RadioGroup<T> extends React.Component<RadioGroupProps<T>> {}
