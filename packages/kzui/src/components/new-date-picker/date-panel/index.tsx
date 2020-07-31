import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DateButton } from '../date-button';
import './style.less';

interface DatePanelProps {
  year?: number,
  month?: number,
  type?: 'range' | 'normal',
  selected?: string[],
  onChange?: (value: string) => void,
  goPreMouth?: () => void,
  goPreYear?: () => void,
  goNextMouth?: () => void,
  goNextYear?: () => void
}

interface DateList {
  disable: boolean,
  hover: boolean,
  selected: boolean,
  included: boolean,
  date: string,
  text: string,
}

const nameOfDays = ['一', '二', '三', '四', '五', '六', '日'];
const today = dayjs();
const clsPrefix = 'kzui-date-panel';

export const DatePanel: React.FC<DatePanelProps> = ({
  year=today.year(),
  month=today.month() + 1,
  onChange = () => null,
  selected,
  goPreMouth= () => null,
  goNextMouth= () => null,
}) => {

  const [dateList, setDateList] = useState<DateList[]>([]);

  function createDateList() {
    const curDayjs = dayjs(`${year}-${month}-1`);
    const firstMonthDate = curDayjs.day()? curDayjs.day() - 1 : 6;
    const preMonthLength = dayjs(`${year}-${month - 1}-1`).daysInMonth();
    
    const _dateList = [];

    for(let i = firstMonthDate; i > 0; i--) {
      _dateList.push({
        disable: true,
        date: `${year}-${month - 1}-${preMonthLength - i}`,
        text: preMonthLength - i,
      })
    }
    
    for(let i = 1; i <= curDayjs.daysInMonth(); i++) {
      const dateStr = `${year}-${month}-${i}`;
      _dateList.push({
        disable: false,
        date: `${year}-${month}-${i}`,
        text: i,
        selected: Array.isArray(selected) && selected.includes(dateStr),
      })
    }

    for(let i = 1; _dateList.length < 42; i++) {
      _dateList.push({
        disable: true,
        date:`${year}-${month + 1}-${i}`,
        text: i,
      })
    }
    console.log(_dateList, '_dateList');
    setDateList(_dateList);
  }

  React.useEffect(() => {
    createDateList()
  }, [year, month, selected])

  function handleClick(e: React.MouseEvent) {
    e.persist();
    //@ts-ignore
    const _dataStr = e.target.getAttribute('data-value') || ''
    console.log(e, _dataStr, 'hanleClick')
    //@ts-ignore
    if (e.target.getAttribute('data-value')) {
      onChange(_dataStr);
    }
  }

  return (
    <div className={`${clsPrefix}`} >
      <div className={`${clsPrefix}__header`}>
        <div>
          <span>&lt;&lt;</span>
          <span style={{padding: '0 5px'}} onClick={() => goPreMouth()}>&lt;</span>
        </div>
        <div style={{fontSize: '14px', fontWeight: 'bold'}}>
          <span>2020年</span>
          <span>07月</span>
        </div>
        <div>
          <span style={{padding: '0 5px'}} onClick={() => goNextMouth()}>&gt;</span>
          <span>&gt;&gt;</span>
        </div>
      </div>
      <div className={`${clsPrefix}__body`} onClick={(e:React.MouseEvent) => handleClick(e)}>
        {nameOfDays.map(item => (
          <span className="nameofday">{item}</span>
        ))}
        {dateList.map(item => (
          <DateButton
            key={item.date}
            value={item.date}
            text={item.text}
            notCurMonth={item.disable}
            today={today.isSame(item.date, 'date')}
            selected={item.selected}
          />
        ))}
      </div>
    </div>
  )
}