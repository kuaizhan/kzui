
import * as React from "react";
import Button from 'packages/kzui/src/components/button';
import ImageCropper from 'packages/kzui/src/components/image-cropper';
import { DemoDisplayCard } from '../components'
import JsxParser from 'react-jsx-parser'
import { ReactMarkdown } from '../components/react-markdown-wrap/index'
import docContent from '../docs/image-cropper.md';

const demoList = [
  {
    description: {
      title: 'icon',
      content: ''
    },
    code: `
\`\`\`js
<ImageCropper initWidth={200} imgsrc='http://pic.kuaizhan.com/g3/25/b9/35a5-4f67-483c-a79e-6c77add6a27143' />
\`\`\`
    `,
    reactCode: () => {
      return (
        <ImageCropper initWidth={200} imgsrc='http://pic.kuaizhan.com/g3/25/b9/35a5-4f67-483c-a79e-6c77add6a27143' />
      )
    }
  }
]
const ImageCropperDemo = () => (
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

export { ImageCropperDemo };