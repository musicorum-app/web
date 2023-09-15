"use client"

import { FormEvent } from "react"
import { ThemeEnum, useCollageCreationStore } from "./collageCreationStore"
import { Flex, Grid, TextField } from "@radix-ui/themes"
import * as Form from "@radix-ui/react-form"
import Card from "$shared/components/cards/Card"
import CardBody from "$shared/components/cards/CardBody"
// import GridForm from "./forms/GridForm"

export default function CollageForm() {
  const [theme, setTheme] = useCollageCreationStore(s => [s.theme, s.setTheme])
  console.log(theme)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget.dataset)
    const { theme, username, ...options } = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    const res = await fetch("localhost:8080", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Super dev",
      },
      body: JSON.stringify({
        user: username,
        theme: {
          name: theme,
          options: {
            style: "STYLE",
            show_names: true,
            show_playcount: true,
            padded: false,
            ...options,
          },
        },
        hide_username: false,
      }),
    })

    console.log(await res.json())
  }

  return (
    <Grid
      columns="2"
      gap="4"
      style={{ maxWidth: "var(--container-md)" }}
      mx="auto"
      px="4"
    >
      <Form.Root onSubmit={handleSubmit}>
        <Flex gap="4">
          <Form.Field name="username">
            <Form.Control asChild>
              <TextField.Input required placeholder="Last.fm username" type="text" />
            </Form.Control>
          </Form.Field>

          <Form.Field name="theme">
            <Form.Control value={theme || ""} asChild onChange={e => console.log(e.target)}>
              <select required>
              <option value="" disabled hidden color="whiteAlpha.400">
                Theme
              </option>
                <option>grid</option>
                <option>other</option>
              </select>
            </Form.Control>
          </Form.Field>
        </Flex>

        <Card>
          <CardBody>
            oi teste
          </CardBody>
        </Card>
      </Form.Root>

      {/* <FormControl isRequired placeholder={"Last.fm username"}>
          <Flex width={"100%"} direction={"row"} gap={"1em"}>
            <Input
              name="username"
              variant="outline"
              type={"text"}
              width={"100%"}
              placeholder={"Last.fm username"}
            />
            <Select
              name="theme"
              variant="outline"
              color={theme ? "inherit" : "whiteAlpha.700"}
              width={"100%"}
              value={theme || ""}
              onChange={ev => setTheme(ev.target.value as ThemeEnum)}
            >
              <option value="" selected disabled hidden color="whiteAlpha.400">
                Theme
              </option>
              <option value={ThemeEnum.ClassicCollage}>Grid</option>
            </Select>
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <Card variant="outline">
            <CardHeader>THEME OPTIONS</CardHeader>
            <CardBody>{theme && <GridForm />}</CardBody>
          </Card>
        </FormControl>
        <Button type="submit" width={"20%"} bg="mostlyRed" fontWeight={400}>
          Generate
        </Button> */}
    </Grid>
  )
}
