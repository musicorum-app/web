import React from "react"
import tw, { styled } from "twin.macro"

const CardTitle = styled.span`
  ${tw`mb-3 flex subpixel-antialiased`}
  text-transform: uppercase;
  font-weight: 600;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.65);
`

export default CardTitle