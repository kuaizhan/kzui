import * as React from 'react';
import './style.less';

interface DateButtonProps {
  notCurMonth?: boolean,
  disable?: boolean,
  hover?: boolean,
  included?: boolean, 
  selected?: boolean,
  today?: boolean,
  text?: string,
  value?: string,
  onMouseOver?: (value: string) => void,
}

export const DateButton:React.FC<DateButtonProps> = ({
  notCurMonth=false,
  disable= false,
  hover= false,
  included= false,
  selected= false,
  today= false,
  text="",
  value="",
  onMouseOver=() => null,
}) => {

  function messageClass() {
    const classArr = [];
    switch(true) {
      case disable :
        classArr.push('disable');
        break;
      case notCurMonth:
        classArr.push('not-curmonth');
        break;
      case selected: 
        classArr.push('selected');
        break;
      case hover:
        classArr.push('hover');
        break;
      case included:
        classArr.push('included');
        break;
      default: break;
    }
    return classArr.toString().replace(/,/g, ' ');
  }

  return (
    <div
      className={`date-button ${messageClass()}`}
      data-value={value}
      onMouseOver={(e: React.MouseEvent) => onMouseOver(value)}
    >
      <div className={`date-button-text ${today? 'today': ''}`} data-value={value}>
        {text}
      </div>
    </div>
  )
}