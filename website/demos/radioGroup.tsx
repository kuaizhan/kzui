import * as React from "react";
import { useState } from 'react';
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
// @ts-ignore
import docContent from '../docs/radio-group.md';
import RadioGroup from 'packages/kzui/src/components/radio';

const demoList = [
  {
    description: {
      title: '基本',
      content: '最简单使用方法'
    },
    code: `
\`\`\`js
      <RadioGroup options={[
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]} />
\`\`\`
    `,
    reactCode: () => (
      <RadioGroup options={[
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]} />
    )
  },
  {
    description: {
      title: '单选组禁用',
      content: '配置disabled可以禁用'
    },
    code: `
\`\`\`js
      <RadioGroup options={[
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]} disabled />
\`\`\`
    `,
    reactCode: () => (
      <RadioGroup options={[
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]} />
    )
  },
  {
    description: {
      title: '水平排列',
      content: '默认值为vertical垂直排列'
    },
    code: `
\`\`\`js
      <RadioGroup 
        options={[
          {value: 1, text: '1'},
          {value: 2, text: '2'},
          {value: 3, text: '3'}
        ]} 
        layout={'horizontal'}
      />
\`\`\`
    `,
    reactCode: () => (
      <RadioGroup 
        options={[
          {value: 1, text: '1'},
          {value: 2, text: '2'},
          {value: 3, text: '3'}
        ]} 
        layout={'horizontal'}
      />
    )
  },
  {
    description: {
      title: '单选组合-配合name使用',
      content: '可以为 Radio.Group 配置 name 参数，onChange回调参数带有name'
    },
    code: `
\`\`\`js
      const [value, setValue] = useState();
      const options = [
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]
      function handleChange(e) {
        setValue(e.value)
      }

      return (
        <RadioGroup options={options} value={value} onChange={e => handleChange(e)} />
      )
\`\`\`
    `,
    reactCode: () => {
      const [value, setValue] = useState();
      const options = [
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'}
      ]
      function handleChange(e) {
        setValue(e.value)
      }

      return (
        <RadioGroup options={options} value={value} onChange={e => handleChange(e)} />
      )
    }
  },
  {
    description: {
      title: 'RadioButton',
      content: '将type属性设置为 button。该属性默认值为 radio。'
    },
    code: `
\`\`\`js
      <RadioGroup 
        options={[
          {value: 1, text: '新增粉丝'},
          {value: 2, text: '全部粉丝'},
        ]} 
        type="button"
      />
\`\`\`
    `,
    reactCode: () => (
      <RadioGroup 
        options={[
          {value: 1, text: '新增粉丝'},
          {value: 2, text: '全部粉丝'},
        ]} 
        type="button"
      />
    )
  },
]

const RadioGroupDemo: React.FC = () => (
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

export default RadioGroupDemo;