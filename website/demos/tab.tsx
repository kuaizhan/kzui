import * as React from "react";
import { useState } from 'react';
import { Tab } from "packages/kzui/src";
import { DemoDisplayCard } from '../components';
import { ReactMarkdown } from '../components/react-markdown-wrap/index';
import docContent from '../docs/tab.md';
// import Tab from 'packages/kzui/src/components/tab';

const demoList = [
  {
    description: {
      title: 'Tab',
      content: 'Tab'
    },
    code: `
\`\`\`js
const [curTab, setCurTab] = useState(0)
const tabTitles = ['duck', 'fish'];

const handleChangeTab = (_curTab: number) => {
  if (_curTab !== curTab) {
    setCurTab(_curTab)
  }
}

return (
  <Tab
    curIndex={curTab}
    onChange={handleChangeTab}
    tabTitles={tabTitles}
  >
    <div>cute</div>
    <div>dute</div>
  </Tab>
)
\`\`\`
    `,
    reactCode: () => {

      const [curTab, setCurTab] = useState(0)
      const tabTitles = ['duck', 'fish'];

      const handleChangeTab = (_curTab: number) => {
        if (_curTab !== curTab) {
          setCurTab(_curTab)
        }
      }

      return (
        <Tab
          curIndex={curTab}
          onChange={handleChangeTab}
          tabTitles={tabTitles}
        >
          <div>cute</div>
          <div>dute</div>
        </Tab>
      )
    }
  },
]

const TabDemo: React.FC = () => (
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

export default TabDemo;