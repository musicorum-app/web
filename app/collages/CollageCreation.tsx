import { Container, Center, Flex } from '@chakra-ui/react'
import styled from "@emotion/styled"
import CollageForm from './CollageForm'

// const StyledH1 = styled.h1`
//     font-size: 3.5rem;
//     font-weight: 500;
//     margin-bottom: 1rem;
//   `

export default function CollageCreation () {
  return (
      <Container maxW="container.lg">
        <Center>
          {/* <StyledH1>Collages</StyledH1> */}
        </Center>
        <Flex width="100%">
          <CollageForm />
        </Flex>
      </Container>
  )
}