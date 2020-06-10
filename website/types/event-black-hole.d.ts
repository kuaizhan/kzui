import * as React from 'react'
import { KZUIComponent } from './base/index'
interface EventBlackHoleProps extends KZUIComponent {
    captureEvents?: string[] // TODO 可以更加准确
}

export declare class EventBlackHole extends React.Component<EventBlackHoleProps> {}
