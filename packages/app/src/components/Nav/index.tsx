import React from 'react'
import { TbCirclePlus, TbDoorExit } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signOut } from '@/auth'
import { POST_CREATENOTE } from '@/services/apollo/documents/notes.gql'
import { useMutation } from '@apollo/client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { insertNote } from '@/store/note/note.store'
import { userData } from '@/store/user/user.store'

import { Wrapper, Label } from './styles'

export const SideNav: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useAppSelector((state) => state.userReducer)

  const [postCreateNote] = useMutation(POST_CREATENOTE)
  const newNote = async () => {
    const { data } = await postCreateNote({
      variables: {
        data: {
          userId: id,
          description: '',
        },
      },
    })
    const { createNote } = data
    dispatch(insertNote(createNote))
  } //TODO fix this method types

  const handleSignOut = async () => {
    try {
      await signOut()
      dispatch(userData({ isLoading: false, isLogged: false, token: '' }))
    } catch (error) {
      toast.error('something went wrong...')
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
          <Link to="/signin" onClick={handleSignOut}>
            <Label className="label">logout</Label>
            <TbDoorExit />
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}

export default SideNav
