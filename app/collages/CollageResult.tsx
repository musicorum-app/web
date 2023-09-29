/* eslint-disable @next/next/no-img-element */
/* vai toma no cu next.js */
import { CreationStatus, useCollageCreationStore } from "./collageCreationStore"
import loading from "$assets/loading.svg"
import Image from "next/image"
import { Button, Flex } from "@radix-ui/themes"
import styled from "styled-components"
import { useEffect } from "react"
import { downloadImage } from "utils/download"

const ResultImageWrapper = styled.div`
  position: relative;
`

const ResultImage = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: auto;
  min-height: ${p => (p.loaded ? "auto" : "200px")};
  border-radius: 4px;
  display: block;
`

const ResultImageOverlay = styled.div<{ loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: ${p => (p.loaded ? 0 : 1)};
  transition: opacity 200ms ease-in;
  pointer-events: none;
  backdrop-filter: blur(8px) brightness(0.5) saturate(0.5);
`

export default function CollageResult() {
  const [status, result, setStatus] = useCollageCreationStore(s => [
    s.status,
    s.result,
    s.setStatus,
  ])

  function download() {
    if (!result) return

    downloadImage(
      result.url,
      "collage"
    )
  }

  if (status === CreationStatus.Idle) {
    return "Fill the options and go on Create"
  } else if (status === CreationStatus.Loading) {
    return (
      <Flex py="6" direction="column" align="center" justify="center">
        Working on it...
        <Image src={loading} alt="loading" width={100} height={100} />
      </Flex>
    )
  } else if (result) {
    return (
      <Flex direction="column" gap="2">
        <ResultImageWrapper>
          <ResultImage
            key={result.file}
            src={result.url}
            alt="result collage"
            onLoad={() => {
              console.log(result.file, "loaded!")
              setStatus(CreationStatus.Done)
            }}
            loaded={status === CreationStatus.Done}
          />
          <ResultImageOverlay loaded={status === CreationStatus.Done}>
            Downloading image...
            <Image src={loading} alt="loading" width={100} height={100} />
          </ResultImageOverlay>
        </ResultImageWrapper>

        {status === CreationStatus.Done ? (
          <Flex direction="row-reverse">
            <Button onClick={download} size="3" color="gray">
              Download
            </Button>
          </Flex>
        ) : null}
      </Flex>
    )
  }
}
