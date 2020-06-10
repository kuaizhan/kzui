
import * as React from "react";
import { useState } from 'react';
import Button from 'packages/kzui/src/components/button';
import FileSelect from 'packages/kzui/src/components/file-select';
import { DemoDisplayCard, message } from '../components'
import JsxParser from 'react-jsx-parser'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/file-select.md';

const code1 = `
\`\`\`js
<>
  <FileSelect />
</>
\`\`\`
`

const demoList = [
  {
    description: {
      title: '文件选择按钮',
      content: '上传文件等'
    },
    code: code1,
    reactCode: () => {
      return (
        <>
            <FileSelect>上传图片</FileSelect>
        </>
      )
    }
  }
]
const FileSelectDemo = () => (
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

export { FileSelectDemo };