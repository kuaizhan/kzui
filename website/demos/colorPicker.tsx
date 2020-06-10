import * as React from 'react'
import { useState } from 'react'
import ColorPicker from 'packages/kzui/src/components/color-picker'
import Button from 'packages/kzui/src/components/button'
import { DemoDisplayCard } from '../components'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
// @ts-ignore
import docContent from '../docs/color-picker.md'

const colorPickerDemos = [
  {
    description: {
      title: '简单拾色器',
      content: '将 type 属性设为 simple，使用简单拾色器。可通过设置 hex 属性设置颜色初始值，'
    },
    code:`
\`\`\`js    
  const [ isCPHide, setIsCPHide ] = useState(true)
  const [ pickedColor, setPickedColor ] = useState('#000000')
  function handleColorChange(value:string) {
    setPickedColor(value)
  }
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '6px' }}>
        <div style={{ width: '30px', height: '30px', background: pickedColor, borderRadius: '2px' }}></div>
        <span style={{ marginLeft: '6px' }}>{pickedColor}</span>
      </div>
      <Button 
        type="confirm"
        onClick={() => setIsCPHide(isCPHide => !isCPHide)}
      >
        简单拾色器
      </Button>
      <ColorPicker
        style={{ zIndex: 999 }}
        hide={isCPHide}
        type='simple'
        hex='#000000'
        onChange={handleColorChange}
      />
    </>
  )
\`\`\`
    `,
    reactCode: () => {
      const [ isCPHide, setIsCPHide ] = useState(true)
      const [ pickedColor, setPickedColor ] = useState('#000000')
      function handleColorChange(value:string) {
        setPickedColor(value)
      }
      return (
        <>
          <div style={{ display: 'flex', marginBottom: '6px' }}>
            <div style={{ width: '30px', height: '30px', background: pickedColor, borderRadius: '2px' }}></div>
            <span style={{ marginLeft: '6px' }}>{pickedColor}</span>
          </div>
          <Button 
            type="confirm"
            onClick={() => setIsCPHide(isCPHide => !isCPHide)}
          >
            简单拾色器
          </Button>
          <ColorPicker
            style={{ zIndex: 999 }}
            hide={isCPHide}
            type='simple'
            hex='#000000'
            onChange={handleColorChange}
          />
        </>
      )
    }
  },
  {
    description: {
      title: ' 完整版拾色器',
      content: '将 type 属性设为 full，使用完整版拾色器。'
    },
    code: `
\`\`\`js
  const [ isCPHide, setIsCPHide ] = useState(true)
  const [ pickedColor, setPickedColor ] = useState('#aa0000')
  function handleColorChange(hex:string) {
    setPickedColor(hex)
  }
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '6px' }}>
        <div style={{ width: '30px', height: '30px', background: pickedColor, borderRadius: '2px' }}></div>
        <span style={{ marginLeft: '6px' }}>{pickedColor}</span>
      </div>
      <Button 
        type='confirm'
        onClick={() => setIsCPHide(isCPHide => !isCPHide)}
      >
        完整版拾色器
      </Button>
      <ColorPicker
        style={{ zIndex: 999, position: 'relative'}}
        hide={isCPHide}
        a={100}
        type='full'
        hex='#aa00000'
        onChange={handleColorChange}
      />
    </>
  )
\`\`\`
    `,
    reactCode: () => {
      const [ isCPHide, setIsCPHide ] = useState(true)
      const [ pickedColor, setPickedColor ] = useState('#aa0000')
      function handleColorChange(hex:string) {
        setPickedColor(hex)
      }
      return (
        <>
          <div style={{ display: 'flex', marginBottom: '6px' }}>
            <div style={{ width: '30px', height: '30px', background: pickedColor, borderRadius: '2px' }}></div>
            <span style={{ marginLeft: '6px' }}>{pickedColor}</span>
          </div>
          <Button 
            type='confirm'
            onClick={() => setIsCPHide(isCPHide => !isCPHide)}
          >
            完整版拾色器
          </Button>
          <ColorPicker
            style={{ zIndex: 999, position: 'relative'}}
            hide={isCPHide}
            a={100}
            type='full'
            hex='#aa00000'
            onChange={handleColorChange}
          />
        </>
      )
    }
  }
]

const ColorPickerDemo = () => {
  return (
    <div>
      {
        colorPickerDemos.map((demo, index) => (
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

export { ColorPickerDemo }