import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Input from '../../input';
import Icon from '../../icon';
import './style.less'

interface DateRangeInputProps {
  value?: DateRangeValue,
  onChange?: (value: DateRangeValue) => void,
  format?: string,
}

interface DateRangeValue {
  start: string,
  end: string,
}

const clsPrefix = 'kzui-date-range';

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  value,
  format="YYYY-MM-DD",
  onChange=() => null,
}) => {

  const [_value, setValue] = useState<DateRangeValue>();
  const [fixKey, setFixKey] = useState<"start" | "end">('start');

  useEffect(() => {
    setValue(sortDate(value))
  }, [value])

  function sortDate(curValue: DateRangeValue): DateRangeValue {
    const start = curValue?.start? dayjs(curValue?.start) : undefined;
    const end = curValue?.end? dayjs(curValue?.end) : undefined;

    if (start?.isValid() && end?.isValid()) {
      const isSore = start.isBefore(end, 'date');
      return {
        start: isSore? curValue.start : curValue.end,
        end: isSore? curValue.end : curValue.start,
      }
    }

    return {
      ...curValue
    }
  }

  function handleOnChange(curValue: DateRangeValue) {
    console.log(curValue, 'handleOnChange');
    const newValue = sortDate(curValue);
    onChange({
      start: newValue.start && dayjs(newValue.start).isValid()? dayjs(newValue.start).format(format) : newValue.start,
      end: newValue.end && dayjs(newValue.end).isValid()? dayjs(newValue.end).format(format) : newValue.end,
    })
  }

  console.log(_value, sortDate(value), fixKey, 'dateRangeInput')

  return (
    <div className={clsPrefix}>
      <div className={`${clsPrefix}__input-wrap`}>
        <Input
          value={_value?.start}
          placeholder="请选择日期"
          className={`${clsPrefix}__input start ${fixKey === 'start'? 'focused' : ''}`}
          onFocus={() => setFixKey('start')}
          onBlur={e => handleOnChange({..._value, start: e.value})}
          onChange={e => setValue({..._value, start: e.value})}
        />
        <Input
          value={_value?.end}
          placeholder="请选择日期"
          className={`${clsPrefix}__input end ${fixKey === 'end'? 'focused' : ''}`}
          onFocus={() => setFixKey('end')}
          onBlur={e => handleOnChange({..._value, end: e.value})}
          onChange={e => setValue({..._value, end: e.value})}
        />
        <Icon type='calendar' style={{color: '#cfced4'}}/>
      </div>
    </div>
  )
}