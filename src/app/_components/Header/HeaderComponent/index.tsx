'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import { MobileNav } from '../MobileNav'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <div className="flex justify-between space-x-2">
            <Image src="/ATR_LOGO.png" alt="logo" width={80} height={5} />
            <p className="hidden lg:block text-[#F2B10D] text-2xl lg:text-2xl sm:text-lg mt-4">
              ATR Skin Care
            </p>
          </div>
        </Link>

        <HeaderNav header={header} />
        <MobileNav header={header} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
