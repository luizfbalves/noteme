import React, { useRef, useState } from 'react'

import { GET_FINDUSER } from '@/features/apollo/documents/notes.gql'
import { findUserType } from '@/features/apollo/documents/notes.types'
import { useQuery } from '@apollo/client'
import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note, ErrorMessage } from '@/components'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { id, username } = useAppSelector((state) => state.userReducer)

  const { loading, error } = useQuery<findUserType>(GET_FINDUSER, {
    variables: { findUserId: id },
    onCompleted: ({ findUser }) => {
      const { notes } = findUser

      console.log(notes)
      Array.isArray(notes) && setNotes(notes)
      setName(`Hi ${username}`)
    },
  })
  console.log(error)
  //states
  const [searchText, setSearchText] = useState('')
  const [notes, setNotes] = useState<TNote[]>()
  const [name, setName] = useState(username)

  //refs
  const noteRef = useRef<TNote>()

  //methods
  const handleChange = (value: TNote) => (noteRef.current = value)

  const handleDrop = (id: string) => id && dispatch(deleteNote({ id }))

  const handleBlur = () => {
    noteRef.current && dispatch(editNote(noteRef.current))
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const LoadingElement = loading && <Loader id="loader" />

  const ErrorElement = error && (
    <ErrorMessage>{`something went wrong =/`}</ErrorMessage>
  )

  const NotesElement =
    notes &&
    notes
      .filter((item) => item.description.includes(searchText) ?? true)
      .map((item) => (
        <Note
          key={item.id}
          data={item}
          onChange={handleChange}
          onDrop={handleDrop}
        />
      ))

  return (
    <Container>
      <NavHeader>
        <SearchBar placeholder="Search for a note..." onChange={handleSearch} />
        <ThemeToggler />
      </NavHeader>
      <div className="greetings">
        <strong>{name}</strong>
        <span>all your notes here in one place!</span>
      </div>
      <Content className="content" onBlur={handleBlur}>
        {LoadingElement}
        {ErrorElement}
        {NotesElement}
      </Content>
    </Container>
  )
}

export default Home

//TODO add loading screen on first render
