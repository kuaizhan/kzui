import * as React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import Input from '../input';
import Icon from '../icon';
import PopTip from '../_poptip';
import { DatePanel } from './date-panel';
import './style.less';

interface DatePickerProps {
  value?: string
}

const clsPrefix = 'kzui-data-picker'
const DataPicker:React.FC<DatePickerProps> = ({
  value
}) => {

  const [expand, setExpand] = useState(false);
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [_value, setValue] = useState('');

  useEffect(() => {

  }, [value])

  return (
    <div>
      <PopTip
        isPopover
        theme='light'
        trigger='click'
        visible={expand}
        style={{ width: 'auto', zIndex: 999999 }}
        tipStyle={{padding: '0'}}
        onVisibleChange={visible => setExpand(visible)}
        tip={
          <div style={{display: 'flex'}}>
            <DatePanel
              selected={[_value]}
              onChange={value => setValue(value)}
            />
            <DatePanel />
          </div>
          
        }
      >
        <div className={`${clsPrefix} ${expand? 'focused': ''}`}>
          <Input
            value={_value}
            className={`${clsPrefix}__input`}
            onChange={e => setValue(e.value)}
            placeholder="请选择日期"
          />
          <Icon type='calendar' style={{color: '#cfced4'}}/>
        </div>
      </PopTip>
    </div>
  )
}

export default DataPicker