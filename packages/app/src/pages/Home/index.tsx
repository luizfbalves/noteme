import React, { useMemo, useState } from 'react'

import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { TNote, deleteNote, editNote } from '@/store/note/note.store'

import { ErrorMessage, Note, SearchBar, ThemeToggler } from '@/components'
import { Draggable } from '@/components/Draggable'

import { Container, Content, NavHeader } from './styles'

const pageSize = 10
export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const [searchText, setSearchText] = useState('')
  const { username } = useAppSelector((state) => state.userReducer)
  const { notes, state } = useAppSelector((state) => state.noteReducer)

  const filteredNotes = useMemo(() => {
    if (notes) {
      return notes.filter(
        (item) => item.description.includes(searchText) ?? true
      )
    }
  }, [notes, searchText])

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

  const paginatedNotes = useMemo(() => {
    const start = 0
    const end = pageSize
    if (filteredNotes) {
      return filteredNotes.slice(start, end)
    }
  }, [filteredNotes])

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
        {state === 'loading' && loadingComp}
        {state === 'pending' && loadingComp}
        {state === 'failed' && errorComp}
        {Array.isArray(paginatedNotes)
          ? paginatedNotes.map((item) => (
              <Draggable id={item.id} key={item.id}>
                <Note
                  data={item}
                  onChange={handleChange}
                  onDrop={handleDelete}
                />
              </Draggable>
            ))
          : errorComp}
      </Content>
    </Container>
  )
}
export default Home
