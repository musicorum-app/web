import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { lightLineCSS, likelyGrey } from '../../config/colors'
import NavBarItem from './NavBarItem'
import logo from '../../assets/logo.svg'
import { Link } from 'gatsby'
import Button from '../buttons/Button'
import TwitterIcon from '@material-ui/icons/Twitter'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import MediaQuery, { useMediaQuery } from 'react-responsive'

const bp = 'md'

const Bar = styled.nav`
  background: ${likelyGrey};
  border-bottom: 2px solid ${lightLineCSS};
  ${tw`grid justify-items-center px-4 ${bp}:px-8`}
`

const BarInside = styled.div`
  ${tw`flex justify-between w-full 2xl:max-w-7xl`}
`

const NavBarItems = styled.div`
  ${tw`flex items-center`}
`

const MobileDrawerIcon = styled.button`
  padding: 0.4rem;
  display: flex;
  background: none;
  border-radius: 4px;
  outline: none;
  border: none;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  &:focus {
    outline: 1px auto white;
  }
`

const NavIcon = styled(logo)``

const MobileSizeGap = styled.div`
  ${tw`h-16`}
  content: ' ';
  width: 40px;
`

const MobileNavsItems = styled.div`
  ${tw`mb-1`}
  width: 100%;
`

const ScreenRead = styled.div`
  ${tw`sr-only`}
`

export default function NavBar ({page}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)'
  })
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    if (!isMobile && isOpen) {
      setOpen(false)
    }
  }, [isMobile])

  return <Bar>
    <BarInside>
      <MediaQuery query="(max-width: 767px)">
        <NavBarItems>
          <MobileDrawerIcon onClick={toggleOpen}>
            <ScreenRead>{isOpen ? 'Close menu' : 'Open menu'}</ScreenRead>
            {
              isOpen
                ? <CloseRoundedIcon style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: 28
                }}/>
                : <MenuRoundedIcon style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: 28
                }}/>
            }
          </MobileDrawerIcon>
          <MobileSizeGap/>
        </NavBarItems>
      </MediaQuery>
      <NavBarItems>
        <Link to="/" style={{
          padding: 0,
          marginTop: 6,
          border: 'none',
          textDecoration: 'none',
          marginRight: 24
        }}>
          <NavIcon height={isMobile ? 23 : 27}/>
        </Link>
        <MediaQuery query="(min-width: 768px)">
          <NavBarItem active={page === 'generate'} to="/generate">
            Generate
          </NavBarItem>
          <NavBarItem active={page === 'about'} to="/about">
            About
          </NavBarItem>
        </MediaQuery>
      </NavBarItems>
      <NavBarItems>
        <MediaQuery query="(min-width: 768px)">
          <NavBarItem active={page === 'donate'} donate to="/donate">
            Donate
          </NavBarItem>
        </MediaQuery>
        <Button size="small" color="#1da1f2" icon={!isMobile ? <TwitterIcon/> : null} buttonStyle={{
          marginLeft: 10
        }}>
          Login
        </Button>
      </NavBarItems>
    </BarInside>
    <MediaQuery query="(max-width: 767px)">
      {
        isOpen && <MobileNavsItems>
          <NavBarItem active={page === 'generate'} to="/generate">
            Generate
          </NavBarItem>
          <NavBarItem active={page === 'about'} to="/about">
            About
          </NavBarItem>
          <NavBarItem active={page === 'donate'} donate to="/donate">
            Donate
          </NavBarItem>
        </MobileNavsItems>
      }
    </MediaQuery>
  </Bar>
}
