import React, { useEffect, useState } from 'react'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Loader } from 'rsuite'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteNote, editNote, TNote } from '@/store/note/note.store'

import { SearchBar, ThemeToggler, Note, DeleteArea, Draggable } from '@/components'

import { timeout } from '@/utils'

import { NavHeader, Container, Content } from './styles'


export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const notesReducer = useAppSelector((state) => state.noteReducer)

  const [notes, setNotes] = useState<TNote[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [data, setData] = useState<TNote>({
    id: '',
    description: '',
    date: '',
  })

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    if (data.id) {
      dispatch(editNote(data))
    }
  }

  const handleChange = (note: TNote, event: React.FormEvent<Element>) => {
    event.preventDefault()

    if (note.id) {
      setData(note)

      //TODO find way to dispatch data here
      // timeout(700, () => {
      //   dispatch(editNote(note))
      // })
    }
  }

  const handleDrop = (id: string) => {
    if (id) {
      dispatch(deleteNote({ id }))
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const value = event.target.value

    timeout(700, () => {
      if (value) {
        const filteredData = notesReducer.notes.filter((note) =>
          note.description.includes(value)
        )
        setNotes(filteredData)
      } else {
        setNotes(notesReducer.notes)
      }
    })
  }


  const handleDragStart = () => {
    setIsDragging(true);
    console.log(isDragging);
    
  }
  
  const handleDragEnd = () => {
    setIsDragging(false);
  }

  useEffect(() => {
    if (notesReducer.notes !== notes) {
      setNotes(notesReducer.notes)
    }
  }, [notesReducer.notes])

  //TODO create dinamic greetings
  //TODO create draggable component to wrap notes
  return (
    <Container>
      <NavHeader>
        <SearchBar placeholder="Search for a note..." onChange={handleSearch} />
        <ThemeToggler />
      </NavHeader>
      <div className="greetings">
        <strong>Hi Luiz</strong>
        <span>all your notes here in one place!</span>
      </div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>  
        {notesReducer.state === 'loading' ? (
          <Loader id="loader" />
        ) : (
            <Content className="content" onBlur={handleSubmit}>
              {notes.map((note: TNote) =>
                note.id ? (
                  <div key={note.id}>
                    {
                      !isDragging ? (
                        <Note
                        data={note}
                        onChange={handleChange}
                        onDrop={handleDrop}
                      />
                      ) : undefined
                    }
                    <DragOverlay>
                      {
                        isDragging ? (
                          <Note
                          data={note}
                          onChange={handleChange}
                          onDrop={handleDrop}
                        />
                        ) : undefined
                      }
                    </DragOverlay>
                    </div>
                  ) : undefined
                )}
            </Content>
          )
        }
        <DeleteArea />
      </DndContext>
    </Container>
  )
}

export default Home
