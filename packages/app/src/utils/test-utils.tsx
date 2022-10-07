import React, { FC, ReactElement } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import { Provider } from 'react-redux'

import { CustomThemeProvider } from '@/hooks/theme'
import { fireEvent, render, RenderOptions } from '@testing-library/react'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

import store from '@/store/store'
import { BrowserRouter as Router } from 'react-router-dom'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <DndProvider options={HTML5toTouch}>
        <Router>
          <CustomThemeProvider theme="light">{children}</CustomThemeProvider>
        </Router>
      </DndProvider>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export function dragAndDrop(src: Element, dst: Element) {
  fireEvent.dragStart(src)
  fireEvent.dragEnter(dst)
  fireEvent.dragOver(dst)
  return fireEvent.dragEnd(dst)
}

export * from '@testing-library/react'
export { customRender as render }
