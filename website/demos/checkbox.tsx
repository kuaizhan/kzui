import  * as React from 'react'
import { useState } from 'react'
import Checkbox from 'packages/kzui/src/components/checkbox'
import Button from 'packages/kzui/src/components/button'
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/checkbox.md'

const checkboxDemoList = [
  {
    description: {
      title: '普通多选框',
      content: '最简单的用法。'
    },
    code: `
\`\`\`js
  <Checkbox size='normal' name='normal checkbox'>普通多选框</Checkbox>
\`\`\`
    `,
    reactCode: () => <Checkbox size='normal' name='normal checkbox'>普通多选框</Checkbox>
  },
  {
    description: {
      title: '受控组件',
      content: '联动的 Checkbox。'
    },
    code:`
\`\`\`js
  const [isChecked, setIsChecked] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <>
      <div style={{ display: 'flex'}}>
        <Button onClick={() => {
          setIsChecked(isChecked => !isChecked)
        }}>
          {isChecked ? '取消选中' : '选中'}
        </Button>
        <Button onClick={() => {
          setIsDisabled(isDisabled => !isDisabled)
        }}>
          {isDisabled ? '可选' : '不可选'}
        </Button>
      </div>
      <Checkbox
        checked={isChecked}
        disabled={isDisabled}
        onChange={(value) => setIsChecked(value.checked)}
      >
        受控多选框
      </Checkbox>
    </>
  )
\`\`\`
    `,
    reactCode: () => {
      const [isChecked, setIsChecked] = useState(false)
      const [isDisabled, setIsDisabled] = useState(false)
      return (
        <>
          <div style={{ display: 'flex'}}>
            <Button onClick={() => {
              setIsChecked(isChecked => !isChecked)
            }}>
              {isChecked ? '取消选中' : '选中'}
            </Button>
            <Button onClick={() => {
              setIsDisabled(isDisabled => !isDisabled)
            }}>
              {isDisabled ? '可选' : '不可选'}
            </Button>
          </div>
          <Checkbox
            checked={isChecked}
            disabled={isDisabled}
            onChange={(value) => setIsChecked(value.checked)}
          >
            受控多选框
          </Checkbox>
        </>
      )
    }
  },
  {
    description: {
      title: 'Checkbox 组',
      content: '方便的从数组生成 Checkbox 组，通过传入 name 控制选中项。'
    },
    code: `
\`\`\`js
  const [checkedName, setCheckedName] = useState([])
  const options = [
    {
      name: 'A',
      text: 'A'
    }, 
    {
      name: 'B',
      text: 'B',
    },
    {
      name: 'C',
      text: 'C'
    }
  ]
  return (
    <>
    {
      options.map((option, index) => (
        <Checkbox
          key={index}
          name={option.name}
          checked={checkedName.indexOf(option.name) > -1}
          onChange={ value => {
            const _checkedName = [...checkedName]
            if (value.checked) {
              const newCheckedName = _checkedName.concat(value.name)
              setCheckedName(newCheckedName)
            } else {
              const uncheckedIndex = _checkedName.indexOf(value.name)
                _checkedName.splice(uncheckedIndex, 1)
              setCheckedName(_checkedName)
            }
          }}
        >
          {option.text}
        </Checkbox>
      ))
    }
    </>
  )
\`\`\`
    `,
    reactCode: () => {
      const [checkedName, setCheckedName] = useState([])
      const options = [
        {
          name: 'A',
          text: 'A'
        }, 
        {
          name: 'B',
          text: 'B',
        },
        {
          name: 'C',
          text: 'C'
        }
      ]
      return (
        <>
        {
          options.map((option, index) => (
            <Checkbox
              key={index}
              name={option.name}
              checked={checkedName.indexOf(option.name) > -1}
              onChange={ value => {
                const _checkedName = [...checkedName]
                if (value.checked) {
                  const newCheckedName = _checkedName.concat(value.name)
                  setCheckedName(newCheckedName)
                } else {
                  const uncheckedIndex = _checkedName.indexOf(value.name)
                   _checkedName.splice(uncheckedIndex, 1)
                  setCheckedName(_checkedName)
                }
              }}
            >
              {option.text}
            </Checkbox>
          ))
        }
        </>
      )
    }
  }
]

const CheckboxDemo = () => {
  return (
    <div>
      {
        checkboxDemoList.map((demo, index) => (
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

export { CheckboxDemo }