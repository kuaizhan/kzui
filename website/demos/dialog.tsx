import * as React from 'react'
import { useState } from 'react'
import Dialog from 'packages/kzui/src/components/dialog'
import Button from 'packages/kzui/src/components/button'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/dialog.md'
import { DemoDisplayCard } from '../components'

const _code = `
\`\`\`js
  const [ isDialogHide, setIsDialogHide ] = useState(true)
  function handleClose() {
    setIsDialogHide(true)
  }
  return (
    <div>
      <Button type='confirm' onClick={() => setIsDialogHide(false)}>点击展示对话框</Button>
      <Dialog 
        hide={isDialogHide}
        title='Header'
        actions={[
          <Button onClick={handleClose}>取消</Button>,
          <Button type='confirm' onClick={handleClose}>确认</Button>
        ]}
        onClose={handleClose}
      >
        <div>这是个对话框</div>
      </Dialog>
    </div>
  )
\`\`\`
`
const demo = {
  description: {
    title: '对话框',
    content: '最简单的用法。（很丑）'
  },
  code: _code,
  reactCode:() => {
    const [ isDialogHide, setIsDialogHide ] = useState(true)
    function handleClose() {
      setIsDialogHide(true)
    }
    return (
      <div>
        <Button type='confirm' onClick={() => setIsDialogHide(false)}>点击展示对话框</Button>
        <Dialog 
          hide={isDialogHide}
          title='Header'
          actions={[
            <Button onClick={handleClose}>取消</Button>,
            <Button type='confirm' onClick={handleClose}>确认</Button>
          ]}
          onClose={handleClose}
        >
          <div>这是个对话框</div>
        </Dialog>
      </div>
    )
  }
}

const DialogDemo = () => {

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

export { DialogDemo }