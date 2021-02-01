import React from 'react'
import tw, { styled } from 'twin.macro'
import { darkerRed, donateColor, likelyGrey } from '../../config/colors'
import { Link } from 'gatsby'

const Item = styled.div`
  ${tw`md:h-16 flex items-center px-3 md:w-full`}
  border-top: 6px solid transparent;
  color: ${props => props.donate ? donateColor : 'white'};
  border-bottom: 6px solid ${props => props.active ? (props.donate ? donateColor : darkerRed) : 'transparent'};
  box-sizing: border-box;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
  }

  @media only screen and (max-width: 767px) {
    ${tw`py-1 my-1 rounded-r-md`}
    border-bottom: none;
    border-top: none;
    border-left: 6px solid ${props => props.active ? (props.donate ? donateColor : darkerRed) : 'transparent'};
    padding-left: 1.6rem;
  }
`

export default function NavBarItem ({mobile, donate, to, active, children}) {
  return <Link to={to}>
    <Item active={active} donate={donate} mobile={mobile}>
      {children}
    </Item>
  </Link>
}
