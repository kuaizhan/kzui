import * as React from "react";
import { useState } from 'react';
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/tooltip.md';
import Tooltip from 'packages/kzui/src/components/tooltip';

const demoList = [
  {
    description: {
      title: 'tooltip',
      content: 'tooltip'
    },
    code: `
\`\`\`js
<Tooltip tip="Am I beautiful?">
  hover me
</Tooltip>
\`\`\`
    `,
    reactCode: () => {
      return (
        <Tooltip tip="Am I beautiful?">
          hover me
        </Tooltip>
      )
    }
  },
  {
    description: {
      title: 'click on tooltip',
      content: 'click'
    },
    code: `
\`\`\`js
<Tooltip tip="Is duck the best?" trigger="click">
  click me
</Tooltip>
\`\`\`
    `,
    reactCode: () => {
      return (
        <Tooltip tip="Is duck the best?" trigger="click">
          click me
        </Tooltip>
      )
    }
  },
]

const TooltipDemo: React.FC = () => (
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

export default TooltipDemo;