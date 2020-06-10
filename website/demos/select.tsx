import * as React from "react";
import { DemoDisplayCard, message } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/select.md';
import Select from 'packages/kzui/src/components/select';


const demoList = [
  {
    description: {
      title: '基本',
      content: '基本使用方法'
    },
    code: `
\`\`\`js
  const options = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'}
  ]
  <Select 
    defaultText= '请选择'
    value={null}
    options={options}
    onChange={(e) => message(JSON.stringify(e))}
    disabled={false}
    size='large'
    onExpand={() => console.log('onExpand')}
  />
\`\`\`
    `,
    reactCode: () => {
      const options = [
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]
      return (
        <Select 
          defaultText= '请选择'
          value={null}
          options={options}
          onChange={(e) => message(JSON.stringify(e))}
          disabled={false}
          size='large'
          onExpand={() => console.log('onExpand')}
          hasMore
        />
      )
    }
      
  },
]

const SelectDemo: React.FC = () => (
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

export { SelectDemo };