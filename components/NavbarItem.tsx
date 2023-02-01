import styled from "@emotion/styled"
import Link from "next/link"
import { Fragment } from "react"


const Item = styled.div`
  border-top: 6px solid transparent;
  color: white;
  border-bottom: 6px solid ${props => props.active ? "white" : 'transparent'};
  height: 100%;
  width: 6rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
  }
`

interface NavbarItemProps {
    destination: string,
    label: string,
    active: boolean
}

const NavbarItem = (props: NavbarItemProps) => {
  return <Fragment>
    <Link href={props.destination} passHref style={{height: "100%"}}>
        <Item active={props.active}>{props.label}</Item>
    </Link>
  </Fragment>
}

export default NavbarItem
