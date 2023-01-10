import userEvent from '@testing-library/user-event'

import { TNote } from '@/store/note/note.store'

import { dateRFC } from '@/utils'
import { render, screen } from '@/utils/test-utils'

import Note from '.'

const data: TNote = {
  id: 's5d456sd4sd4-sd4s6d54sd65a4sd-sda5',
  userId: 's5d456sd4sd4-sd4s6d54sd65a4sd-sda5',
  description: '',
  updatedAt: dateRFC,
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
})
