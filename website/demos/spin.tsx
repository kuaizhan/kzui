import * as React from "react";
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/spin.md';
import Spin from 'packages/kzui/src/components/spin';


const demoList = [
  {
    description: {
      title: '基本',
      content: 'spinning为false组件消失'
    },
    code: `
\`\`\`js
  <Spin 
    size='normal'
    tip={'spin'}
    spinning={true}
  />
\`\`\`
    `,
    reactCode: () => (
      <Spin 
        size='normal'
        tip={'spin'}
        spinning={true}
      />
    )
  },
]

const SpinDemo: React.FC = () => (
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

export default SpinDemo;