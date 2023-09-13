import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"
import {
  ChakraProvider,
  extendTheme,
  StyleFunctionProps,
} from "@chakra-ui/react"
import { cardTheme } from "../styles/components/Card"
import { Fragment } from "react"
import Head from "next/head"
import { inputTheme } from "../styles/components/Input"
import { selectTheme } from "../styles/components/Select"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "almostBlack",
        color: "white",
      },
    }),
  },
  colors: {
    almostBlack: "#131313",
    kindaBlack: "#2A2A2A",
    mostlyRed: "#B71C1C",
    GrayText: "#FFFFFFAB;",
    elevation: {
      one: "#FFFFFF14",
      stroke: "#FFFFFF24",
    },
  },
  borders: {
    elevationOne: "2px solid mostlyRed",
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    Select: selectTheme,
    Card: cardTheme,
    Input: inputTheme,
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Musicorum</title>
        <meta
          name="description"
          content="Set of tools and utilities for last.fm, including collages"
        />
      </Head>
      <main className={poppins.className}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </Fragment>
  )
}
