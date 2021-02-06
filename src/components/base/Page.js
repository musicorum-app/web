import React from 'react'
import Base from './Base'
import NavBar from './NavBar'
import tw, { styled } from 'twin.macro'
import Footer from "./Footer"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

const Content = styled.div`
`

export default function Page ({ children, page }) {
  return <Base id="mus_app">
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <NavBar page={page}/>
      {children}
      <Footer />
    </MuiPickersUtilsProvider>
  </Base>
}
