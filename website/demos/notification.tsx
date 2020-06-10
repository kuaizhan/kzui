import * as React from 'react'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import { DemoDisplayCard } from '../components'
import notification from 'packages/kzui/src/components/notification';
import Button from 'packages/kzui/src/components/button';
import docContent from '../docs/notification.md';

const _code =`
\`\`\`js
    function handleClick() {
        notification.success('成功提示')
    }
    return (
        <>
            <Button type='confirm' onClick={handleClick}>点击展示</Button>
        </>
    )
\`\`\`
`
const demoList = [{
    description: {
        title: '消息提示',
        content: '最简单用法。'
    },
    code: _code,
    reactCode: () => {
        function handleClick() {
            notification.success('成功提示')
        }
        return (
            <>
                <Button type='confirm' onClick={handleClick}>点击展示</Button>
            </>
        )
    }
}]

const NotificationDemo = () => {
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

export { NotificationDemo };