import React from 'react'
import Base from './Base'
import NavBar from './NavBar'
import Footer from "./Footer"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import { Helmet } from "react-helmet"


export default function Page ({ name, children, page }) {
  return <Base id="mus_app">
    <Helmet>
      <title>Musicorum{name ? ' | ' + name : ''}</title>
      <meta name="description" content="Set of tools and utilities for last.fm / TODO" />
    </Helmet>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <NavBar page={page}/>
      {children}
      <Footer />
    </MuiPickersUtilsProvider>
  </Base>
}
