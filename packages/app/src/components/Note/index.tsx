import React, { useEffect, useRef, useState } from 'react'
import { TbTrashX } from 'react-icons/tb'

import { TNote } from '@/store/note/note.store'

import { Dialog } from '@/components'

import { dateLL } from '@/utils/index'

import { Card, CloseButton, Textarea } from './styles'

type NoteEvent = {
  data: TNote
  onChange?: (data: TNote, event: React.FormEvent<Element>) => void
  onDrop?: (id: string) => void
}

export const Note: React.FC<NoteEvent> = (props) => {
  const { data, onChange, onDrop } = props
  const { id, userId, description, updatedAt } = data

  const noteRef = useRef<HTMLDivElement>(null)

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleInput = (event: React.FormEvent<HTMLDivElement>): void => {
    const input = event.currentTarget.textContent || description

    if (typeof onChange === 'function') {
      onChange({ id, userId, description: input, updatedAt }, event)
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

  useEffect(() => {
    if (noteRef.current) {
      noteRef.current.innerText = description
    }
  }, [])

  return (
    <>
      {dialog}
      <Card>
        <div className="card-header">
          <CloseButton title="delete note" onClick={() => setDialogOpen(true)}>
            <TbTrashX />
          </CloseButton>
        </div>
        <div className="content">
          <Textarea
            ref={noteRef}
            contentEditable
            aria-multiline
            suppressContentEditableWarning
            role="textbox"
            placeholder={'type your note'}
            onInput={handleInput}
            defaultValue={description}
          />
          <span className="card-date">{dateLL(updatedAt)}</span>
        </div>
      </Card>
    </>
  )
}

export default Note
