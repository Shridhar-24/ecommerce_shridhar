import Link from 'next/link'
import React from 'react'
import { urlFOr } from '../lib/client'

const FooterBanner = ({footer}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{footer.discount}</p>
          <h3>{footer.largeText1}</h3>
          <h3>{footer.largeText2}</h3>
          <p>20% OFF</p>
          <p>{footer.saleTime}</p>
        </div>
        <div className='right'>
        <p>{footer.smallText}</p>
          <h3>{footer.midText}</h3>
          <p>{footer.desc}</p>
          <Link href={`/product/${footer.product}`}>
            <button type="button">{footer.buttonText}</button>
          </Link>
        </div>
        <img 
          src={urlFOr(footer.image)} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner