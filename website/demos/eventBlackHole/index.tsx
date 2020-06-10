
import * as React from "react";
import Button from 'packages/kzui/src/components/button';
import EventBlackHole from 'packages/kzui/src/components/event-black-hole';
import { DemoDisplayCard, message } from '../../components'
import { ReactMarkdown } from '../../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../../docs/event-black-hole.md';

const code1 = `
\`\`\`js
<>
  <div onClick={() => message('黑洞外部部按钮')}>
    <EventBlackHole captureEvents={['click']}>
      <Button onClick={() => message('黑洞内部按钮')}>点击: 黑洞</Button>
    </EventBlackHole>
  </div>
  <div style={{ marginTop: '10px' }} onClick={() => message('黑洞外部按钮')}>
    <div>
      <Button onClick={() => message('黑洞内部按钮')}>点击: 没有黑洞</Button>
      </div>
  </div>
</>
\`\`\`
`

const demoList = [
  {
    description: {
      title: '事件黑洞',
      content: '可以阻止子元素的事件冒泡(相对于React的合成事件)'
    },
    code: code1,
    reactCode: () => {
      return (
        <>
            <div onClick={() => message('黑洞外部部按钮')}>
                <EventBlackHole captureEvents={['click']}>
                    <Button onClick={() => message('黑洞内部按钮')}>点击: 黑洞</Button>
                </EventBlackHole>
            </div>
            <div style={{ marginTop: '10px' }} onClick={() => message('黑洞外部按钮')}>
                <div>
                    <Button onClick={() => message('黑洞内部按钮')}>点击: 没有黑洞</Button>
                </div>
            </div>
        </>
      )
    }
  }
]
const EventBlackHoleDemo = () => (
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

export { EventBlackHoleDemo };