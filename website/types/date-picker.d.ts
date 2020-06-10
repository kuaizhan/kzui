import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class DatePickerProps extends KZUIComponent {
  value?: number | string //时间戳或时间字符串
  minDate?: string //时间字符串
  maxDate?: string //时间字符串
  onChange?: (props: {name: string, value: string}) => void // 改变时间
}
export declare class DatePicker extends React.Component<DatePickerProps> {}