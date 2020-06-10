
import * as React from "react";
import { useState } from 'react';
import Button from 'packages/kzui/src/components/button';
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from 'packages/kzui/src/components/button/index.md'

const demoList = [
  {
    description: {
      title: '普通按钮',
      content: '最简单的用法。'
    },
    code: `
\`\`\`js    
  <Button>普通按钮</Button>
\`\`\`
    `,
    reactCode: () =>  <Button>普通按钮</Button>
  },
  {
    description: {
      title: '按钮尺寸',
      content: '按钮有特大、大、中、小四种尺寸。通过设置 size 为 huge large small 分别把按钮设为特大、大、小尺寸。若不设置 size，则尺寸为中。'
    },
    code: `
\`\`\`js     
  <Button size='small'>小型按钮</Button>
  <Button size='large'>大号按钮</Button>
  <Button size='huge'>特大按钮</Button>
\`\`\`    
    `,
    reactCode: () => (
      <>
        <Button size='small'>小型按钮</Button>
        <Button size='large'>大号按钮</Button>
        <Button size='huge'>特大按钮</Button>
      </>
    )
  },
  {
    description: {
      title: '按钮类型',
      content: '除了默认类型，按钮还有确认、危险、虚线边框。通过设置 type 为 confirm danger dashed 分别把按钮设为确认、危险、虚线边框类型。若不设置 type，则类型为普通。'
    },
    code: `
\`\`\`js 
  <Button type='confirm'>确认按钮</Button>
  <Button type='danger'>危险按钮</Button>
  <Button type='dashed'>虚线边框按钮</Button>
\`\`\`     
  `,
  reactCode: () => (
    <>
      <Button type='confirm'>确认按钮</Button>
      <Button type='danger'>危险按钮</Button>
      <Button type='dashed'>虚线边框按钮</Button>
    </>
  )
  },
  {
    description: {
      title: '加载中按钮',
      content: '将 status 属性设置为 loading 即可让按钮处于加载状态'
    },
    code: `
\`\`\`js 
  <Button type='confirm' status='loading'>加载中</Button>
\`\`\`   
  `,
  reactCode: () => <Button type='confirm' status='loading'>加载中</Button>
  },
  {
    description: {
      title: '加载中按钮',
      content: '将 status 属性设置为 loading 即可让按钮处于加载状态'
    },
    code: `
\`\`\`js     
  const [clicked, setClicked] = useState(false)
  return (
    <>
      <span>{clicked && '已点击'}</span>
      <Button onClick={() => setClicked(true)} type='confirm'>点击我</Button>
    </>      
  )
\`\`\`  
    `,
    reactCode: () => {
      const [clicked, setClicked] = useState(false)
      return (
        <>
          <span>{clicked && '已点击'}</span>
          <Button onClick={() => setClicked(true)} type='confirm'>点击我</Button>
        </>
      )
    }
  }
]
const ButtonDemo = () => (
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

export { ButtonDemo };