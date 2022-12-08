import React, { useRef, useState } from 'react'

import { getAllNotesType } from '@/services/rtk/notesApi'
import { Loader } from 'rsuite'

import { useAppDispatch } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note } from '@/components'

import { NavHeader, Container, Content } from './styles'
import { useQuery } from '@apollo/client'
import { GET_ALLNOTES } from '@/features/apollo/notes'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const {data, loading, error} = useQuery<getAllNotesType>(GET_ALLNOTES)

  const [searchText, setSearchText] = useState('')
  const noteRef = useRef<TNote>()

  const handleChange = (value: TNote) => (noteRef.current = value)

  const handleDrop = (id: string) => id && dispatch(deleteNote({ id }))

  const handleBlur = () => {
    noteRef.current && dispatch(editNote(noteRef.current))
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <Container>
      <NavHeader>
        <SearchBar placeholder="Search for a note..." onChange={handleSearch} />
        <ThemeToggler />
      </NavHeader>
      <div className="greetings">
        <strong>Hi Luiz</strong>
        <span>all your notes here in one place!</span>
      </div>
      <Content className="content" onBlur={handleBlur}>
        {loading ? (
          <Loader id="loader" />
        ) : error ? (
          <div>{`something went wrong =/`}</div>
        ) : (
          data?.allNotes &&
          data.allNotes
            .filter((item) => item.description.includes(searchText) ?? true)
            .map((item) => (
              <Note
                key={item.id}
                data={item}
                onChange={handleChange}
                onDrop={handleDrop}
              />
            ))
        )}
      </Content>
    </Container>
  )
}

export default Home

//TODO create dinamic greetings
