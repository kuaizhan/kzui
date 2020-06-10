import * as React from 'react';
import PopTip from 'packages/kzui/src/components/_poptip'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import { DemoDisplayCard } from '../components'
import docContent from '../docs/pop-confirm.md'



const _code =`
\`\`\`js
  <PopTip
    tip='这是poptip这是poptip这是poptip这是poptip'
  >
    hover me
  </PopTip>
\`\`\`
`
const demoList = [{
  description: {
    title: 'poptip',
    content: '最简单用法。'
  },
  code: _code,
  reactCode: () => {
    return (
      <PopTip
        tip='这是poptip这是poptip这是poptip这是poptip'
      >
        hover me
      </PopTip>
    )
  }
}]

const PopTipDemo = () => {
  return (
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
}

export { PopTipDemo }