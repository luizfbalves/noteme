import userEvent from '@testing-library/user-event'

import { TNote } from '@/store/note/note.store'

import { render, screen } from '@/utils/test-utils'

import Note from '.'

const data: TNote = {
  id: 'nsdnasd',
  description: '',
  date: 'date',
}

describe('<Note/>', () => {
  const user = userEvent.setup()

  test('should be empty', async () => {
    render(<Note data={data} />)
    const input = screen.getByRole('textbox')
    expect(input.textContent).toBe('')
  })

  test('should clear a note', async () => {
    render(<Note data={data} />)
    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.type(input, 'note input with text')
    await user.clear(input)

    expect(input.textContent).toBe('')
  })

  test('should edit a note', async () => {
    let inputValue = ''
    const handleChange = ({ description }: TNote) => (inputValue = description)

    render(<Note data={data} onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.type(input, 'note input with large text')

    expect(input.textContent).toBe('note input with large text')
    expect(inputValue).toEqual('note input with large text')
  })

  //TODO refactor dnd test

  // test('should drag and drop a note', async () => {
  //   let dropId: string = ''
  //   const handleDrop = ({ id }: TItem) => (dropId = id)

  //   const NoteElement = render(
  //     <Note data={data} onDrop={handleDrop} />
  //   ).baseElement
  //   const DnDElement = render(<DeleteArea />).baseElement

  //   const result = dragAndDrop(NoteElement, DnDElement)
  //   console.log(dropId)

  //   expect(result).toBeTruthy()
  //   expect(dropId).toEqual(data.id)
  // })
})
