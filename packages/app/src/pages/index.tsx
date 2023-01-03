import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchInitialNotes } from '@/store/thunks'

import { SideNav } from '../components/index'
import Home from './home'
import { Content } from './styles'

export default function Pages() {
  const dispatch = useAppDispatch()

  const { id } = useAppSelector((state) => state.userReducer)

  useEffect(() => {
    if (id) {
      dispatch(fetchInitialNotes(id))
    }
  }, [id])

  return (
    <Content>
      <SideNav />
      <div id="pages">
        <Home />
      </div>
    </Content>
  )
}

export * from './home'
export * from './signIn'
export * from './signUp'
export * from './confirmSignUp'
