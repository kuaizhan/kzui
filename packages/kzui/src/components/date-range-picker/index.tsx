import * as React from 'react'
import classNames from 'classnames'
import KZUIComponent from '../base/component'
import PopTip from '../poptip'
import Icon from '../icon/index'
import DatePanel from '../date-picker/DatePanel'
import '../date-picker/style.less'
import './style.less'

interface DateRangePickerProps {
  start?: string //时间, 如2017-5-1,
  end?: string //时间, 如2020-2-11,
  name?: string
  onChange: (props: { start: string; end: string }) => void // 改变时间
  error?: boolean
  disabled?: boolean
}
interface DateRangePickerState {
  expand?: boolean
  refresh?: boolean
  start?: string
  end?: string
  result: [[number, number], [number, number]]
  startModify?: boolean
  endModify?: boolean
  value: string
}

class DateRangePicker extends KZUIComponent<
  DateRangePickerProps,
  DateRangePickerState
> {
  startModify: boolean
  endModify: boolean
  date_picker: HTMLElement

  constructor (props) {
    super(props)
    this.autoBind('handleSelect', 'handleClick', 'handleBlur')
  }

  initStateFromProps (props: DateRangePickerProps): DateRangePickerState {
    return {
      expand: false,
      start: props.start,
      end: props.end,
      result: [
        [-1, -1],
        [-1, -1]
      ],
      value: `${props.start} ~ ${props.end}`,
      startModify: false,
      endModify: false,
      refresh: false
    }
  }

  handleClick () {
    this.setState(
      {
        refresh: true
      },
      () => {
        if (this.state.expand === true) {
          this.setState({
            start: this.props.start,
            end: this.props.end,
            result: [
              [-1, -1],
              [-1, -1]
            ],
            value: `${this.props.start} ~ ${this.props.end}`,
            startModify: false,
            endModify: false
          })
        }
      }
    )
  }

  /*  to update the global data of daterangepicker
        @result[0] is the selected btns' index in panel1
        @result[1] is the selected btns' index in panel2
        @result[i][0] is the start btn's index in paneli
        @result[i][1] is the end btn's index in paneli
        @date is the input string type date
        @index is the btn's index
        @target indicates which panel is chosen
    */
  handleSelect (date, index, target) {
    let { start, end, startModify, endModify, value } = this.state
    const result = this.state.result

    if (!startModify && !endModify) {
      if (target === 0) {
        start = date
        result[target][0] = index
        startModify = true
      } else {
        end = date
        result[target][1] = index
        endModify = true
      }
    } else if (!startModify) {
      start = date
      result[target][0] = index
      startModify = true
    } else if (!endModify) {
      end = date
      result[target][1] = index
      endModify = true
    }

    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()

    value = startTime > endTime ? `${end} ~ ${start}` : `${start} ~ ${end}`

    this.setState({
      end,
      start,
      expand: !this.startModify || !this.endModify,
      value,
      result,
      startModify,
      endModify
    })

    if (startModify && endModify) {
      let finalStart = start
      let finalEnd = end

      if (startTime > endTime) {
        const t = finalStart
        finalStart = finalEnd
        finalEnd = t
      }

      this.props.onChange({
        start: finalStart,
        end: finalEnd
      })
    }
  }

  handlePanel (year, month, pos) {
    const { start, end } = this.state

    const val = `${year}-${month + 1}-1`
    if (pos === 0) {
      this.setState({
        start: val,
        value: `${val} ~ ${end}`,
        refresh: false
      })
    } else {
      this.setState({
        end: val,
        value: `${start} ~ ${val}`,
        refresh: false
      })
    }
  }

  handleBlur (e) {
    if (e.relatedTarget && this.date_picker.contains(e.relatedTarget)) {
      e.preventDefault()
      return
    }
    this.setState({
      ...this.state
    })
  }

  render () {
    const clsPrefix = 'kui-date-picker'
    const { className, error, disabled, style, name } = this.props
    const { result, value, start, end, refresh, expand } = this.state
    const cls = classNames(
      clsPrefix,
      {
        [`${clsPrefix}-error`]: error,
        [`${clsPrefix}-disabled`]: disabled
      },
      className
    )
    const index1 = result[0].filter(item => item !== -1)
    const index2 = result[1].filter(item => item !== -1)

    return (
      <div
        className={cls}
        style={style}
        onBlur={this.handleBlur}
        ref={this.storeRef('date_picker')}
      >
        <PopTip
          isPopover
          visible={expand}
          onVisibleChange={visible => this.setState({ expand: visible })}
          theme='light'
          trigger='click'
          className={`${clsPrefix}-date-range-panel`}
          placement='bottom-left'
          tip={
            <div className={cls}>
              <header className={`${clsPrefix}-date-header`}>
                <span>开始日期 ~ 结束日期</span>
              </header>
              <div className={`${clsPrefix}-date-panels`}>
                <DatePanel
                  value={start}
                  valueAno={end}
                  onChange={(date, index) => this.handleSelect(date, index, 0)}
                  onPanelChange={(year, month) =>
                    this.handlePanel(year, month, 0)
                  }
                  onCollapse={() => this.handleClick()}
                  index={index1}
                  pos={1}
                  indexOther={index2}
                  refresh={refresh}
                />
                <DatePanel
                  value={end}
                  valueAno={start}
                  onChange={(date, index) => this.handleSelect(date, index, 1)}
                  onPanelChange={(year, month) =>
                    this.handlePanel(year, month, 1)
                  }
                  onCollapse={() => this.handleClick()}
                  index={index2}
                  pos={2}
                  indexOther={index1}
                  refresh={refresh}
                />
              </div>
            </div>
          }
        >
          <div className={`${clsPrefix}-date-display`}>
            <input type='text' name={name} value={value} readOnly />
            <Icon type='calendar' />
          </div>
        </PopTip>
      </div>
    )
  }
}

// DateRangePicker.defaultProps = {
//     name: '',
//     onChange: () => {},
//     start: '',
//     end: '',
// };

// DateRangePicker.propTypes = {
//     name: PropTypes.string,
//     onChange: PropTypes.func,
//     start: PropTypes.string,
//     end: PropTypes.string,
// };

export default DateRangePicker
