import * as React from 'react'
import { KZUIComponent } from './base/index'

interface DateRangePickerProps extends KZUIComponent {
  start?: string //时间, 如2017-5-1,
  end?: string //时间, 如2020-2-11,
  name?: string 
  onChange: ({
    name,
    value,
    start,
    end
  }) => void // 改变时间
}

export declare class DateRangePicker extends React.Component<DateRangePickerProps> {}
