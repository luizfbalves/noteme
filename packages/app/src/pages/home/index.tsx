import React, { useState } from 'react'

import { GET_ALLNOTES } from '@/services/apollo/documents/notes.gql'
import { AllNotesInterface } from '@/services/apollo/documents/notes.types'
import { useQuery } from '@apollo/client'
import { Loader } from 'rsuite'

import { useAppSelector } from '@/store/hooks'

import { SearchBar, ThemeToggler, Note, ErrorMessage } from '@/components'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  const { username, id } = useAppSelector((state) => state.userReducer)

  const { data, loading, error } = useQuery<AllNotesInterface>(GET_ALLNOTES, {
    variables: { userId: id },
  })

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
        <strong>{`Hi ${username}!`}</strong>
        <span>all your notes here in one place!</span>
      </div>
      <Content className="content">
        {loading && <Loader id="loader" />}
        {error && <ErrorMessage>{`something went wrong =/`}</ErrorMessage>}
        {data &&
          Array.isArray(data.allNotes) &&
          data.allNotes
            .filter((item) => item.description.includes(searchText) ?? true)
            .map((item) => <Note key={item.id} data={item} />)}
      </Content>
    </Container>
  )
}

export default Home
