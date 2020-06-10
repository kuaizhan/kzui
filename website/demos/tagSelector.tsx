import * as React from "react";
import { useState } from 'react';
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/tag-selector.md';
import TagSelector from 'packages/kzui/src/components/tag-selector';

const demoList = [
  {
    description: {
      title: '标签',
      content: '标签'
    },
    code: `
\`\`\`js
const [value, setValue] = useState('duck');
return (
  <>
    <TagSelector
      tags={['duck', 'fish', 'kong']}
      default={['duck', 'fish', 'kong'].indexOf(value)}
      onChange={(value: any[]) => setValue(value[0].value)}
    />
  </>
)
\`\`\`
    `,
    reactCode: () => {
      const [value, setValue] = useState('duck');

      return (
        <>
          <TagSelector
            tags={['duck', 'fish', 'kong']}
            default={['duck', 'fish', 'kong'].indexOf(value)}
            onChange={(value: any[]) => setValue(value[0].value)}
          />
        </>
      )
    }
  },
]

const TagSelectorDemo: React.FC = () => (
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

export default TagSelectorDemo;