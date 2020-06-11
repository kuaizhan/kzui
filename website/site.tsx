import * as React from 'react'
import { ButtonDemo } from './demos/button'
import { componentSectionItems } from './demos/index'

import MainContent from './components/main-content'
import MainContentInner from './components/main-content-inner'
import Header from './components/header'
import SideLayout from './components/side-layout'
import SideNav from './components/side-nav'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './style.less'
import { designSectionItems } from './design'

const Site = () => {
  const componentSectionsWithCur = componentSectionItems.map(section => ({
    ...section,
    linkType: 'Link',
    href: `/${section.text}`,
    name: section.text
  }))

  const designSectionsWithCur = designSectionItems.map(section => ({
    ...section,
    linkType: 'Link',
    href: `/${section.text}`,
    name: section.text
  }))

  const sections = [
    {
      title: '设计',
      items: designSectionsWithCur
    },
    {
      title: '组件',
      items: componentSectionsWithCur
    }
  ]
  
  return (
    <Router>
      <>
        <Header></Header>
        <SideLayout>
          <SideNav sections={sections} />
          <MainContent>
            <MainContentInner>
              <Switch>
                <Route exact path='/' component={ButtonDemo} />
                {componentSectionsWithCur.map(item => (
                  <Route exact path={item.href} component={item.component} />
                ))}
              </Switch>
            </MainContentInner>
          </MainContent>
        </SideLayout>
      </>
    </Router>
  )
}

export { Site }
