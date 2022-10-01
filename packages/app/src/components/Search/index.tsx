import React from 'react'
import { TbSearch } from 'react-icons/tb'

import { Search } from './styles'

interface SearchBarTypes {
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar: React.FC<SearchBarTypes> = ({
  placeholder = 'Search...',
  onChange,
}) => {
  return (
    <Search>
      <TbSearch />
      <input placeholder={placeholder} onChange={onChange} />
    </Search>
  )
}
