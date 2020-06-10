
import * as React from "react";
import Button from 'packages/kzui/src/components/button';
import {Input} from 'packages/kzui/src';
import { DemoDisplayCard } from '../components'
import JsxParser from 'react-jsx-parser'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/input.md';

const demoList = [
  {
    description: {
      title: 'input',
      content: ''
    },
    code: `
\`\`\`js
<Input onChange={e => console.log(e)} />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Input onChange={e => console.log(e)} />
      )
    }
  },
  {
    description: {
      title: 'input - uncontroled',
      content: ''
    },
    code: `
\`\`\`js
<Input uncontroled onChange={e => console.log(e)} />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Input value={'xxxx'} onChange={e => console.log(e)} />
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
<Input disabled />
\`\`\`
    `,
    reactCode: () => {
      return (
        <Input disabled />
      )
    }
  }
]
const InputDemo = () => (
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

export { InputDemo };