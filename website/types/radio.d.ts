import * as React from 'react'
import { KZUIComponent } from './base/index'


interface RadioProps extends KZUIComponent {
  disabled?: boolean
  name?: string
  checked?: boolean
  onClick: (arg: RadioProps) => void
  type?: 'radio' | 'button'
}

export declare class Radio extends React.Component<RadioProps> {}
