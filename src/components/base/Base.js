import React from "react"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "../../styles/base.scss"


export default function Base({ children }) {
  return <div>
    {children}
  </div>
}
