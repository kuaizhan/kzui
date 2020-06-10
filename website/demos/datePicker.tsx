import * as React from 'react';
import { useState } from 'react';
import DatePicker from 'packages/kzui/src/components/date-picker'
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/date-picker.md'

const _code = `
\`\`\`js
  const today =\`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}\`
  const [ chosenDate, setChosenDate ] = useState(today)
  return (
    <div>
      <div>选择时间：{chosenDate}</div>
      <DatePicker 
        name='日期选择器'
        value={chosenDate}
        onChange={value => {
          setChosenDate(value.value)
        }}
      />
    </div>
  ) 
\`\`\`
`
const demo = {
  description: {
    title: '日期选择器',
    content: '通过 value、onChange 属性使组件受控。'
  },
  code: _code,
  reactCode: () => {
    const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    const [ chosenDate, setChosenDate ] = useState(today)
    return (
      <>
        <div>
          <div>选择时间：{chosenDate}</div>
          <DatePicker 
            name='日期选择器'
            value={chosenDate}
            onChange={value => {
              setChosenDate(value.value)
            }}
          />
        </div>
      </>
    ) 
  }
}


const DatePickerDemo = () => {
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

export { DatePickerDemo }