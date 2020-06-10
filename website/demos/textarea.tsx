
import * as React from "react";
import Textarea from 'packages/kzui/src/components/textarea';
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/textarea.md';

const demoList = [
  {
    description: {
      title: 'input',
      content: ''
    },
    code: `
\`\`\`js
<Textarea />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Textarea />
      )
    }
  },
  {
    description: {
      title: 'input disabled',
      content: ''
    },
    code: `
\`\`\`js
<Textarea disabled />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Textarea disabled />
      )
    }
  }
]
const TextareaDemo = () => (
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

export { TextareaDemo };