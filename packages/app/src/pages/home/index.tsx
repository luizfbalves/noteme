import React, { useEffect, useState } from 'react'

import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note } from '@/components'

import { timeout } from '@/utils'

import { NavHeader, Container, Content } from './styles'

const initialData = {
  id: '',
  description: '',
  date: '',
}

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const notesReducer = useAppSelector((state) => state.noteReducer)

  const [notes, setNotes] = useState<TNote[]>([])
  const [data, setData] = useState<TNote>(initialData)

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    if (data.id) {
      dispatch(editNote(data))
    }
  }

  const handleChange = (note: TNote, event: React.FormEvent<Element>) => {
    event.preventDefault()

    note.id ? setData(note) : null
  }

  const handleDrop = (id: string) => id ? dispatch(deleteNote({ id })) : null

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const value = event.target.value

    timeout(700, () => {
      if (value) {
        const filteredData = notesReducer.notes.filter((note) =>
          note.description.includes(value)
        )
        setNotes(filteredData)
      } else {
        setNotes(notesReducer.notes)
      }
    })
  }
  
  useEffect(() => {
    setNotes(notesReducer.notes)
  }, [notesReducer.notes])
  
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
      {notesReducer.state === 'loading' ? (
        <Loader id="loader" />
      ) : (
        <Content className="content" onBlur={handleSubmit}>
          {notes.map((note: TNote) => (
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
