import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from "@next/font/google";
import { ChakraProvider, extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.theme.colors.kindaBlack
      }
    })
  },
  colors: {
    kindaBlack: "#131313"
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={poppins.className}>
    <ChakraProvider theme={theme}>
    <Component {...pageProps} />
    </ChakraProvider>
  </main>
}
