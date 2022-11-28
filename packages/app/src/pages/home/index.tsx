import React, { useRef, useState } from 'react'

import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note } from '@/components'

import { timeout } from '@/utils'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { notes, state } = useAppSelector((state) => state.noteReducer)

  const [searchText, setSearchText] = useState('')

  const searchRef = useRef('')
  const noteRef = useRef<TNote>()

  const handleBlur = () => noteRef.current ? dispatch(editNote(noteRef.current)) : null
  
  const handleDrop = (id: string) => id ? dispatch(deleteNote({ id })) : null
  
  const handleChange = (note: TNote) => noteRef.current = note

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchRef.current = event.target.value

    //delay to only search when user stops typing
    timeout(500, () => {
      setSearchText(searchRef.current)
    })
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
      {state === 'loading' ? (
        <Loader id="loader" />
      ) : (
          <Content className="content" onBlur={handleBlur}>
            {notes
              .filter(note => searchText ? note.description.includes(searchText) : true)
              .map(note => (
            <Note
              key={note.id}
              data={note}
              onChange={handleChange}
              onDrop={handleDrop}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}

export default Home

//TODO create dinamic greetings
