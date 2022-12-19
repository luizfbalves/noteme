import React, { useState } from 'react'

import { Loader } from 'rsuite'

import { TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note, ErrorMessage } from '@/components'

import { NavHeader, Container, Content } from './styles'

export const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [notes] = useState<TNote[]>()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  console.log('home')
  return (
    <Container>
      <NavHeader>
        <SearchBar placeholder="Search for a note..." onChange={handleSearch} />
        <ThemeToggler />
      </NavHeader>
      <div className="greetings">
        <strong>{`Hi`}</strong>
        <span>all your notes here in one place!</span>
      </div>
      <Content className="content">
        {false && <Loader id="loader" />}
        {false && <ErrorMessage>{`something went wrong =/`}</ErrorMessage>}
        {notes &&
          notes
            .filter((item) => item.description.includes(searchText) ?? true)
            .map((item) => <Note key={item.id} data={item} />)}
      </Content>
    </Container>
  )
}

export default Home
