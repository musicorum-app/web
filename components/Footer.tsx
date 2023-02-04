import { Box, Container, Flex, Icon, Select, Text } from "@chakra-ui/react"
import Logo from "../assets/logotype.svg"

export function Footer() {
  return (
    <Box
      bg={"kindaBlack"}
      borderTop="2px solid rgba(255, 255, 255, 0.08)"
      borderBottom="22px solid"
      borderBottomColor="mostlyRed"
      pt={16}
      pb={6}
    >
      <Container maxW="container.xl">
        <Box as={Logo} viewBox="0 0 649 76" h={6} w="auto" />
        <Flex mt={5}>
          (icons)
        </Flex>

       <Box mt={12} mb={9}>
       <Select w="200px" size="sm" variant='unstyled' fontWeight="bold">
          <option>English</option>
        </Select>
       </Box>

        <Text fontSize="xs" color="GrayText">
          Musicorum is not associated or affiliated, in any way, with Last.fm,
          CBSi or Twitter, with their logos and trademarks owned by themselves.
        </Text>
      </Container>
    </Box>
  )
}
