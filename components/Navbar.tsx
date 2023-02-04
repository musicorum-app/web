import {
  Box,
  Center,
  Collapse,
  Container,
  Flex,
  Hide,
  Icon,
  IconButton,
  Show,
  useDisclosure,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import Link from "next/link"
import Logo from "../assets/logo.svg"
import NavbarItem from "./NavbarItem"
import { MdMenu, MdOutlineClose } from "react-icons/md"
import { useRouter } from "next/router"

const StyledLogo = styled(Logo)`
  width: auto;
  height: 1.2rem;
`

const breakPoint = "md"

const Navbar = () => {
  const router = useRouter()
  const { isOpen: mobileNavOpen, onToggle: toggleMobileNav } = useDisclosure()

  return (
    <Box bg="kindaBlack" borderBottom="2px solid rgba(255, 255, 255, 0.08)" sx={{
      '--mostly-red': 'mostlyRed'
    }}>
      <Container maxW="container.xl">
        <Flex
          height={14}
          width="100%"
          direction="row"
          align="center"
          justifyContent={{
            base: "space-between",
            [breakPoint]: "start",
          }}
        >
          {/* Left icon for mobile menu */}
          <Hide above={breakPoint}>
            <IconButton
              paddingStart={1}
              paddingEnd={1}
              variant="ghost"
              aria-label="menu"
              icon={<Icon as={mobileNavOpen ? MdOutlineClose : MdMenu} w={6} h={6} />}
              _hover={{
                background: "rgba(255, 255, 255, 0.1)",
              }}
              _active={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid white",
              }}
              onClick={toggleMobileNav}
            />
          </Hide>

          <Center as={Link} href="/" h="100%" px={3} mr={2}>
            <StyledLogo viewBox="0 0 75 27" />
          </Center>

          {/* Navbar items on desktop */}
          <Show above={breakPoint}>
            <Flex align="center" height="100%" gap={1}>
              <NavbarItem
                active={router.pathname.startsWith('/generate')}
                label="Generate"
                destination="/generate"
              />
              <NavbarItem
                active={router.pathname.startsWith('/about')}
                label="About"
                destination="/about"
              />
            </Flex>
          </Show>

          {/* Blank space to make icon center */}
          <Hide above={breakPoint}>
            <Box w={10} />
          </Hide>
        </Flex>
        {/* mobile nav items */}
        <Hide above={breakPoint}>
          <Collapse in={mobileNavOpen}>
            <Flex py={2} direction="column" alignItems="start">
              <NavbarItem
                mobile
                active={router.pathname.startsWith('/generate')}
                label="Generate"
                destination="/generate"
              />
              <NavbarItem
                mobile
                active={router.pathname.startsWith('/about')}
                label="About"
                destination="/about"
              />
            </Flex>
          </Collapse>
        </Hide>
      </Container>
    </Box>
  )
}

export default Navbar
