import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Grid,
  Input,
  Select,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Fragment, useState } from "react"
import Navbar from "../components/Navbar"

const StyledOption = styled.option`
  background-color: #2a2a2a !important;
  backdrop-filter: blur(10px);
  height: 5rem !important;

  &:hover {
    background-color: #2a2a2a;
  }
`

const ThemeCardSpan = styled.span`
  display: flex;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.75rem;
`

const ThemeOptionsCard = ({theme}: {theme: string}) => {
    console.log("from options: " + theme)
  return (
    <Fragment>
      <Flex
        bg={"rgba(255, 255, 255, 0.08)"}
        p={"0.75rem"}
        borderRadius={"0.375rem"}
        border={"2px solid rgba(255, 255, 255, 0.14)"}
        direction={"column"}
      >
        <ThemeCardSpan>THEME OPTIONS</ThemeCardSpan>
        <Grid
          templateColumns={"repeat(2, minmax(0, 1fr))"}
          rowGap={"1rem"}
          columnGap={"1rem"}
        >
          <Select
            focusBorderColor={"rgba(255, 255, 255, 0.65)"}
            borderColor={"rgba(255, 255, 255, 0.5)"}
          >
            <StyledOption value={"week"} defaultChecked>
              7 days
            </StyledOption>
            <StyledOption value={"month"}>1 month</StyledOption>
            <StyledOption value={"trimester"}>3 months</StyledOption>
            <StyledOption value={"semester"}>6 months</StyledOption>
            <StyledOption value={"year"}>1 year</StyledOption>
            <StyledOption value={"overall"}>All time</StyledOption>
          </Select>

          <Select
            focusBorderColor={"rgba(255, 255, 255, 0.65)"}
            borderColor={"rgba(255, 255, 255, 0.5)"}
          >
            <StyledOption value={"artist"}>Artists</StyledOption>
            <StyledOption value={"album"} defaultChecked>
              Albums
            </StyledOption>
            <StyledOption value={"track"}>Tracks</StyledOption>
          </Select>
        </Grid>
      </Flex>
    </Fragment>
  )
}

const FormCard = () => {
  const [theme, setTheme] = useState("grid")
  return (
    <Grid width={"100%"} rowGap={"1rem"}>
      <FormControl isRequired placeholder={"Last.fm username"}>
        <Flex width={"100%"} direction={"row"}>
          <Input
            type={"text"}
            focusBorderColor={"rgba(255, 255, 255, 0.65)"}
            borderColor={"rgba(255, 255, 255, 0.5)"}
            width={"100%"}
            mr={"1rem"}
            placeholder={"Last.fm username"}
          />
          <Select
            width={"100%"}
            focusBorderColor={"rgba(255, 255, 255, 0.65)"}
            borderColor={"rgba(255, 255, 255, 0.5)"}
            onChange={v => setTheme(v.target.value)}
          >
            <StyledOption value={"grid"} defaultChecked>
              Grid
            </StyledOption>
            <StyledOption value={"duotone"}>Duotone</StyledOption>
          </Select>
        </Flex>
      </FormControl>
      <FormControl isRequired>
        <ThemeOptionsCard theme={theme}/>
      </FormControl>
      <Button type="submit" width={"20%"} bg="mostlyRed" fontWeight={400}>
        Generate
      </Button>
    </Grid>
  )
}

const Generate = () => {
  const StyledH1 = styled.h1`
    font-size: 3.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  `
  return (
    <Fragment>
      <Navbar />
      <Container maxW={"83rem"}>
        <Center>
          <StyledH1>Generate</StyledH1>
        </Center>
        <Flex width={"100%"}>
          <form style={{ width: "50%" }}>
            <FormCard />
          </form>
        </Flex>
      </Container>
    </Fragment>
  )
}

export default Generate
