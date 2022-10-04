import React, { useEffect } from 'react'
import { useMultiDrop } from 'react-dnd-multi-backend'
import { TbTrash } from 'react-icons/tb'

import { Wrapper, DeleteButton } from './styles'

type TDeleteAreaEvent = {
  onCanDrop?: () => void
}

export const DeleteArea: React.FC<TDeleteAreaEvent> = ({ onCanDrop }) => {
  const [[{ canDrop }, drop]] = useMultiDrop({
    accept: 'note',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  })

  useEffect(() => {
    if (typeof onCanDrop === 'function') {
      onCanDrop()
    }
  }, [canDrop])

  return (
    <Wrapper ref={drop} show={canDrop} id="dnd" role="dropzone">
      <DeleteButton>{<TbTrash />}</DeleteButton>
    </Wrapper>
  )
}
