import * as React from 'react'
import { useState } from 'react'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import { DemoDisplayCard } from '../components'
import Pager from 'packages/kzui/src/components/pager'
// @ts-ignore
import docContent from '../docs/pager.md'

const _code =`
\`\`\`js
  const [curPage, setCurPage] = useState(1)
  return (
    <Pager
      totalPage={3}
      curPage={curPage}
      onPageChange={(value) => setCurPage(value)}
    />
  )
\`\`\`
`
const demoList = [{
  description: {
    title: '分页器',
    content: '最简单用法。'
  },
  code: _code,
  reactCode: () => {
    const [curPage, setCurPage] = useState(1)
    return (
      <Pager
        totalPage={3}
        curPage={curPage}
        onPageChange={(value) =>{ 
          setCurPage(value)
          console.log(value)
        }}
      />
    )
  }
}]

const PagerDemo = () => {
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

export { PagerDemo}
