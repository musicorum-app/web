import React from "react"
import Select from "react-select"
import { colorSecondary, darkerRed, kindaBlack } from "../../config/colors"

const selectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    border: `2px solid rgba(255, 255, 255, ${isFocused ? 0.65 : 0.35})`,
    color: "white",
    background: isFocused ? "rgba(255, 255, 255, .09)" : "none",
    borderRadius: "0.375rem",
    boxShadow: "0 !important",

    ":hover": {
      background: `rgba(255, 255, 255, ${isFocused ? 0.09 : 0.05})`,
      border: `2px solid rgba(255, 255, 255, ${isFocused ? 0.65 : 0.5})`,
      cursor: "pointer"
    }
  }),
  valueContainer: (base, state) => ({
    ...base,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem"
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "white",
    fontSize: "1rem"
  }),
  input: (base, state) => ({
    ...base,
    padding: 0,
    margin: 0
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: "none"
  }),
  menu: (base, state) => ({
    ...base,
    border: "2px solid rgba(255, 255, 255, 0.35)",
    background: "rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(14px)",
    boxShadow: "2px 2px 18px rgba(0, 0, 0, 0.7)",
    borderRadius: "0.375rem"
  }),
  option: (base, { isSelected }) => ({
    ...base,
    padding: '.4rem .55rem',
    background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'none',
    transition: 'background .2s',

    ':hover': {
      background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
      cursor: 'pointer'
    }
  })
}

export default function SelectInput({ fullWidth, ...params }) {
  return <Select styles={selectStyles} width={fullWidth ? "100%" : "auto"} {...params} />
}