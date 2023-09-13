import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  Grid,
  Input,
  Select,
} from "@chakra-ui/react"
import { FormEvent } from "react"
import { ThemeEnum, useCollageCreationStore } from "./collageCreationStore"
import GridForm from "./forms/GridForm"

export default function CollageForm() {
  const [theme, setTheme] = useCollageCreationStore(s => [s.theme, s.setTheme])
  console.log(theme)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget.dataset)
    const { theme, username, ...options } = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    const res = await fetch("https://mus-api-stg--proxy.musc.pw/collages", {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        authorization: "Super SdPU7pLXAFLF3cQr7s"
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
            ...options
          },
        },
        hide_username: false,
      }),
    })

    console.log(await res.json())
  }

  return (
    <Grid width={"100%"} rowGap={4}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired placeholder={"Last.fm username"}>
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
              {/* <option value={"duotone"}>Duotone</option> */}
            </Select>
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <Card variant="outline">
            <CardHeader>THEME OPTIONS</CardHeader>
            <CardBody>{theme && <GridForm />}</CardBody>
          </Card>
          {/* <ThemeOptionsCard theme={theme} /> */}
        </FormControl>
        <Button type="submit" width={"20%"} bg="mostlyRed" fontWeight={400}>
          Generate
        </Button>
      </form>
    </Grid>
  )
}
