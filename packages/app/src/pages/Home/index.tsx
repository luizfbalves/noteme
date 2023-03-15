import React, { useState } from 'react'

import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { TNote, deleteNote, editNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note, ErrorMessage } from '@/components'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const [searchText, setSearchText] = useState('')

  const { username } = useAppSelector((state) => state.userReducer)
  const { notes, state } = useAppSelector((state) => state.noteReducer)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const handleChange = async (data: TNote) => {
    dispatch(editNote(data))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteNote({ id }))
  }

  const loadingComponent = state === 'loading' && <Loader id="loader" />
  const errorComponent = state === 'failed' && (
    <ErrorMessage>{`something went wrong =/`}</ErrorMessage>
  )

  console.log('render')

  return (
    <Container>
      <NavHeader>
        <SearchBar placeholder="Search for a note..." onChange={handleSearch} />
        <ThemeToggler />
      </NavHeader>
      {username ? (
        <div className="greetings">
          <>
            <strong>{`Hi ${username}!`}</strong>
            <span>all your notes here in one place!</span>
          </>
        </div>
      ) : (
        <Loader id="loader" />
      )}
      <Content className="content">
        {loadingComponent}
        {errorComponent}
        {state === 'fulfilled' &&
          notes
            .filter((item) => item.description.includes(searchText) ?? true)
            .map((item) => (
              <Note
                key={item.id}
                data={item}
                onChange={handleChange}
                onDrop={handleDelete}
              />
            ))}
      </Content>
    </Container>
  )
}

export default Home
