import React, { useState, useRef } from "react"
import "@fontsource/roboto-mono/500.css"
import Page from "../components/base/Page"
import Header from "../components/base/Header"
import Container from "../components/base/Container"
import tw, { styled } from "twin.macro"
import Spinner from "react-spinner-material"
import TextInput from "../components/form/TextInput"
import SelectInput from "../components/form/SelectInput"
import Card from "../components/base/Card"
import CardTitle from "../components/base/CardTitle"
import Button from "../components/buttons/Button"
import Modal from "../components/modal/Modal"
import themes from "../components/themes/themes"
import GenerateAPI from "../api/generate"
import { darkerRed } from "../config/colors"
import { Img } from "react-image"

const ContentGrid = styled.div`
  ${tw`grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-12 items-start`}
`

const ImageWrapper = styled.div`
  img {
    ${tw`rounded-md`}
    width: 100%;
    display: flex
  }
`

const DetailsContent = styled.div`
  ${tw`flex flex-col space-y-2`}
  color: rgba(255, 255, 255, 0.7);

  b {
    color: white
  }
`

const Mono = styled.span`
  font-family: "Roboto Mono", monospace;
`

const Blank = styled.span``

export default function GeneratePage() {
  const [debugOpen, setDebugOpen] = useState(false)
  const [theme, setTheme] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const userRef = useRef()

  const Element = theme ? themes[theme.value] : Blank

  const generate = event => {
    event.preventDefault()
    console.log(userRef.current)
    if (!theme) return
    setResult(null)
    setLoading(true)
    GenerateAPI.generate(theme.value, userRef.current.value, {
      "rows": 5,
      "columns": 5,
      "show_names": false,
      "show_playcount": false,
      "period": "ALO",
      "type": "ALBUM",
      "style": "DEFAULT"
    })
      .then(a => {
        if (a) {
          setResult(a)
        } else {
          setResult({
            success: false,
            message: "Unknown front-end error."
          })
        }
      })
      .catch(a => {
        setResult({
          success: false,
          message: "Unknown front-end error: " + a
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const createResultCard = () => {
    if (!loading && !result) return <div tw="w-full flex flex-col items-center text-center">
      Please fill the informations and click on "Generate" to continue.
    </div>
    if (!result && loading) return <div tw="w-full flex flex-col items-center">
      <h2>Working...</h2>
      <span tw="pb-3">This shouldn't take long</span>
      <Spinner radius={60} color={darkerRed} />
    </div>
    if (result && !loading) return <div tw="w-full flex flex-col items-center">
      {
        result.success ? <>
            <Img
              src={result.result}
              loader={<>
                <h2>Downloading image</h2>
                <Spinner radius={60} color={darkerRed} />
              </>}
              container={c => <ImageWrapper>{c}</ImageWrapper>}
            />
            <div tw="flex justify-end mt-4 w-full">
              <Button size="small" variant="none" onClick={() => setDebugOpen(true)}>
                Details
              </Button>
            </div>
          </> :
          <>
            <h2>Something went wrong</h2>
            {result.message}
          </>
      }
    </div>
  }

  return <Page page="generate">
    <Container>
      <Header>Generate</Header>
      <ContentGrid>
        <form tw="grid gap-y-4" onSubmit={generate}>
          <div tw="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
            <TextInput fullWidth placeholder="Last.fm username" ref={userRef} />
            <SelectInput
              value={theme}
              onChange={e => setTheme(e)}
              placeholder="Theme"
              options={[
                { value: "grid", label: "Grid" }
              ]} />
          </div>
          <Card>
            <CardTitle>Theme options</CardTitle>
            <Element />
          </Card>
          <div tw="flex justify-end mt-4">

            <Button type="submit">
              Generate
            </Button>
          </div>
        </form>
        <div>
          <span tw="text-xl flex mb-2">Result</span>
          <Card>
            {
              createResultCard()
            }
          </Card>
        </div>
      </ContentGrid>
    </Container>
    <Modal
      isOpen={debugOpen}
      onRequestClose={() => setDebugOpen(false)}
    >
      {
        result && result.success && <DetailsContent>
          <span>
            <b>ID:</b> <Mono>{result.id}</Mono>
          </span>
          <span>
            <b>Worker:</b> {result.worker.name}, using {result.worker.engine} version {result.worker.version}
          </span>
          <span>
            <b>Total duration (including rendering):</b> <Mono>{result.total_duration}s</Mono>
          </span>
          <span>
            <b>Rendering duration</b> <Mono>{result.generation_duration}s</Mono>
          </span>
        </DetailsContent>
      }
    </Modal>
  </Page>
}