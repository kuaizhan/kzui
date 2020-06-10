import * as React from "react";
import { useState } from 'react';
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/tag.md';
import { Tag, notification } from 'packages/kzui/src';

const demoList = [
  {
    description: {
      title: '标签',
      content: '标签'
    },
    code: `
\`\`\`js
const [active, setActive] = useState(false);
return (
  <>
    <Tag
      value="duck"
      label="fish"
      active={active}
      onChange={() => setActive(!active)}
    />
  </>
)
\`\`\`
    `,
    reactCode: () => {
      const [active, setActive] = useState(false);
      
      return (
        <>
          <Tag
            value="duck"
            label="fish"
            active={active}
            onChange={() => setActive(!active)}
            removeAble
          />
          <div onClick={() => setActive(!active)}>
            change
          </div>
        </>
      )
    }
  },
  {
    description: {
      title: '标签 - multi',
      content: '多选标签时的样式'
    },
    code: `
\`\`\`js
return (
  <Tag
    value="duck"
    label="fish"
    active
    multi
    onChange={() => setActive(!active)}
  />
)
\`\`\`
    `,
    reactCode: () => {      
      return (
        <Tag
          value="fish"
          label="fish"
          active
          multi
          onChange={(e) => notification.success('i select fish')}
        />
      )
    }
  },
]

const TagDemo: React.FC = () => (
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

export default TagDemo;