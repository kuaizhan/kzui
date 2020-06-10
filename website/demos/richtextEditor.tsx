import * as React from "react";
import { useRef } from 'react';
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/richtext-editor.md';
import Button from "packages/kzui/src/components/button";
import message from '../components/message'
import RichtextEditor from 'packages/kzui/src/components/richtext-editor'

const demoList = [
  {
    description: {
      title: '基本使用',
      content: '这个文本编辑器可以直接对其文本直接编辑'
    },
    code: `
\`\`\`js
      <RichtextEditor value="初始化文本内容" />
\`\`\`
    `,
    reactCode: () => (
      <RichtextEditor value="初始化文本内容" />
    )
  },
  {
    description: {
      title: '控制文本编辑器',
      content: '组件内部函数通过参数的形式暴露出来，这样外部可以控制执行该组件方法的时机。'
    },
    code: `
\`\`\`js
    const command = useRef((command, value?) => null)
      function handleAfterInit(commander){
        command.current = commander;
      }
      function handleAddClick(){
        command.current('INSERT_HTML', { html: '插入到编辑框的html字符串' })
      }
      function handleGetClick(){
        command.current('GET_HTML', (html) => {
          message(html)
        })
      }
      function handleClearClick() {
        command.current('CLEAR_HTML')
      }
      return (
        <div>
          <RichtextEditor value="初始化文本内容" afterInit={handleAfterInit} />
          <div>向编辑框插入内容 <Button onClick={() => handleAddClick()}>插入</Button></div>
          <div>获取编辑框的内容 <Button onClick={() => handleGetClick()}>获取</Button></div>
          <div>清空编辑器的内容 <Button onClick={() => handleClearClick()}>清空</Button></div>
        </div>
      )
    }
\`\`\`
    `,
    reactCode: () => {
      const command = useRef((command, value?) => null)
      function handleAfterInit(commander){
        command.current = commander;
      }
      function handleAddClick(){
        command.current('INSERT_HTML', { html: '插入到编辑框的html字符串' })
      }
      function handleGetClick(){
        command.current('GET_HTML', (html) => {
          message(html)
        })
      }
      function handleClearClick() {
        command.current('CLEAR_HTML')
      }
      return (
        <div>
          <RichtextEditor value="初始化文本内容" afterInit={handleAfterInit} />
          <div>向编辑框插入内容 <Button onClick={() => handleAddClick()}>插入</Button></div>
          <div>获取编辑框的内容 <Button onClick={() => handleGetClick()}>获取</Button></div>
          <div>清空编辑器的内容 <Button onClick={() => handleClearClick()}>清空</Button></div>
        </div>
      )
    }
  }
]


const RichtextEditorDemo: React.FC = () => (
  <div>
    {
      demoList.map((demo, index) => (
        <DemoDisplayCard 
          description={demo.description}
          code={demo.code}
          key={index}
        >
          {demo.reactCode() }
        </DemoDisplayCard>
      ))
    }
    <ReactMarkdown source={docContent} />
  </div>
)

export default RichtextEditorDemo