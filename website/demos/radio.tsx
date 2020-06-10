import React, { useState } from 'react';
import { Radio } from 'packages/kzui/src/components/radio';
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
// @ts-ignore
import docContent from '../docs/radio.md';

const demoList = [
  {
    description: {
      title: '普通单选',
      content: '由checked属性控制是否选中,无checked默认不选中。name属性用于区分, 在onClick回调参数返回'
    },
    code: `
\`\`\`js
      <Radio checked={false} name="">不选中</Radio>
      <Radio checked={true} name="">选中</Radio>
\`\`\`
      `,
    reactCode: () => (
      <>
        <Radio checked={false} name="">不选中</Radio>
        <Radio checked={true} name="">选中</Radio>
      </>
    )
  },
  {
    description: {
      title: '禁用单选',
      content: '由disabled属性控制是否选中,默认可用'
    },
    code: `
\`\`\`js
      <Radio disabled={false}>不禁用</Radio>
      <Radio disabled={true}>禁用</Radio>
\`\`\`
      `,
    reactCode: () => (
      <>
        <Radio disabled={false}>不禁用</Radio>
        <Radio disabled={true}>禁用</Radio>
      </>
    )
  },
  {
    description: {
      title: '受控中单选',
      content: 'onClick回调参数是组件的props对象'
    },
    code: `
\`\`\`js
      const [checked, setChecked] = useState(false);
      return (
        <Radio checked={checked} onClick={(props) => setChecked(!props.checked)}>
          {checked? '选中':'未选中'}
        </Radio>
      )
\`\`\`
    `,
    reactCode: () => {
      const [checked, setChecked] = useState(false);
      return (
        <Radio checked={checked} onClick={(props) => setChecked(!props.checked)}>
          {checked? '选中':'未选中'}
        </Radio>
      )
    }
  },
]


const RadioDemo:React.FC = () => (
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

export default RadioDemo