import { Heading } from "@radix-ui/themes"
import { styled } from "styled-components"

const CardHeader = styled(Heading)`
  color: var(--gray-10);
  margin-bottom: var(--space-3);
`

CardHeader.defaultProps = {
  size: "3"
}

export default CardHeader