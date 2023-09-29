import { FormEvent, Fragment, useState } from "react"
import NavBar from "$shared/components/navbar/NavBar";
import { Heading } from "@radix-ui/themes";
import CollageForm from "./CollageForm";

export default function CollagesPage() {
  
  return (
    <Fragment>
      <NavBar />

      <Heading size="8" align="center" my="6">
        Create a collage
      </Heading>

      <CollageForm />

      {/* <Navbar /> */}
      {/* <CollageCreation /> */}
      {/* <Footer /> */}
    </Fragment>
  )
}
