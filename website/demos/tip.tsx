import * as React from "react";
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/tip.md';
import Tip from 'packages/kzui/src/components/tip';
import Row from 'packages/kzui/src/components/grid/Row';

const demoList = [
  {
    description: {
      title: 'tip',
      content: 'tip'
    },
    code: `
\`\`\`js
<Row>
  <Tip type="inline">inline (default)</Tip>
</Row>
<Row>
  <Tip type="info">info</Tip>
</Row>
<Row>
  <Tip type="warn">warn</Tip>
</Row>
<Row>
  <Tip type="error">error</Tip>
</Row>
<Row>
  <Tip type="success">success</Tip>
</Row>
<Row>
  <Tip type="info">
        <span style={{ lineHeight: 1.1 }}>1.创建个性化菜单之前必须先创建默认菜单<br />
        2.当用户进入公众号页面时，会从序列号为1的个性化菜单开始匹配，如果匹配不成功，则继续向下匹配，直到默认菜单。</span>
  </Tip>
</Row>
\`\`\`
    `,
    reactCode: () => {
      return (
        <>
          <Row>
            <Tip type="inline">inline (default)</Tip>
          </Row>
          <Row>
            <Tip type="info">info</Tip>
          </Row>
          <Row>
            <Tip type="warn">warn</Tip>
          </Row>
          <Row>
            <Tip type="error">error</Tip>
          </Row>
          <Row>
            <Tip type="success">success</Tip>
          </Row>
          <Row>
            <Tip type="info">
                  <span style={{ lineHeight: 1.1 }}>1.创建个性化菜单之前必须先创建默认菜单<br />
                  2.当用户进入公众号页面时，会从序列号为1的个性化菜单开始匹配，如果匹配不成功，则继续向下匹配，直到默认菜单。</span>
            </Tip>
          </Row>
        </>
      )
    }
  },
]

const TipDemo: React.FC = () => (
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

export default TipDemo;