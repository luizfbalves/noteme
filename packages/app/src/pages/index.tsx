import React, { useEffect } from 'react'

import { refreshSession } from '@/auth'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { useAppDispatch } from '@/store/hooks'
import { deleteNote } from '@/store/note/note.store'
import { fetchInitialNotes } from '@/store/thunks'
import { clearUserData } from '@/store/user/user.store'

import { Droppable, SideNav } from '../components/index'
import Home from './Home'
import { Content } from './styles'

const Pages: React.FC = () => {
  const dispatch = useAppDispatch()

  async function sessionValidate() {
    const { data } = await refreshSession()

    if (data.session && data.user) {
      const { id } = data.user
      dispatch(fetchInitialNotes(id))
    } else {
      dispatch(clearUserData())
    }
  }

  useEffect(() => {
    sessionValidate()
  }, [])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 400,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, activatorEvent, over } = event
    console.log(activatorEvent, over)
    if (active.id && over) {
      dispatch(deleteNote({ id: active.id.toString() }))
    }
  }

  return (
    <Content>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SideNav />
        <div id="pages">
          <Home />
          <Droppable />
        </div>
      </DndContext>
    </Content>
  )
}

export default Pages

export * from './ConfirmSignUp'
export * from './Home'
export * from './SignIn'
export * from './SignUp'
