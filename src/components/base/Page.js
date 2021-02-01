import React from 'react'
import Base from './Base'
import NavBar from './NavBar'
import tw, { styled } from 'twin.macro'
import Footer from "./Footer"

const Content = styled.div`
  
`

export default function Page ({ children, page }) {
  return <Base>
    <NavBar page={page}/>
    {children}
    <Footer />
  </Base>
}
