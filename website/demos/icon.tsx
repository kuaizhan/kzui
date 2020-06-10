
import * as React from "react";
import Icon from 'packages/kzui/src/components/icon';
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/icon.md';

// TODO complete

const demoList = [
  {
    description: {
      title: 'icon',
      content: ''
    },
    code: `
\`\`\`js
<Icon type="text" />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Icon type="text" />
      )
    }
  },
  {
    description: {
      title: 'type属性',
      content: 'type属性和iconClass的区别在于，icon的类名不需要传前缀 kz-e-。'
    },
    code: `
\`\`\`js
<Icon type="text" />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Icon type="text" />
      )
    }
  }
]
const IconDemo = () => (
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

export { IconDemo };