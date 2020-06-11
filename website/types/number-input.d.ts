import * as React from 'react'
import { KZUIComponent, UiSizeType } from './base/index'

interface NumberInputProps extends KZUIComponent {
  size?: UiSizeType,
  disabled?: boolean,
  error?: boolean,
  name?: string,
  value?: number,
  step?: number,
  min?: number,
  max?: number,
  onChange?: (props: { value: number, name?: string }) => void,
}
export declare class NumberInput extends React.Component<NumberInputProps> {}
