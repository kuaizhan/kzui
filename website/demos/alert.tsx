import * as React from 'react'
import { useState } from 'react'
import Alert from 'packages/kzui/src/components/alert'
import DemoDisplayCard from '../components/DemoDisplayCard'
import Button from 'packages/kzui/src/components/button'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/alert.md';

const AlertDemo = () => {
  
  const demo = {
    description: {
      title: '一般用法',
      content: '点击按钮展示警告。'
    },
    code: `
const [isHide, setIsHide] = useState(true)
return (
  <>
    <Button onClick={() => setIsHide(false)}>点击按钮</Button>
    <Alert 
      hide={isHide}
      buttonText="确认"
      onClick={() => setIsHide(false)}
    >  
      This is an Alert!
    </Alert>
  </>
)
    `,
    reactCode: () => {
      const [isHide, setIsHide] = useState(true)
      return (
        <>
          <Button onClick={() => setIsHide(false)}>点击按钮</Button>
          <Alert 
            hide={isHide}
            buttonText="确认"
            onClick={() => setIsHide(true)}
          >  
            This is an Alert!
          </Alert>
        </>
      )
    }
  }
  return(
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

export { AlertDemo };