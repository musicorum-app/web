"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import styled from "styled-components"

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Item = styled.div`
  transition: all 150ms ease-in-out;
  color: white;
  font-weight: 500;
  height: 56px;
  padding: 0 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  text-decoration: none;

  &:hover {
    background: var(--gray-a3);
    cursor: pointer;
  }

  &.active {
    box-shadow: inset 0 -7px var(--mostly-red);
  }

  &.mobile {
    border-left: 6px solid transparent;
    border-bottom: none;
    border-top: none;
    padding: 2px 10px;
    margin: 2px 0;
  }
`

interface NavbarItemProps {
  destination: string
  children: ReactNode
  mobile?: boolean
}

export default function NavbarItem(props: NavbarItemProps) {
  const pathName = usePathname()

  const active = pathName === props.destination

  return (
    <StyledLink href={props.destination} passHref>
      <Item className={active ? "active" : ""}>{props.children}</Item>
    </StyledLink>
  )
}
