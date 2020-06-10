import * as React from "react";
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/steps.md';
import Steps from 'packages/kzui/src/components/steps';
import Button from 'packages/kzui/src/components/button';


const demoList = [
  {
    description: {
      title: '基本',
      content: 'spinning为false组件消失'
    },
    code: `
\`\`\`js
const [step, setStep] = React.useState(1)
return (
  <>
    <Steps size={"normal"} curStep={step} stepTitles={['step1', 'step2']}>
      <div style={{border: '1px solid #000'}}>content1</div>
      <div style={{border: '1px solid #000'}}>content2</div>
    </Steps>
    <Button style={{marginTop: '10px'}} onClick={() => setStep(2)}>下一步</Button>
  </>
)
}
\`\`\`
    `,
    reactCode: () => {
      const [step, setStep] = React.useState(1)
      return (
        <>
          <Steps size={"normal"} curStep={step} stepTitles={['step1', 'step2']}>
            <div style={{border: '1px solid #000'}}>content1</div> 
            <div style={{border: '1px solid #000'}}>content2</div>
          </Steps>
          <Button style={{marginTop: '10px'}} onClick={() => setStep(2)}>下一步</Button>
        </>
      )
    }
  },
]

const StepsDemo: React.FC = () => (
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

export default StepsDemo;