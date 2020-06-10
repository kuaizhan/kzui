import * as React from 'react'
import { KZUIComponent } from './base/index'

interface SwitchProps extends KZUIComponent {
  disabled: boolean,
  name: string,
  on: boolean,
  onChange: (props: { on?: boolean, name?: string }) => void,
}

export declare class Switch extends React.Component<SwitchProps> {}
