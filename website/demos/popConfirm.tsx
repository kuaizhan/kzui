import * as React from 'react'
import { useState } from 'react'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import { DemoDisplayCard } from '../components'
import Button from 'packages/kzui/src/components/button'
import PopConfirm from 'packages/kzui/src/components/pop-confirm'
import docContent from '../docs/pop-confirm.md'

const _code =`
\`\`\`js
<div>
  <PopConfirm
    onConfirm={() => console.log('onConfirm')}
    onCancel={() => console.log('onCancel')}
    title={
      <Button>fish</Button>
    }
  >
    <Button>点击展示 popConfirm</Button>
  </PopConfirm>
</div>
\`\`\`
`
const demoList = [{
  description: {
    title: 'pop 确认组件',
    content: '最简单用法。'
  },
  code: _code,
  reactCode: () => {
    return (
      <div>
        <PopConfirm
          onConfirm={() => console.log('onConfirm')}
          onCancel={() => console.log('onCancel')}
          title={
            <Button>fish</Button>
          }
        >
          <Button>点击展示 popConfirm</Button>
        </PopConfirm>
      </div>
    )
  }
}]

const PopConfirmDemo = () => {
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

export { PopConfirmDemo }
