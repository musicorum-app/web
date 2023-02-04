import styled from "@emotion/styled"
import Link from "next/link"
import { Fragment } from "react"

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

const NavbarItem = (props: NavbarItemProps) => {
  return (
    <Fragment>
      <Link
        href={props.destination}
        passHref
        style={{ height: "100%", width: "100%" }}
      >
        <Item active={props.active} className={props.mobile ? 'mobile' : ''}>
          {props.label}
        </Item>
      </Link>
    </Fragment>
  )
}

export default NavbarItem
