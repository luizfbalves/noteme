import React from 'react'
import { TbTrash } from 'react-icons/tb'

import { Wrapper, DeleteButton } from './styles'

export const Droppable: React.FC = () => {
  return (
    <Wrapper show={false}>
      <DeleteButton>{<TbTrash />}</DeleteButton>
    </Wrapper>
  )
}

export default Droppable
