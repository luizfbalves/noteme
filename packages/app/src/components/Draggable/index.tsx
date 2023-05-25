import React from 'react'

import { useDraggable } from '@dnd-kit/core'
import { CSSProperties } from 'styled-components'

export interface Props {
  id: string
  children?: React.ReactNode
}

export const Draggable: React.FC<Props> = (props) => {
  const { id, children } = props

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style: CSSProperties = transform
    ? {
        zIndex: '1',
        opacity: '0.8',
        scale: '0.9',
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: 'opacity ease 0.4s, scale ease 0.4s',
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}
