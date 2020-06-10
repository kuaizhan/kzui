import * as React from 'react'
import { KZUIComponent, UiSizeType } from './base/index'
import { ReactNode } from 'react'

export declare class StepsProps extends KZUIComponent {
  size?: UiSizeType
  curStep?: number
  stepTitles?: Array<string>
  children?: Array<ReactNode>
}

export declare class Steps extends React.Component<StepsProps> {}
