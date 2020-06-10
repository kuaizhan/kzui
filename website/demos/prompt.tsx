import * as React from 'react'
import prompt from 'packages/kzui/src/components/prompt'
import Button from 'packages/kzui/src/components/button'
import { DemoDisplayCard } from '../components'
import ReactMarkdown from  'react-markdown'
// @ts-ignore
import docContent from "../docs/prompt.md";

const demoList = [
  {
    description: {
      title: 'Prompt 提示',
      content: '弹出警告。'
    },
    code: `
\`\`\`js
  function handleClick() {
    prompt.alert('警告！', () => null)
  }
  return (
    <Button onClick={handleClick} type='confirm'>点击展示警告</Button>
  )
\`\`\`    
    `,
    reactCode: () => {
      function handleClick() {
        prompt.alert('警告！', () => null)
      }
      return (
        <Button onClick={handleClick} type='confirm'>点击展示警告</Button>
      )
    }
  },
  {
    description: {
      title: 'Prompt 提示',
      content: '弹出确认框。'
    },
    code: `
\`\`\`js
  function handleClick() {
    prompt.confirm('你确定吗？', () => null, () => null)
  }
  return (
    <Button onClick={handleClick} type='confirm'>点击展示警告</Button>
  )
\`\`\`    
    `,
    reactCode: () => {
      function handleClick() {
        prompt.confirm('你确定吗？', () => null, () => null)
      }
      return (
        <Button onClick={handleClick} type='confirm'>点击展示确认框</Button>
      )
    }
  }
]

const PromptDemo = () => {
  return (
    <div>
      {
        demoList.map((demo, index) => (
          <DemoDisplayCard
            description={demo.description}
            code={demo.code}
            key={index}
          >
            {demo.reactCode()}
          </DemoDisplayCard>
        ))
      }
      <ReactMarkdown source={docContent} />
    </div>
  )
}

export { PromptDemo }
