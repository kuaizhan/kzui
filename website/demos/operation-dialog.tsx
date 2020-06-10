import * as React from 'react'
import { useState } from 'react'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import { DemoDisplayCard } from '../components'
import OperationDialog from 'packages/kzui/src/components/operation-dialog';
import Button from 'packages/kzui/src/components/button';
import docContent from '../docs/operation-dialog.md';

const _code =`
\`\`\`js
const [show, setShow] = useState(false)
const handleClick = () => {
  setShow(true)
}
return (
  <>
    <Button type='confirm' onClick={handleClick}>点击展示</Button>
    <OperationDialog
          title="站点授权"
          hide={!show}
          onConfirm={() => setShow(false)}
          onCancel={() => setShow(false)}
      >
          <div className="auth-operation-info">
              <p className="auth-account">
                  <input placeholder="请填写服务商的账号名" onChange={this.changeUserInfo} />
              </p>
              <p className="auth-tips">注: 授权成功后，授权服务商可以编辑、管理、删除该站点</p>
          </div>
      </OperationDialog>
  </>
\`\`\`
`
const demoList = [{
    description: {
        title: '消息提示',
        content: '最简单用法。'
    },
    code: _code,
    reactCode: () => {
      const [show, setShow] = useState(false)
      const handleClick = () => {
        setShow(true)
      }
      return (
        <>
          <Button type='confirm' onClick={handleClick}>点击展示</Button>
          <OperationDialog
                title="站点授权"
                hide={!show}
                onConfirm={() => setShow(false)}
                onCancel={() => setShow(false)}
            >
                <div className="auth-operation-info">
                    <p className="auth-account">
                        <input placeholder="请填写服务商的账号名" onChange={this.changeUserInfo} />
                    </p>
                    <p className="auth-tips">注: 授权成功后，授权服务商可以编辑、管理、删除该站点</p>
                </div>
            </OperationDialog>
        </>
      )
    }
}]

const OperationDialogDemo = () => {
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

export { OperationDialogDemo };