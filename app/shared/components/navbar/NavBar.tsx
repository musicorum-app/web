import { Flex, Box } from "@radix-ui/themes"
import Image from "next/image"
import musLogo from "$assets/logo.svg"
import NavbarItem from "./NavBarItem"

export default function NavBar() {
  return (
    <Box
      style={{
        background: "var(--kinda-black)",
        borderBottom: "2px solid var(--gray-a4)",
      }}
    >
      <Flex height="8" px="4" align="center" width="100%">
        <Image src={musLogo} alt="musicorum logo" />
      
        <NavbarItem active={false} destination="/collages" label="oi" />
        <NavbarItem active={false} destination="/collages" label="oi 2" />
      </Flex>
    </Box>
  )
}
