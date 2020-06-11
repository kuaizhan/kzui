import * as React from 'react'
import classNames from 'classnames'
import KZUIComponent from '../base/component'
import './DatePanel.less'
import { baseDefaultProps } from '../base/component'

const secondsOfOneDay = 86400
const nameOfDays = ['日', '一', '二', '三', '四', '五', '六']
const nameOfMonths = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
]
const todayDate = new Date()

const getEndDateOfMonth = (year, month) => {
  const nextMonth = new Date(year, month + 1, 1)
  return new Date(nextMonth.getTime() - secondsOfOneDay).getDate()
}

const getWeekIndex = (year, month, date) => {
  // 获取当前日期的周信息，信息模板为weekData
  const weekData = {
    year,
    week: 1,
    weekMonday: ''
  }
  const firstDateOfyear = new Date(year, 0, 1)
  const selectTime = new Date(year, month, date)
  const firstMonTimeOfyear =
    firstDateOfyear.getTime() -
    ((firstDateOfyear.getDay() > 0 ? firstDateOfyear.getDay() : 7) - 1) *
      secondsOfOneDay *
      1000
  const thisWeekMondayTime = new Date(
    selectTime.getTime() -
      ((selectTime.getDay() > 0 ? selectTime.getDay() : 7) - 1) *
        secondsOfOneDay *
        1000
  )

  weekData.week =
    parseInt(
      String(
        (selectTime.getTime() - firstMonTimeOfyear) /
          (secondsOfOneDay * 7 * 1000)
      ),
      10
    ) + 1
  weekData.weekMonday = `${thisWeekMondayTime.getFullYear()}-${thisWeekMondayTime.getMonth() +
    1}-${thisWeekMondayTime.getDate()}`

  if (month === 11 && date >= 25) {
    // 最后一个月的几天不满一周为下一年的第一周
    const selectTimeDay = selectTime.getDay() > 0 ? selectTime.getDay() - 1 : 6
    if (date - 25 !== selectTimeDay) {
      weekData.year = year + 1
      weekData.week = 1
      return weekData
    }
  }

  return weekData
}

const checkToday = (year, month, date) =>
  year === todayDate.getFullYear() &&
  month === todayDate.getMonth() &&
  date === todayDate.getDate()

interface DateButtonProps {
  className?: string
  onClick?: (date: DateButtonProps['date']) => void
  date: {
    year: number
    month: number
    date: number
  }
  children: number | string
  selected?: boolean
  included?: boolean
  index?: number
  onMouseOver?: (index?: number) => void
}

class DateButton extends KZUIComponent<
  DateButtonProps,
  {
    selected: DateButtonProps['selected']
    included: DateButtonProps['included']
    index: DateButtonProps['index']
  }
> {
  static defaultProps = {
    ...baseDefaultProps,
    className: '',
    onClick: null
  }

  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.selected,
      included: this.props.included,
      index: this.props.index
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      selected: nextProps.selected,
      included: nextProps.included,
      index: nextProps.index
    })
  }

  handleClick () {
    if (this.props.className !== '') {
      this.props.onClick(this.props.date)
      this.setState({
        selected: !this.state.selected
      })
    }
  }

  render () {
    const clsPrefix = 'kui-date-picker'
    const { year, month, date } = this.props.date
    const className = this.props.className
    const { selected, included } = this.state
    const cls = [`${clsPrefix}-date-button`, `${clsPrefix}-${className}`]
    if (checkToday(year, month, date)) {
      cls.push(`${clsPrefix}-today`)
    }

    const clspadding = classNames(
      {
        [cls.join('-selected ')]: selected && className !== '',
        [cls.join('-included ')]: included && className !== '',
        [cls.join('-legal ')]: className !== ''
      },
      className
    )

    const clsicon = classNames(
      {
        [cls.join('-includedcon ')]: included && className !== ''
      },
      cls.join(' ')
    )

    return (
      <div
        className={clsicon}
        onClick={this.handleClick}
        onMouseOver={() => {
          if (this.props.className !== '') {
            this.props.onMouseOver?.(this.state.index)
          } else {
            this.props.onMouseOver?.(32)
          }
        }}
      >
        <div className={clspadding}>{this.props.children}</div>
      </div>
    )
  }
}

// DateButton.defaultProps = {
//     className: '',
//     onClick: null,
// };

// DateButton.propTypes = {
//     className: PropTypes.string,
//     onClick: PropTypes.func,
//     date: PropTypes.shape({
//         year: PropTypes.number.isRequired,
//         month: PropTypes.number.isRequired,
//         date: PropTypes.number.isRequired,
//     }).isRequired,
//     children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
// };

