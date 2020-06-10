import * as React from "react";
import { DemoDisplayCard, message } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/search.md';
import Search from 'packages/kzui/src/components/search';


const demoList = [
  {
    description: {
      title: '基本',
      content: '基本使用方法'
    },
    code: `
\`\`\`js
  <Search 
    size='normal'
    disabled={false}
    error={false}
    name=''
    placeholder=''
    value=''
    onChange={(e) => message(JSON.stringify(e))}
    onSearch={(e) => message(JSON.stringify(e))}
  />
\`\`\`
    `,
    reactCode: () => (
      <Search 
        size='normal'
        disabled={false}
        error={false}
        name=''
        placeholder=''
        value=''
        onChange={(e) => message(JSON.stringify(e))}
        onSearch={(e) => message(JSON.stringify(e))}
      />
    )
  },
]

const SearchDemo: React.FC = () => (
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

export default SearchDemo;