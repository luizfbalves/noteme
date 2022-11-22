import React from 'react'

import {useDraggable} from '@dnd-kit/core'

export const Draggable: React.FC<{ children: any , id: string }> = (props: any) => {
  const Element = 'div';

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  })

  return (
    <Element ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </Element>
  )
}

export default Draggable