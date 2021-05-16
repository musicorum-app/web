import React, { useState, useImperativeHandle, forwardRef } from "react"
import SelectInput from "../form/SelectInput"
import DateInput from "../form/DateInput"
import CardTitle from "../base/CardTitle"
import tw, { styled } from "twin.macro"

function DuotoneTheme(_, ref) {
  const periods = [
    { value: "7DAY", label: "7 days" },
    { value: "1MONTH", label: "1 month" },
    { value: "3MONTH", label: "3 months" },
    { value: "6MONTH", label: "6 months" },
    { value: "12MONTH", label: "12 months" },
    { value: "OVERALL", label: "All time" },
    { value: "_CUSTOM", label: "Custom" }
  ]
  const types = [
    { value: "ARTIST", label: "Artists" },
    { value: "ALBUM", label: "Albums" },
    { value: "TRACK", label: "Tracks" }
  ]
  const palettes = [
    { value: "PURPLISH", label: "Purplish" },
    { value: "NATURAL", label: "Natural" },
    { value: "DIVERGENT", label: "Divergent" },
    { value: "SUN", label: "Sun" },
    { value: "YELLISH", label: "Yellish" },
    { value: "HORROR", label: "Horror" },
    { value: "SEA", label: "Sea" },
    { value: "REWIND2020", label: "Rewind 2020" },
    { value: "PINK", label: "Pink" },
    { value: "NEON", label: "Neon" }
  ]

  const defaultValues = {
    period: periods[0],
    type: types[1],
    palette: palettes[0],
    from: new Date(new Date().getTime() - 86400000),
    to: new Date()
  }


  const [values, setValues] = useState(defaultValues)

  const handleChangeSelect = (input) => ev => {
    setValues({
      ...values,
      [input]: ev
    })
  }

  const handleChangeDate = (input) => ev => {
    setValues({
      ...values,
      [input]: ev._d
    })
  }

  const handleChangeSwitch = (input) => ev => {
    setValues({
      ...values,
      [input]: ev.currentTarget.checked
    })
  }


  useImperativeHandle(ref, () => ({
    validate: () => true,
    hasUserName: () => false,
    getData: () => ({
      period: values.period.value === "_CUSTOM" ? [values.from.getTime() / 1000, values.to.getTime() / 1000] : values.period.value,
      type: values.type.value,
      palette: values.palette.value
    })
  }))

  return <div>
    <div tw="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-2 mb-4">
      <SelectInput
        placeholder="Period"
        options={periods}
        onChange={handleChangeSelect("period")}
        value={values.period}
      />
      <SelectInput
        placeholder="Chart"
        options={types}
        onChange={handleChangeSelect("type")}
        value={values.type}
      />

    </div>
    <SelectInput
      placeholder="Color palette"
      options={palettes}
      onChange={handleChangeSelect("palette")}
      value={values.palette}
    />
    <div tw="grid grid-cols-1 gap-y-1 pt-4">
      {
        values.period.value === "_CUSTOM" && <div style={{
          background: "rgba(255, 255, 255, 0.08)"
        }} tw="grid grid-cols-1 gap-y-3 pt-3 pb-3 rounded-md px-3">
          <div>
            <CardTitle>Custom period</CardTitle>
            <DateInput
              value={values.from}
              onChange={handleChangeDate("from")}
              label="From"
            />
          </div>
          <DateInput
            value={values.to}
            onChange={handleChangeDate("to")}
            label="To"
          />
        </div>
      }
    </div>
  </div>
}

export default forwardRef(DuotoneTheme)
