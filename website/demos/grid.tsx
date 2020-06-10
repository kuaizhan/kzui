
import * as React from "react";
import Button from 'packages/kzui/src/components/button';
import { Row, Col } from 'packages/kzui/src/components/grid';
import { DemoDisplayCard } from '../components'
import JsxParser from 'react-jsx-parser'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/grid.md';

const demoList = [
  {
    description: {
      title: '栅格系统',
      content: '布局'
    },
    code: `
\`\`\`js
<Row>
  <Col style={{ backgroundColor: 'yellow' }} span={16}>duck 16</Col>
  <Col style={{ backgroundColor: 'red', color: 'yellow' }} span={8}>fish 8</Col>
</Row>
\`\`\`
    `,
    reactCode: () => {
      return (
        <Row>
            <Col style={{ backgroundColor: 'yellow' }} span={16}>duck 16</Col>
            <Col style={{ backgroundColor: 'red', color: 'yellow' }} span={8}>fish 8</Col>
        </Row>
      )
    }
  }
]
const GridDemo = () => (
    <div>
      {
        demoList.map((demo, index) => (
          <DemoDisplayCard
            description={demo.description}
            code={demo.code}
            key={index}
          >
            {demo.reactCode ? demo.reactCode() : (
              <JsxParser 
                components={{ Button }}
                jsx={demo.code}
              />
            )}
          </DemoDisplayCard>
        ))
      }
      <ReactMarkdown source={docContent} />
    </div>
)

export { GridDemo };