import * as React from "react";
import { DemoDisplayCard, message } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/scroll-container.md';
import ScrollContainer from 'packages/kzui/src/components/scroll-container';


const demoList = [
  {
    description: {
      title: '基本',
      content: '基本使用方法'
    },
    code: `
\`\`\`js
  <ScrollContainer 
    style={{height: '100px', border: '1px solid #000'}}
    yScroll={true}
    xScroll={true}
    scrollToBottom={true}
    reserveSize={40}
    onHitBottom={() => message('滚动触底事件')}
    onHitTop={() => message('滚动触顶事件')}
  >
    1<br/>
    2<br/>
    3<br/>
    4<br/>
    5<br/>
    6<br/>
    7<br/>
    8<br/>
    9<br/>
    10<br/>
  </ScrollContainer>
\`\`\`
    `,
    reactCode: () => (
      <ScrollContainer 
        style={{height: '100px', border: '1px solid #000'}}
        yScroll={true}
        xScroll={true}
        scrollToBottom={true}
        reserveSize={40}
        onHitBottom={() => message('滚动触底事件')}
        onHitTop={() => message('滚动触顶事件')}
      >
        1<br/>
        2<br/>
        3<br/>
        4<br/>
        5<br/>
        6<br/>
        7<br/>
        8<br/>
        9<br/>
        10<br/>
      </ScrollContainer>
    )
  },
]

const ScrollContainerDemo: React.FC = () => (
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

export default ScrollContainerDemo;