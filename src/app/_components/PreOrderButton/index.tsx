'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { Button } from '../Button'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

export default function PreOrderButton() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} label="Pre Order" appearance="primary" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-gray-700">
            <p className="mb-4">
              <span className="font-bold">Pre-Order Policy:</span> Secure your item in advance!
            </p>
            <p className="mb-4">
              By placing a pre-order, you reserve this item before it becomes available in stock.
            </p>
            <p className="mb-4">
              <span className="font-bold">Important:</span> Pre-order items may have longer
              processing times. Please review the estimated delivery date before completing your
              purchase.
            </p>
            <p>
              If your order includes both in-stock and pre-order items, they will be shipped
              together when all items are available.
            </p>
          </div>
          <div className="flex justify-center mt-8 space-x-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
            >
              cancel
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
