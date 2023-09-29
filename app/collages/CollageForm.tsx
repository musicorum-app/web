"use client"

import { FormEvent } from "react"
import { Collage, CreationStatus, ThemeEnum, useCollageCreationStore } from "./collageCreationStore"
import { Button, Flex, Grid, Heading, Select, TextField } from "@radix-ui/themes"
import Card from "$shared/components/cards/Card"
import CardBody from "$shared/components/cards/CardBody"
import styled from "styled-components"
import CardHeader from "$shared/components/cards/CardHeader"
import GridForm from "./forms/GridForm"
import SelectInput from "$shared/components/inputs/SelectInput"
import CollageResult from "./CollageResult"
// import GridForm from "./forms/GridForm"

export default function CollageForm() {
  const [
    theme,
    setTheme,
    setStatus,
    setResult
  ] = useCollageCreationStore(s => [
    s.theme,
    s.setTheme,
    s.setStatus,
    s.setResult
  ])
  console.log(theme)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget.dataset)
    const { theme, username, ...options } = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    setResult(null)
    setStatus(CreationStatus.Loading)

    // @todo: mover para um arquivo de interface para api 
    const res = await fetch(process.env.NEXT_PUBLIC_MUSICORUM_API_URL! + "collages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // @todo: mover de super pra client
        authorization: "Super " + process.env.NEXT_PUBLIC_MUSICORUM_API_KEY,
      },
      body: JSON.stringify({
        user: username,
        theme: {
          name: theme,
          // @todo: arrumar isso
          options: {
            style: "STYLE",
            show_names: true,
            show_playcount: true,
            padded: false,
            ...options,
            // @ts-ignore
            rows: parseInt(options.rows),
            // @ts-ignore
            columns: parseInt(options.columns)
          },
        },
        hide_username: false,
      }),
    })

    setStatus(CreationStatus.Downloading)
    const result: Collage = await res.json()
    setResult(result)
  }

  return (
    <Grid
      columns="2"
      gap="4"
      style={{ maxWidth: "var(--container-lg)" }}
      mx="auto"
      px="4"
    >
      <Flex asChild direction="column" gap="4">
        <form onSubmit={handleSubmit}>
          <Grid columns="2" gap="4">
            <TextField.Input
              size="3"
              name="username"
              required
              placeholder="Last.fm username"
              type="text"
            />

            <SelectInput
              size="3"
              name="theme"
              placeholder="Theme"
              required
              value={theme ?? undefined}
              onValueChange={setTheme}
              // onChange={e => console.log(e.target)}
            >
              <Select.Item value="classic_collage">Grid</Select.Item>
              <Select.Item value="duotone" disabled>
                Duotone
              </Select.Item>
            </SelectInput>
          </Grid>

          <Card>
            <CardBody>
              <CardHeader>THEME OPTIONS</CardHeader>
              {theme ? <GridForm /> : "Select a theme"}
            </CardBody>
          </Card>

          <Flex justify="end">
            <Button size="3" color="red">
              Create
            </Button>
          </Flex>
        </form>
      </Flex>

      <Flex direction="column">
        <Card>
          <CardBody>
            <CollageResult />
          </CardBody>
        </Card>
      </Flex>

    </Grid>
  )
}
