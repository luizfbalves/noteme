import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { CustomThemeProvider } from '@/hooks/theme'
import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { fireEvent, render, RenderOptions } from '@testing-library/react'

import { AppStore, rootReducer, RootState } from '@/store/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

type WrapperTypes = {
  children: React.ReactNode
}

function renderWithProviders(
  ui: React.ReactElement,

  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: WrapperTypes): JSX.Element {
    return (
      <Provider store={store}>
        <Router>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </Router>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function dragAndDrop(src: Element, dst: Element) {
  fireEvent.dragStart(src)
  fireEvent.dragEnter(dst)
  fireEvent.drop(dst)
  fireEvent.dragLeave(dst)
  return fireEvent.dragEnd(src)
}

export * from '@testing-library/react'
export { renderWithProviders }
