import React, { useEffect, useState } from 'react'

import { Modal, Button } from 'rsuite'

export type DialogTypes = {
  data: {
    title: string
    isOpen: boolean
    content: string
  }
  callBack: (result: boolean) => void
  onClose: () => void
}

export const Dialog: React.FC<DialogTypes> = (props) => {
  const { title, content, isOpen = false } = props.data
  const { callBack, onClose } = props

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const handleSubmit = (result: boolean) => {
    callBack(result)
    handleClose()
  }

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <>
      <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSubmit(true)} appearance="primary">
            Delete
          </Button>
          <Button onClick={() => handleSubmit(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Dialog
