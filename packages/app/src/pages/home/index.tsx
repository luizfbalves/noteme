import React, { useState } from 'react'

import { Loader } from 'rsuite'

import { useAppSelector } from '@/store/hooks'

import { SearchBar, ThemeToggler, Note, ErrorMessage } from '@/components'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  const { username } = useAppSelector((state) => state.userReducer)
  const { notes, state } = useAppSelector((state) => state.noteReducer)

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
        {state === 'loading' && <Loader id="loader" />}
        {state === 'failed' && (
          <ErrorMessage>{`something went wrong =/`}</ErrorMessage>
        )}
        {notes
          .filter((item) => item.description.includes(searchText) ?? true)
          .map((item) => (
            <Note key={item.id} data={item} />
          ))}
      </Content>
    </Container>
  )
}

export default Home
