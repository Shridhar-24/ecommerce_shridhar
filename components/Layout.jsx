import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import  Context, { StateContext }  from '../context/StateContext';

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>
          Nikky
        </title>
      </Head>
        <header>
          <Navbar />
        </header>
      
      <main className='main-container'>
      {children}
      </main>
      <footer>
        <Footer />
      </footer>
      </div>
  )
}

export default Layout