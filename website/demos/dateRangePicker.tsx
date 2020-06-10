import * as React from 'react';
import { useState } from 'react';
import DateRangePicker from 'packages/kzui/src/components/date-range-picker';
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/date-range-picker.md'

const _code = `
\`\`\`js
  const [start, setStart] = useState('')
  const [end, setEnd] =useState('')
  return (
    <>
      <div>选择日期：{start} ~ {end}</div>
      <DateRangePicker
        name='date-range'
        onChange={(value) => {
          setStart(value.start)
          setEnd(value.end)
        }}
      /> 
    </>
  )
\`\`\`
`
const demo = {
  description:{
    title: '日期范围选择',
    content: '最简单的用法。'
  },
  code: _code,
  reactCode: () => {
    const [start, setStart] = useState('2020-2-13')
    const [end, setEnd] =useState('2020-2-14')
    return (
      <>
        <div>选择日期：{start} ~ {end}</div>
        <DateRangePicker
          start={start}
          end={end}
          name='date-range'
          onChange={(value) => {
            setStart(value.start)
            setEnd(value.end)
          }}
        /> 
      </>
    )
  }

}

const DateRangePickerDemo = () => {
  return (
    <div>
      <DemoDisplayCard
        description={demo.description}
        code={demo.code}
      >
        {demo.reactCode()}
      </DemoDisplayCard>
      <ReactMarkdown source={docContent} />
    </div>
  )
}

export { DateRangePickerDemo }