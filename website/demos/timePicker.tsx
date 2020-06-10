import * as React from 'react';
import { useState } from 'react';
import TimePicker from 'packages/kzui/src/components/time-picker'
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/date-picker.md'

const _code = `
\`\`\`js
    const [ chosenTime, setChosenTime ] = useState(Date.now())
    return (
      <>
        <div>
          <div>选择时间：{chosenTime}</div>
          <TimePicker 
            name='时间选择器'
            value={chosenTime}
            onChange={value => {
              setChosenTime(value.value)
            }}
          />
        </div>
      </>
    ) 
\`\`\`
`
const demo = {
  description: {
    title: '时间选择器',
    content: '通过 value、onChange 属性使组件受控。'
  },
  code: _code,
  reactCode: () => {
    const [ chosenTime, setChosenTime ] = useState<string>()

    function handleTimeChange(value) {
      const { hour, minute, second } = value;
      const timeStr = `${hour}:${minute}:${second}`
      setChosenTime(timeStr)
    }
    return (
      <>
        <div>
          <div>选择时间：{chosenTime}</div>
          <TimePicker 
            name='时间选择器'
            value={chosenTime}
            onChange={opt => {
                handleTimeChange(opt.value)
            }}
          />
        </div>
      </>
    ) 
  }
}


const TimePickerDemo = () => {
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

export { TimePickerDemo }