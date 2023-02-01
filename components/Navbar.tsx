import { Box, Flex } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Logo from "../assets/logo.svg"
import NavbarItem from "./NavbarItem"

const StyledLogo = styled(Logo)`
  width: auto;
  height: 1.7rem;
`
const Navbar = () => {
  return (
    <Flex
      px={"9rem"}
      bg={"kindaBlack"}
      height={"4rem"}
      width={"100%"}
      direction={"row"}
      align={"center"}
      borderBottom={"2px solid rgba(255, 255, 255, 0.08)"}
    >
      <Flex align={"center"} height={"100%"} width={"17rem"} justify={"space-between"}>
        <StyledLogo viewBox="0 0 75 27" />
        <NavbarItem active={false} label="Generate" destination="/generate"/>
        <NavbarItem active={false} label="About" destination="/generate"/>
      </Flex>
    </Flex>
  )
}

export default Navbar
