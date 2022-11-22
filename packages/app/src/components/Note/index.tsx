import React, { useState } from 'react'
import { TbTrashX } from 'react-icons/tb'

import { TNote } from '@/store/note/note.store'

import { Dialog } from '@/components'

import { dateLL } from '@/utils/index'

import { Card, CloseButton, Textarea } from './styles'

export type TItem = {
  id: string
}

type TNoteEvent = {
  data: TNote
  onChange?: (data: TNote, event: React.FormEvent<Element>) => void
  onDrop?: (id: string) => void
}

export const Note: React.FC<TNoteEvent> = ({ data, onChange, onDrop }) => {
  const { id, description, date } = data

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleInput = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault()

    const textContent = event.currentTarget.textContent || description

    if (typeof onChange === 'function') {
      onChange({ id, description: textContent, date }, event)
    }
  }

  const callbackDelete = (result: boolean) => {
    if (typeof onDrop === 'function' && result) {
      onDrop(id)
    }
  }

  const dialog = (
    <Dialog
      data={{
        title: 'Deletion',
        content: 'delete note?',
        isOpen: dialogOpen,
      }}
      onClose={() => setDialogOpen(false)}
      callBack={callbackDelete}
    />
  )

  return (
    <>
      {dialog}
      <Card>
        <div className="card-header">
          <CloseButton onClick={() => setDialogOpen(true)}>
            <TbTrashX />
          </CloseButton>
        </div>
        <div className="content">
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
        </div>
      </Card>
    </>
  )
}

export default Note
