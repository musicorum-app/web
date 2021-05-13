import React from 'react'
import tw, {styled} from 'twin.macro'
import { elevationOne, elevationOneStroke } from "../../config/colors"

const Card = styled.div`
  ${tw`p-3 rounded-md`}
  background: ${elevationOne};
  border: 2px solid ${elevationOneStroke}
`

export default Card