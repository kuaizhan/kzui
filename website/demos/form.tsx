
import * as React from "react";
import Button from 'packages/kzui/src/components/button';
import Form, { FormRow } from 'packages/kzui/src/components/form';
import Input from 'packages/kzui/src/components/input';
import { DemoDisplayCard } from '../components'
import JsxParser from 'react-jsx-parser'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/form.md';

const demoList = [
  {
    description: {
      title: '表单',
      content: '规范表单的格式'
    },
    code: `
\`\`\`js
<Form>
  <FormRow label="验证码">
      <Input style={{ width: '120px', marginRight: '12px' }} />
      <Button type="confirm" last>获取验证码</Button>
  </FormRow>
  <FormRow label=" ">
      <Button type="confirm" last>登录</Button>
  </FormRow>
</Form>
\`\`\`
    `,
    reactCode: () => {
      return (
        <Form>
            <FormRow label="验证码">
                <Input style={{ width: '120px', marginRight: '12px' }} />
                <Button type="confirm" last>获取验证码</Button>
            </FormRow>
            <FormRow label=" ">
                <Button type="confirm" last>登录</Button>
            </FormRow>
        </Form>
      )
    }
  }
]
const FormDemo = () => (
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

export { FormDemo };