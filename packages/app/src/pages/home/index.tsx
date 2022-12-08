import React, { useEffect, useRef, useState } from 'react'

import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note } from '@/components'

import { NavHeader, Container, Content } from './styles'
import { useGetAllNotesQuery } from '@/services/rtk/notesApi'

export const Home: React.FC = () => {

  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useGetAllNotesQuery({})

  const [searchText, setSearchText] = useState('')
  const noteRef = useRef<TNote>()

  const handleChange = (value: TNote) => (noteRef.current = value)
  
  const handleDrop = (id: string) => id && dispatch(deleteNote({ id }))
  
  const handleBlur = () => noteRef.current && dispatch(editNote(noteRef.current))
  
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
            {
              isLoading ? (
                <Loader id="loader" />
              ) :
                error ? (
                  <div>'something went wrong =/'</div>
            ) : data ? (
              data.filter((item) =>
              item.description.includes(searchText) ?? true
                    ).map((item) => (
                      <Note
                        key={item.id}
                        data={item}
                        onChange={handleChange}
                        onDrop={handleDrop}
                      />
                    ))
                ) : null
            }
        </Content>
    </Container>
  )
}

export default Home

//TODO create dinamic greetings
