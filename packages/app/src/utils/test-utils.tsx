import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { CustomThemeProvider } from '@/hooks/theme'
import { fireEvent, render, RenderOptions } from '@testing-library/react'

import store from '@/store/store'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
        <Router>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </Router>
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
  fireEvent.drop(dst)
  fireEvent.dragLeave(dst)
  return fireEvent.dragEnd(src)
}

export * from '@testing-library/react'
export { customRender as render }
