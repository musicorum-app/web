import { cardAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  header: {
    color: 'GrayText',
    fontWeight: 'semibold',
    fontSize: 'md',
    letterSpacing: '0.8px',
    paddingBottom: 0
  },
})

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "12px",
    },
  }),
}

const variants = {
  elevated: definePartsStyle({
    container: {
      backgroundColor: "elevation.one",
    },
  }),
  outline: definePartsStyle({
    container: {
      backgroundColor: "elevation.one",
      borderWidth: '2px',
      borderColor: 'elevation.stroke'
    }
  })
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes, variants })
