'use client'

import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
// import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
// import { Media } from '../../../_components/Media'
// import { Price } from '../../../_components/Price'
// import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}
interface ModalProps {
  onConfirm: (type: string) => void
}

function DeliveryModal({ onConfirm }: ModalProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button onClick={handleOpen} label="Choose Delivery" appearance="secondary" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-lg font-bold">Shipping : Delivery</h1>
          <p className="text-sm">
            <span className="font-bold">Shipping Address:</span> 625 Rodriguez St. Pasay City
            Barangay 135, Pasay City, Metro Manila, Metro Manila, 1304
          </p>

          <div className="flex justify-end mt-8 space-x-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
            >
              cancel
            </button>
            <button
              onClick={() => {
                onConfirm('Delivery')
                handleClose()
              }}
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

function PickUpModal({ onConfirm }: ModalProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button onClick={handleOpen} label="Choose Pick-up" appearance="secondary" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-lg font-bold">Shipping : Pick-up</h1>
          <p className="text-sm">
            <span className="font-bold">Pick-up Address:</span> 147, 10th Floor Medical Plaza
            Building, Amorsolo Street, Makati, 1200 Metro Manila
          </p>

          <p className="mt-4 text-sm">
            <span className="font-bold">Policy Enforcement:</span> Upon confirming your pick-up
            order, please make sure to pick up your items within 2 days.
          </p>
          <div className="flex justify-end mt-8 space-x-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
            >
              cancel
            </button>
            <button
              onClick={() => {
                onConfirm('Pick-up')
                handleClose()
              }}
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

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()
  const [shippingType, setShippingType] = React.useState('Please Select Shipping Type')
  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Click here</Link>
                  {` to shop.`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>Log in</Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                {/* CART LIST HEADER */}
                <div className={classes.header}>
                  <p className="font-bold">Products</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p className="font-bold">Quantity</p>
                  </div>
                  <p className={classes.headersubtotal}>Subtotal</p>
                </div>
                {/* CART ITEM LIST */}

                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className="flex justify-around space-x-5">
                  <DeliveryModal onConfirm={type => setShippingType(type)} />
                  <PickUpModal onConfirm={type => setShippingType(type)} />
                </div>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Summary</h6>
                </div>
                <div className={classes.row}>
                  <h6>Shipping: </h6>
                  <h6>{shippingType}</h6>
                </div>
                {/* <div className={classes.row}>
                  <p>Delivery Charge</p>
                  <p>₱0</p>
                </div> */}

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Grand Total</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>

                <Button
                  className={classes.checkoutButton}
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Checkout' : 'Login to checkout'}
                  appearance="primary"
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
