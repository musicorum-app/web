import { Center, Container, Flex, Grid } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from '../assets/logotype.svg'
import { Fragment } from 'react'
import styled from '@emotion/styled'

const StyledLogo = styled(Logo)`
  width: auto;
  height: 3.5rem;
`;

export default function Home() {
  return (
    <Fragment>
      <Container maxW={"container.lg"}>
        <Flex mt={8} mb={5}>
          <Center w={"100%"}>
              <StyledLogo viewBox={"0 0 649 76"} />
          </Center>
        </Flex>
        <Grid templateColumns={"repeat(2, 1fr)"}>
          
        </Grid>
      </Container>
    </Fragment>
  )
}
