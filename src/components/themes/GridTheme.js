import React, { useState, useImperativeHandle, forwardRef } from "react"
import tw from "twin.macro"
import SelectInput from "../form/SelectInput"
import SwitchInput from "../form/SwitchInput"
import DateInput from "../form/DateInput"
import CardTitle from "../base/CardTitle"

function GridTheme(_, ref) {
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
  const sizes = [
    { value: "3", label: "3x3" },
    { value: "4", label: "4x4" },
    { value: "5", label: "5x5" },
    { value: "6", label: "6x6" },
    { value: "7", label: "7x7" },
    { value: "8", label: "8x8" },
    { value: "9", label: "9x9" },
    { value: "10", label: "10x10" },
    { value: "15", label: "15x15" },
    { value: "20", label: "20x20" }
  ]
  const styles = [
    { value: "DEFAULT", label: "Default" },
    { value: "CAPTION", label: "Caption" },
    { value: "SHADOW", label: "Shadow" }
  ]

  const defaultValues = {
    period: periods[0],
    type: types[1],
    size: sizes[2],
    style: styles[0],
    showNames: true,
    showPlaycount: false,
    from: new Date(new Date().getTime() - 86400000),
    to: new Date()
  }


  const [values, setValues] = useState(defaultValues)
  const showNamesLabel = `Show ${values.type.label.toLowerCase()} names`

  console.log(values.size.value)
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

  console.log(values)


  useImperativeHandle(ref, () => ({
    validate: () => true,
    hasUserName: () => false,
    getData: () => ({
      rows: parseInt(values.size.value),
      columns: parseInt(values.size.value),
      show_names: values.showNames,
      show_playcount: values.showPlaycount,
      period: values.period.value === '_CUSTOM' ? [values.from.getTime() / 1000, values.to.getTime() / 1000] : values.period.value,
      type: values.type.value,
      style: values.style.value
    })
  }))

  return <div>
    <div tw="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
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

      <SelectInput
        placeholder="Size"
        options={sizes}
        onChange={handleChangeSelect("size")}
        value={values.size}
      />
      <SelectInput
        placeholder="Style"
        options={styles}
        onChange={handleChangeSelect("style")}
        value={values.style}
      />
    </div>
    <div tw="grid grid-cols-1 gap-y-1 pt-4">
      {
        values.period.value === "_CUSTOM" && <div style={{
        background: 'rgba(255, 255, 255, 0.08)'
        }} tw="grid grid-cols-1 gap-y-3 pt-3 pb-3 rounded-md px-3">
          <div>
            <CardTitle>Custom period</CardTitle>
            <DateInput
              value={values.from}
              onChange={handleChangeDate('from')}
              label="From"
            />
          </div>
          <DateInput
            value={values.to}
            onChange={handleChangeDate('to')}
            label="To"
          />
        </div>
      }
      <SwitchInput
        checked={values.showNames}
        onChange={handleChangeSwitch("showNames")}
        label={showNamesLabel}
      />
      <SwitchInput
        checked={values.showPlaycount}
        onChange={handleChangeSwitch("showPlaycount")}
        label="Show playcount"
      />
    </div>
  </div>
}

export default forwardRef(GridTheme)
