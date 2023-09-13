'use client'

import Link from "next/link"
import styled from "styled-components"

const Item = styled.div<{ active: boolean }>`
  border-top: 6px solid transparent;
  color: white;
  border-bottom: 6px solid
    ${props =>
      props.active ? "var(--chakra-colors-mostlyRed)" : "transparent"};
  height: 100%;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
  }
&.mobile {
  border-left: 6px solid transparent;
  border-left-color: ${props =>
  props.active ? "var(--chakra-colors-mostlyRed)" : "transparent"};
  border-bottom: none;
  border-top: none;
  padding: 2px 10px;
  margin: 2px 0;
}
`

interface NavbarItemProps {
  destination: string
  label: string
  active: boolean
  mobile?: boolean
}

export default function NavbarItem(props: NavbarItemProps) {
  return (
    <Link
      href={props.destination}
      passHref
    >
       <Item active={props.active} className={props.mobile ? 'mobile' : ''}>
          {props.label}
        </Item>
    </Link>
  )
}
