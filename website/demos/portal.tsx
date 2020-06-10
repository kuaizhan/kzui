import * as React from 'react'
import Portal from 'packages/kzui/src/components/portal'

const PortalDemo = () => {
  return (
    <div>
      <h2>Portal Component does not work</h2>
      <Portal>
        <div>Let's see what Portal does</div>
      </Portal>
    </div>
  )
}

export { PortalDemo }