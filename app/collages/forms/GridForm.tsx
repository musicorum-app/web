import { Grid, Select, Switch, TextField } from "@radix-ui/themes"
import { useCollageCreationStore } from "../collageCreationStore"
import { useForm } from "react-hook-form"
import SelectInput from "$shared/components/inputs/SelectInput"

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
    <Grid columns={"2"} gap="4">
      <SelectInput
        size="3"
        name="period"
        placeholder="Period"
        required
        defaultValue="7DAY"
        // onChange={e => console.log(e.target)}
      >
        <Select.Item value="7DAY">7 days</Select.Item>
        <Select.Item value="1MONTH">1 month</Select.Item>
        <Select.Item value="3MONTH">3 months</Select.Item>
        <Select.Item value="6MONTH">6 months</Select.Item>
        <Select.Item value="12MONTH">1 year</Select.Item>
        <Select.Item value="OVERALL">All time</Select.Item>
      </SelectInput>

      <SelectInput
        size="3"
        name="entity"
        placeholder="Entity"
        required
        defaultValue="ALBUM"
        // onChange={e => console.log(e.target)}
      >
        <Select.Item value="ARTIST">Artists</Select.Item>
        <Select.Item value="ALBUM">Albums</Select.Item>
        <Select.Item value="TRACK">Tracks</Select.Item>
      </SelectInput>

      <TextField.Input
        size="3"name="rows"

        type="number"
        placeholder={"Rows"}
        defaultValue={5}
        min={2}
        max={10}
      />
      <TextField.Input
      size="3"
        name="columns"
        type="number"
        placeholder={"Columns"}
        defaultValue={5}
        min={2}
        max={10}
      />

      {/* <Switch radius="full" /> */}
    </Grid>
  )
}
