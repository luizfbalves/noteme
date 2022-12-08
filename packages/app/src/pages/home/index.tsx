import React, { useRef, useState } from 'react'

import { findUserType, GET_FINDUSER } from '@/features/apollo/notes'
import { useQuery } from '@apollo/client'
import { Loader } from 'rsuite'

import { useAppDispatch } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note } from '@/components'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { loading, error } = useQuery<findUserType>(GET_FINDUSER, {
    variables: { findUserId: '2e06c717-391f-4cc7-b345-e5ac51cdf8e0' }, onCompleted: ({findUser}) => {
      setNotes(findUser.notes)
      setName(`Hi ${findUser.name}`)
    }
  })

  //states
  const [searchText, setSearchText] = useState('')
  const [notes, setNotes] = useState<TNote[]>()
  const [name, setName] = useState('User')

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
        {loading ? (
          <Loader id="loader" />
        ) : error ? (
          <div>{`something went wrong =/`}</div>
        ) : (
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
        )}
      </Content>
    </Container>
  )
}

export default Home

//TODO create dinamic greetings
