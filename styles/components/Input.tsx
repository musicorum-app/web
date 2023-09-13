import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    h: 12
    // paddingY: 5
  }
})

const variants = {
  outline: definePartsStyle({
    field: {
      border: '2px',
      borderRadius: '8px',
      borderColor: 'whiteAlpha.600',
      _focus: {
        borderColor: 'whiteAlpha.900',
        background: 'whiteAlpha.100',
        outline: 'none !important',
        boxShadow: '0 0 0 1px var(--chakra-colors-whiteAlpha-900)'
      },
      _hover: {
        borderColor: 'whiteAlpha.700',
        background: 'whiteAlpha.100',
      }
    },
  })
}

export const inputTheme = defineMultiStyleConfig({ baseStyle, variants })