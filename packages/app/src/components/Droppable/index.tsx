import React from 'react'
import { TbTrash } from 'react-icons/tb'

import { useDroppable } from '@dnd-kit/core'
import { CSSProperties } from 'styled-components'

import { DeleteButton, Wrapper } from './styles'

export const Droppable: React.FC = () => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: 'droppable',
  })

  const style: CSSProperties = {
    background: isOver ? 'rgb(253, 112, 127)' : '#888888',
    transition: 'background ease 0.4s',
  }

  const show = active?.id !== undefined

  return (
    <Wrapper show={show} ref={setNodeRef} style={style}>
      <DeleteButton>{<TbTrash />}</DeleteButton>
    </Wrapper>
  )
}

export default Droppable
