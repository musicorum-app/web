import { Grid } from "@chakra-ui/react"
import { ReactNode } from "react"

interface LandingSideCardsProps {
  reversed?: boolean
  title?: ReactNode
  children?: ReactNode
}

export function LandingSideCards(props: LandingSideCardsProps) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr",
      }}
      columnGap={"7rem"}
      rowGap={"2rem"}
      sx={{
        '*:nth-child(1)': {
          order: {
            base: 0,
            lg: props.reversed ? 1 : 0
          }
        }
      }}
    >
      {props.title}

      {props.children}
    </Grid>
  )
}
