
import * as React from "react";
import GridContainer from 'packages/kzui/src/components/grid-container';
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/grid-container.md';

const demoList = [
  {
    description: {
      title: '栅格系统',
      content: '布局'
    },
    code: `
\`\`\`js
<>
    <GridContainer style={{ backgroundColor: 'yellow' }} span={1} last>
        span 1
    </GridContainer>
    <GridContainer style={{ backgroundColor: 'red', color: 'yellow' }} span={2} last>
        span 2 
    </GridContainer>
    <GridContainer style={{ backgroundColor: 'blue', color: 'white' }} span={8} last>
        span 8
    </GridContainer>
</>
\`\`\`
    `,
    reactCode: () => {
      return (
        <>
            <GridContainer style={{ backgroundColor: 'yellow' }} span={1} last>
                span 1
            </GridContainer>
            <GridContainer style={{ backgroundColor: 'red', color: 'yellow' }} span={2} last>
                span 2 
            </GridContainer>
            <GridContainer style={{ backgroundColor: 'blue', color: 'white' }} span={8} last>
                span 8
            </GridContainer>
        </>
      )
    }
  }
]
const GridContainerDemo = () => (
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

export { GridContainerDemo };