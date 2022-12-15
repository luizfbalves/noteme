import React from 'react'
import { TbCirclePlus, TbDoorExit } from 'react-icons/tb'
import { Link } from 'react-router-dom'

import { v4 as uuidV4 } from 'uuid'

import { useAppDispatch } from '@/store/hooks'
import { insertNote, TNote } from '@/store/note/note.store'
import { userData } from '@/store/user/user.store'

import { handleSignOut } from '@/utils/auth'
import { dateRFC } from '@/utils/index'

import { Wrapper, Label } from './styles'

export const SideNav: React.FC = () => {
  const dispatch = useAppDispatch()

  const newNote = () => {
    const note: TNote = {
      id: uuidV4(),
      description: '',
      updatedAt: dateRFC,
    }

    dispatch(insertNote(note))
  }

  const signOut = async () => {
    try {
      await handleSignOut()
      dispatch(userData({ isLoading: false, isLogged: false, token: '' }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper id="sidenav">
      <ul>
        <li className="brand">
          <img src="/assets/images/ico.svg" alt="note.me" />
        </li>
        <div id="menu-itens">
          <li className="add-note" onClick={newNote}>
            <TbCirclePlus />
            <Label className="label">add note</Label>
          </li>
        </div>
        <li>
          <Link to="/signin" onClick={signOut}>
            <Label className="label">logout</Label>
            <TbDoorExit />
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}

export default SideNav