interface DatePanelProps {
  value?: string | number
  minDate?: string
  maxDate?: string
  onChange?: (value?: string, index?: number) => void
  valueAno?: number | string
  hoverArr?: any[]
  index?: number[]
  indexOther?: number[]
  onCollapse?: () => void
  pos?: number
  onPanelChange?: (year: number, month: number) => void
  refresh?: boolean
}

class DatePanel extends KZUIComponent<
  DatePanelProps,
  {
    hoverArr: DatePanelProps['hoverArr']
    year: number
    month: number
    date: Date | number
    monthAno: number
    yearAno: number
    minDate: Date
    maxDate: Date
    indexArr?: number[] | null
    indexOther: number[]
  }
> {
  static defaultProps = {
    ...baseDefaultProps,
    value: null,
    minDate: '1970-1-1',
    maxDate: '2117-12-31'
  }
  constructor (props: DatePanelProps) {
    super(props)
    this.autoBind(
      'handleDateSelect',
      'handleYearIncrease',
      'handleYearDecrease',
      'handleMonthIncrease',
      'handleMonthDecrease',
      'handleOver',
      'handleOut'
    )

    const date = props.value ? new Date(props.value) : todayDate
    const dataAno = props.valueAno ? new Date(props.valueAno) : todayDate
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      monthAno: dataAno.getMonth(),
      yearAno: dataAno.getFullYear(),
      hoverArr: props.hoverArr,
      minDate: new Date(props.minDate),
      maxDate: new Date(props.maxDate),
      indexArr: typeof props.index !== 'undefined' ? props.index.sort() : null,
      indexOther: props.indexOther
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextState === this.state)
  }

  componentWillReceiveProps (nextProps) {
    const date = nextProps.value ? new Date(nextProps.value) : todayDate
    const dataAno = nextProps.valueAno
      ? new Date(nextProps.valueAno)
      : todayDate
    let hover = this.state.hoverArr
    if (nextProps.refresh) {
      hover = []
    }

    this.setState({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      indexArr: nextProps.index,
      indexOther: nextProps.indexOther,
      monthAno: dataAno.getMonth(),
      yearAno: dataAno.getFullYear(),
      hoverArr: hover
    })
  }

  handleDateSelect (data) {
    const { year, month, date, index } = data
    if (this.props.onChange) {
      this.props.onChange(`${year}-${month + 1}-${date}`, index)
    }

    this.setState(
      {
        year,
        month,
        date
      },
      () => {
        if (
          typeof this.state.indexArr === 'undefined' ||
          this.state.indexArr === null
        )
          return
        if (
          this.state.indexArr.length === 2 ||
          (this.state.indexArr.length === 1 &&
            this.state.indexOther.length === 1)
        ) {
          this.props.onCollapse?.()
        }
      }
    )
  }

  handleOver (index) {
    const { indexArr, indexOther } = this.state

    if (typeof indexArr === 'undefined' || indexArr === null) return
    //  if we already chosen two buttons, nothing to do
    if (indexArr.length === 2) return
    //  else we need to update hover array
    const hover = []

    if (indexArr.length === 0 && indexOther.length === 1) {
      /*  if we already chose on date from another panel but not chose any button on myself
            we should hover all the datebtn from index to the end or from start to index.
            if we are in 1st panel => hover from index+1 to the end
            if we are in 2nd panel => hover from 1 to index */
      if (this.props.pos === 1) {
        hover[0] = index + 1
        hover[1] = 32
      } else {
        hover[0] = 1
        hover[1] = index
      }
    } else if (index > indexArr[0]) {
      /*  if we have chosen one button in this panel,
            update hover arr depends on the newer hover one's pos   */
      hover[0] = indexArr[0] + 1
      hover[1] = index
    } else {
      hover[0] = index + 1
      hover[1] = indexArr[0]
    }

    this.setState({
      hoverArr: hover
    })
  }

  /*  if already have chosen on button in this panel and we move out,
    that means we want to chose another datebtn in another panel,
    we need to hover all the left datebtn in this panel */
  handleOut () {
    const { indexArr, indexOther } = this.state
    const hover = []

    if (typeof indexArr === 'undefined' || indexArr === null) return

    if (indexArr.length === 1 && indexOther.length === 0) {
      if (this.props.pos === 1) {
        hover[0] = indexArr[0] + 1
        hover[1] = 32
      } else {
        hover[0] = 1
        hover[1] = indexArr[0]
      }
    }

    this.setState({
      hoverArr: hover
    })
  }

  updateYear (year) {
    if (
      year >= this.state.minDate.getFullYear() &&
      year <= this.state.maxDate.getFullYear()
    ) {
      this.setState(
        {
          year
        },
        () => {
          this.props.onPanelChange(this.state.year, this.state.month)
        }
      )
    }
  }

  updateMonth (month) {
    if (month > -1 && month < 12) {
      this.setState(
        {
          month
        },
        () => {
          this.props.onPanelChange(this.state.year, this.state.month)
        }
      )
    }
  }

  handleYearIncrease () {
    this.updateYear(this.state.year + 1)
  }

  handleYearDecrease () {
    this.updateYear(this.state.year - 1)
  }

  handleMonthIncrease () {
    this.updateMonth(this.state.month + 1)
  }

  handleMonthDecrease () {
    this.updateMonth(this.state.month - 1)
  }

  render () {
    const clsPrefix = 'kui-date-picker'
    const { className, style, pos } = this.props
    const cls = classNames(clsPrefix, className)
    const {
      year,
      month,
      date,
      indexArr,
      hoverArr,
      monthAno,
      yearAno
    } = this.state
    // const monthDif = Math.abs(monthAno - month);
    // const yearDif = Math.abs(yearAno - year);

    // const clsHide1 = classNames({ [`${clsPrefix}--hidden`]: monthDif <= 1 && yearDif <= 0 && pos === 1 });
    // const clsHide2 = classNames({ [`${clsPrefix}--hidden`]: monthDif <= 1 && yearDif <= 0 && pos === 2 });
    // const clsyearHide1 = classNames({ [`${clsPrefix}--hidden`]: (yearDif < 1 || (yearDif === 1 && month >= monthAno)) && pos === 1 });
    // const clsyearHide2 = classNames({ [`${clsPrefix}--hidden`]: (yearDif < 1 || (yearDif === 1 && month <= monthAno)) && pos === 2 });

    const firstDay = new Date(year, month, 1).getDay()
    const endDate = getEndDateOfMonth(year, month)
    const list = []

    // prev month
    if (firstDay !== 0) {
      const prevMonthYear = month > 0 ? year : year - 1
      const prevMonth = month > 0 ? month - 1 : 11
      const endDateOfPrevMonth = getEndDateOfMonth(prevMonthYear, prevMonth)

      for (let i = firstDay; i > 0; i -= 1) {
        const idate = endDateOfPrevMonth - (i - 1)
        list.push({
          year: prevMonthYear,
          month: prevMonth,
          date: idate,
          text: idate,
          className: '',
          index: i
        })
      }
    }
    // cur month
    for (let i = 1; i <= endDate; i += 1) {
      list.push({
        year,
        month,
        date: i,
        text: i,
        className: i === date ? 'cur-month cur-date' : 'cur-month',
        index: i
      })
    }

    // next month
    if (list.length < 42) {
      const nextMonthYear = month < 11 ? year : year + 1
      const nextMonth = month < 11 ? month + 1 : 0
      const nextMonthDays = 42 - list.length

      for (let i = 1; i <= nextMonthDays; i += 1) {
        list.push({
          year: nextMonthYear,
          month: nextMonth,
          date: i,
          text: i,
          className: '',
          index: i
        })
      }
    }

    return (
      <div className={cls} style={style} onMouseOut={this.handleOut}>
        <header>
          <span className={`${clsPrefix}-left-controls`}>
            <span onClick={this.handleYearDecrease}>&lt;&lt;</span>
            <span onClick={this.handleMonthDecrease}>&lt;</span>
          </span>
          <span className={`${clsPrefix}-current-month`}>
            <span className={`${clsPrefix}-month`}>{nameOfMonths[month]}</span>
            <span className={`${clsPrefix}-year`}>{year}</span>
          </span>
          <span className={`${clsPrefix}-right-controls`}>
            <span onClick={this.handleMonthIncrease}>&gt;</span>
            <span onClick={this.handleYearIncrease}>&gt;&gt;</span>
          </span>
        </header>
        <div className={`${clsPrefix}-title`}>
          {nameOfDays.map((text, key) => (
            <span className={`${clsPrefix}-day-title`} key={`title-${key}`}>
              {text}
            </span>
          ))}
        </div>
        <div className={`${clsPrefix}-date-table`}>
          {list.map((item, key) => (
            <DateButton
              key={`date-${key}`}
              className={item.className}
              date={item}
              index={item.index}
              onClick={this.handleDateSelect}
              onMouseOver={this.handleOver}
              selected={
                indexArr !== null &&
                typeof indexArr !== 'undefined' &&
                indexArr.indexOf(item.index) !== -1 &&
                item.className !== ''
              }
              included={
                hoverArr !== null &&
                typeof hoverArr !== 'undefined' &&
                item.index >= hoverArr[0] &&
                item.index < hoverArr[1]
              }
            >
              {item.text}
            </DateButton>
          ))}
        </div>
      </div>
    )
  }
}

export default DatePanel
