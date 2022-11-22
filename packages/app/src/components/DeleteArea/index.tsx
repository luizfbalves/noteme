import React from 'react'
import { TbTrash } from 'react-icons/tb'

import { useDroppable } from '@dnd-kit/core'

import { Wrapper, DeleteButton } from './styles'

export const DeleteArea: React.FC = () => {

  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  })

  console.log(isOver)

  return (
    <Wrapper ref={setNodeRef} show={false} id="dnd" role="dropzone">
      <DeleteButton>{<TbTrash />}</DeleteButton>
    </Wrapper>
  )
}

export default DeleteArea
