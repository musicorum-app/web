import { Card, CardBody, CardHeader, Grid, Input, Select } from "@chakra-ui/react"
import { useCollageCreationStore } from "../collageCreationStore"
import { useForm } from "react-hook-form"

interface GridFormData {
  period: string
  entity: string
  rows: number
  columns: number
}

export default function GridForm() {
  const [theme] = useCollageCreationStore(s => [s.theme])

  // const {  } = useForm<GridFormData>()

  return (
    <Grid
      templateColumns={"repeat(2, minmax(0, 1fr))"}
      rowGap={"1rem"}
      columnGap={"1rem"}
    >
      <Select name="period">
        <option value="7DAY" defaultChecked >
          7 days
        </option>
        <option value="1MONTH">1 month</option>
        <option value="3MONTH">3 months</option>
        <option value="6MONTH">6 months</option>
        <option value="12MONTH">1 year</option>
        <option value="OVERALL">All time</option>
      </Select>

      <Select name="entity">
        <option value="ARTIST">Artists</option>
        <option value="ALBUM" defaultChecked>
          Albums
        </option>
        <option value="TRACK">Tracks</option>
      </Select>

      <Input
      name="rows"
            type="number"
            placeholder={"Rows"}
            defaultValue={5}
            min={2}
            max={10}
          />
          <Input
          name="columns"
            type="number"
            placeholder={"Columns"}
            defaultValue={5}
            min={2}
            max={10}
          />
    </Grid>
  )
}
