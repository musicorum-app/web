import { FormEvent, Fragment, useState } from "react"
import NavBar from "$shared/components/navbar/NavBar";
import { Heading } from "@radix-ui/themes";
import CollageForm from "./CollageForm";

export default function CollagesPage() {
  
  return (
    <Fragment>
      <NavBar />

      <Heading align="center">
        Create a collage
      </Heading>

      <CollageForm />

      {/* <Navbar /> */}
      {/* <CollageCreation /> */}
      {/* <Footer /> */}
    </Fragment>
  )
}