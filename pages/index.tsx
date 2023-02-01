import { Center, Container, Flex, Grid } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from '../assets/logotype.svg'
import { Fragment } from 'react'
import styled from '@emotion/styled'
import TwitterCard from '../components/TwitterCard'
import twitterProfilePicure from '../public/marina.png'
import generatedChart from '../public/chart.webp'
import gridImage from '../public/grid.webp'
import Navbar from '../components/Navbar'

const StyledLogo = styled(Logo)`
  width: auto;
  height: 3.5rem;
`;

const StyledH3 = styled.h3`
font-size: 1.7rem;
font-weight: bold;
margin-bottom: 1.5rem;
`

export default function Home() {
  return (
    <Fragment>
      <Navbar/>

      <Container maxW={"83rem"}>
        <Flex mt={8} mb={8}>
          <Center w={"100%"}>
            <StyledLogo viewBox={"0 0 649 76"} />
          </Center>
        </Flex>
        <Grid templateColumns={"repeat(2, 1fr)"} columnGap={"7rem"} rowGap={"2rem"}>

          <Flex direction={"column"} justify={"center"}>
            <StyledH3>Share your musical charts automatically to Twitter</StyledH3>
            Musicorum automatically tweets every week or month on your twitter
            account a fancy image (or just text) with your Last.fm charts.
          </Flex>
          <TwitterCard username='MysteryMS' userHandle='@mysteryms' userImage={twitterProfilePicure} bodyImage={generatedChart} />

          <Image src={gridImage} alt={"grid image"} />
          <Flex direction={"column"} justify={"center"}>
            <StyledH3>Or just create an image and share it to the world</StyledH3>
            You can also create images and share anywhere
            - with full control and customization.
          </Flex>

        </Grid>
      </Container>
    </Fragment>
  )
}
