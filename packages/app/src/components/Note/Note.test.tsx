import userEvent from '@testing-library/user-event'

import { TNote } from '@/store/note/note.store'

import { DeleteArea } from '@/components'

import { dragAndDrop, render, screen } from '@/utils/test-utils'

import Note from '.'

const data: TNote = {
  id: 's5d456sd4sd4-sd4s6d54sd65a4sd-sda5',
  description: '',
  date: 'date',
}

describe('<Note/>', () => {
  const user = userEvent.setup()

  it('should be empty', async () => {
    render(<Note data={data} />)
    const input = screen.getByRole('textbox')
    expect(input.textContent).toBe('')
  })

  it('should clear a note', async () => {
    render(<Note data={data} />)
    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.type(input, 'note input with text')
    await user.clear(input)

    expect(input.textContent).toBe('')
  })

  it('should edit a note', async () => {
    let inputValue = ''
    const handleChange = ({ description }: TNote) => (inputValue = description)

    render(<Note data={data} onChange={handleChange} />)

    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.type(input, 'note input with large text')

    input.blur()

    expect(input.textContent).toBe('note input with large text')
    expect(inputValue).toEqual('note input with large text')
  })

  it('should drag and drop a note', async () => {
    let didDrop = false
    const handleCanDrop = () => (didDrop = true)

    const draggable = render(<Note data={data} />).baseElement
    const dropzone = render(
      <DeleteArea onCanDrop={handleCanDrop} />
    ).baseElement

    const result = dragAndDrop(draggable, dropzone)

    expect(result).toBeTruthy()
    expect(result).toEqual(didDrop)
  })
})
