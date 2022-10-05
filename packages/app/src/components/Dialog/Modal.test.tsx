import userEvent from '@testing-library/user-event'

import { render, screen } from '@/utils/test-utils'

import Modal from '.'

describe('<Modal/>', () => {
  const user = userEvent.setup()

  it('should display a modal and return true', async () => {
    let callBackResult = false
    let isOpen = true

    const handleCallBack = (result: boolean) => (callBackResult = result)
    const handleOnClose = () => (isOpen = false)

    render(
      <Modal
        data={{ title: 'jest', content: 'jest modal test', isOpen }}
        callBack={handleCallBack}
        onClose={handleOnClose}
      />
    )
    const element = screen.getByText('jest modal test')
    const submit = screen.getByText('Delete', { selector: 'button' })

    await user.click(element)
    await user.click(submit)

    expect(isOpen).toBeFalsy()
    expect(callBackResult).toBeTruthy()
  })
})
