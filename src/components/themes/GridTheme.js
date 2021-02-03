import React from "react"
import tw from 'twin.macro'
import SelectInput from "../form/SelectInput"

export default function GridTheme() {
  return <div tw="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
    <SelectInput placeholder="Period" options={[
      { value: "grid", label: "Grid" },
      { value: "duotone", label: "Duotone" },
      { value: "tops", label: "Tops" },
      { value: "darkly", label: "Darkly" }
    ]} />
    <SelectInput placeholder="Type" options={[
      { value: "ARTIST", label: "Artists" },
      { value: "ALBUM", label: "Albums" },
      { value: "TRACK", label: "Tracks" }
    ]} />

    <SelectInput placeholder="Size" options={[
      { value: "3", label: "3x3" },
      { value: "4", label: "4x4" },
      { value: "5", label: "5x5" },
      { value: "6", label: "6x6" },
      { value: "7", label: "7x7" },
      { value: "8", label: "8x8" },
      { value: "9", label: "9x9" },
      { value: "10", label: "10x10" },
      { value: "11", label: "11x11" },
      { value: "12", label: "12x12" }
    ]} />
    <SelectInput placeholder="Style" options={[
      { value: "DEFAULT", label: "Default" },
      { value: "CAPTION", label: "Caption" },
      { value: "SHADOW", label: "Shadow" }
    ]} />
  </div>
}