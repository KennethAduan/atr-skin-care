import React, { Fragment } from 'react'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import PreOrderButton from '../../_components/PreOrderButton'
import { Price } from '../../_components/Price'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { title, categories, stocks, meta: { image: metaImage, description } = {} } = product
  // console.log(product)
  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>

      <div className={classes.details}>
        <h3 className="text-4xl font-bold">{title}</h3>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            {categories?.map((category, index) => {
              const { title: categoryTitle } = category as Category

              const titleToUse = categoryTitle || 'Generic'
              const isLast = index === categories.length - 1

              return (
                <p key={index} className={classes.category}>
                  {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                  <span className={classes.separator}>|</span>
                </p>
              )
            })}
          </div>
          {stocks === 0 ? (
            <div className="text-red-600">Out of stock</div>
          ) : (
            <p className={classes.stock}> In stock</p>
          )}
        </div>

        <Price product={product} button={false} />

        <div className={classes.description}>
          <h6 className="mb-4 text-lg font-bold">Description</h6>
          <p>{description}</p>
        </div>
        {/* if stock is equals to zero it will show the button Pre order */}
        {stocks === 0 ? (
          <PreOrderButton />
        ) : (
          <AddToCartButton product={product} className={classes.addToCartButton} />
        )}
      </div>
    </Gutter>
  )
}
