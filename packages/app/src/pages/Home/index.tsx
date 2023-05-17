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

  const loadingComp = <Loader id="loader" />
  const errorComp = <ErrorMessage>{`something went wrong =/`}</ErrorMessage>

  return (
    <Container>
      <NavHeader>
        <SearchBar placeholder="Search for a note..." onChange={handleSearch} />
        <ThemeToggler />
      </NavHeader>
      <div className="greetings">
        <strong>{username ? `Hi ${username}!` : ``}</strong>
        <span>all your notes here in one place!</span>
      </div>
      <Content className="content">
        {state === 'loading'
          ? loadingComp
          : state === 'failed'
          ? errorComp
          : state === 'fulfilled'
          ? notes
              .filter((item) => item.description.includes(searchText) ?? true)
              .map((item) => (
                <Note
                  key={item.id}
                  data={item}
                  onChange={handleChange}
                  onDrop={handleDelete}
                />
              ))
          : undefined}
      </Content>
    </Container>
  )
}

export default Home

//TODO refactor handle methods to prevent rerender
