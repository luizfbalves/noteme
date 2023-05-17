import userEvent from '@testing-library/user-event'

import { render, screen } from '@/utils/test-utils'

import Dialog from '.'

describe('<Dialog/>', () => {
  const user = userEvent.setup()

  it('should display a dialog and return true', async () => {
    let callBackResult = false
    let isOpen = true

    const handleCallBack = (result: boolean) => (callBackResult = result)
    const handleOnClose = () => (isOpen = false)

    render(
      <Dialog
        data={{ title: 'jest', content: 'jest dialog test', isOpen }}
        callBack={handleCallBack}
        onClose={handleOnClose}
      />
    )

    const element = screen.getByText('jest dialog test')
    const submit = screen.getByText('Confirm', { selector: 'button' })

    await user.click(element)
    await user.click(submit)

    expect(isOpen).toBeFalsy()
    expect(callBackResult).toBeTruthy()
  })

  it('should display a dialog and return false', async () => {
    let callBackResult = false
    let isOpen = true

    const handleCallBack = (result: boolean) => (callBackResult = result)
    const handleOnClose = () => (isOpen = false)

    render(
      <Dialog
        data={{ title: 'jest', content: 'jest dialog test', isOpen }}
        callBack={handleCallBack}
        onClose={handleOnClose}
      />
    )
    const element = screen.getByText('jest dialog test')
    const submit = screen.getByText('Cancel', { selector: 'button' })

    await user.click(element)
    await user.click(submit)

    expect(isOpen).toBeFalsy()
    expect(callBackResult).toBeFalsy()
  })
})
