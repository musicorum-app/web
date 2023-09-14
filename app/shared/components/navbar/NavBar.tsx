'use client'

import { Flex, Box } from "@radix-ui/themes"
import Image from "next/image"
import musLogo from "$assets/logo.svg"
import NavbarItem from "./NavBarItem"
import Link from "next/link"
import { styled } from "styled-components"

const LogoLink = styled(Link)`
  display: flex;
  margin-right: 12px;
`

export default function NavBar() {
  return (
    <Box
      style={{
        background: "var(--kinda-black)",
        borderBottom: "2px solid var(--gray-a4)",
      }}
      px="4"
    >
      <Flex align="center" width="100%" mx="auto" style={{
        maxWidth: 'var(--container-md)'
      }}>
        <LogoLink href="/" passHref>
          <Image src={musLogo} alt="musicorum logo" />
        </LogoLink>

        <NavbarItem destination="/">Home</NavbarItem>
        <NavbarItem destination="/collages">Collages</NavbarItem>
      </Flex>
    </Box>
  )
}
