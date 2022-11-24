import React from 'react'
import { TbTrash } from 'react-icons/tb'

import { Wrapper, DeleteButton } from './styles'

export const DeleteArea: React.FC = () => {


  return (
    <Wrapper show={false} id="dnd" role="dropzone">
      <DeleteButton>{<TbTrash />}</DeleteButton>
    </Wrapper>
  )
}

export default DeleteArea
