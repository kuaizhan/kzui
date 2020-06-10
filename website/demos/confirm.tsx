import * as React from 'react'
import { useState } from 'react' 
import { DemoDisplayCard } from '../components'
import Confirm from 'packages/kzui/src/components/confirm'
import Button from 'packages/kzui/src/components/button'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/confirm.md'

const _code =`
\`\`\`js
  const [ isConfirmHide, setIsConfirmHide ] = useState(true)
  return (
    <div>
      <Button type='confirm' onClick={() => setIsConfirmHide(false)}>点击展示 Confirm </Button>
      <Confirm
        hide={isConfirmHide}
        onCancel={() => setIsConfirmHide(true)}
        onConfirm={() => setIsConfirmHide(true)}
        confirmText='确定'
        cancelText='取消'
      >
        This is a Confirm
      </Confirm>
    </div>
  ) 
\`\`\`
`
const confirmDemos = [
  {
    description: {
      title: '确认弹框',
      content: '唯一用法。'
    },
    code: _code,
    reactCode: () => {
      const [ isConfirmHide, setIsConfirmHide ] = useState(true)
      return (
        <div>
          <Button type='confirm' onClick={() => setIsConfirmHide(false)}>点击展示 Confirm </Button>
          <Confirm
            hide={isConfirmHide}
            onCancel={() => setIsConfirmHide(true)}
            onConfirm={() => setIsConfirmHide(true)}
            confirmText='确定'
            cancelText='取消'
          >
            This is a Confirm
          </Confirm>
        </div>
      ) 
    }
  }
]
const ConfirmDemo = () => {
  return (
    <div>
      {
        confirmDemos.map((demo, index) => (
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

export { ConfirmDemo }