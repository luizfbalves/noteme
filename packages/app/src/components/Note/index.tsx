import React from 'react'
import { useMultiDrag } from 'react-dnd-multi-backend'
import { TbTrashX } from 'react-icons/tb'

import { TNote } from '@/store/note/note.store'

import { dateLL } from '@/utils/index'

import { Card, CloseButton, Textarea } from './styles'

export type TItem = {
  id: string
}

type TNoteEvent = {
  data: TNote
  onChange?: (data: TNote, event: React.FormEvent<Element>) => void
  onDrop?: (item: TItem) => void
}
export const Note: React.FC<TNoteEvent> = ({ data, onChange, onDrop }) => {
  const { id, description, date } = data

  const handleInput = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault()

    const textContent = event.currentTarget.textContent || description

    if (typeof onChange === 'function') {
      onChange({ id, description: textContent, date }, event)
    }
  }

  const [[, drag]] = useMultiDrag({
    type: 'note',
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ id: string }>()
      if (item && dropResult) {
        if (typeof onDrop === 'function') {
          onDrop(item)
        }
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  //TODO create delete button handler
  return (
    <Card role={'note'} ref={drag}>
      <div className="card-header">
        <CloseButton>
          <TbTrashX />
        </CloseButton>
      </div>
      <Textarea
        contentEditable
        aria-multiline
        suppressContentEditableWarning
        role="textbox"
        placeholder={'type your note'}
        onInput={(event) => handleInput(event)}
      >
        {description}
      </Textarea>
      <span className="card-date">{dateLL(date)}</span>
    </Card>
  )
}

export default Note
