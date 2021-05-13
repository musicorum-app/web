import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { colorSecondary, darkerRed, lightLineCSS, likelyGrey } from "../../config/colors"
import TwitterIcon from '@material-ui/icons/Twitter'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import LogoType from '../../assets/svg/logotype.svg'
import DiscordIcon from '../../assets/svg/icons/discord.svg'
import PatreonIcon from '../../assets/svg/icons/patreon.svg'
import MediumIcon from '../../assets/svg/icons/medium.svg'
import GithubIcon from '../../assets/svg/icons/github.svg'

const bp = 'md'

const Bar = styled.nav`
  background: ${likelyGrey};
  ${tw`grid justify-items-center px-4 ${bp}:px-8 mt-16`}
  border-top: 2px solid ${lightLineCSS};
  border-bottom: 20px solid ${darkerRed};
`

const FooterLogo = styled(LogoType)`
  ${tw`mt-16`}
  height: 30px;
  width: auto;
`

const BarInside = styled.div`
  ${tw`flex flex-col items-start w-full 2xl:max-w-7xl`}
`

const SocialIcons = styled.div`
  ${tw`mt-8 space-x-5 flex`}
`

const SocialIcon = styled.a`
  text-decoration: none;
  display: flex;
  
  &:hover {
    cursor: pointer;
  }
  
  &>svg {
    width: 30px;
    height: 30px;
  }
`

const Disclaimer = styled.span`
  ${tw`mb-6 mt-16`}
  color: ${colorSecondary};
  font-size: 11px;
`

export default function Footer ({page}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)'
  })

  return <Bar>
    <BarInside>
      <FooterLogo />
      <SocialIcons>
        <SocialIcon href="https://twitter.com/MusicorumApp" rel="nofollow noreferrer" target="_blank">
          <TwitterIcon />
        </SocialIcon>
        <SocialIcon href="https://discord.musc.pw" rel="nofollow noreferrer" target="_blank">
          <DiscordIcon />
        </SocialIcon>
        <SocialIcon href="https://www.patreon.com/musicorumapp" rel="nofollow noreferrer" target="_blank">
          <PatreonIcon />
        </SocialIcon>
        <SocialIcon href="https://medium.com/musicorum" rel="nofollow noreferrer" target="_blank">
          <MediumIcon />
        </SocialIcon>
        <SocialIcon href="https://github.com/musicorum-app/" rel="nofollow noreferrer" target="_blank">
          <GithubIcon />
        </SocialIcon>
      </SocialIcons>
      <Disclaimer>

        Musicorum is not associated or affiliated, in any way, with Last.fm, CBSi or Twitter, with their logos and trademarks owned by themself
      </Disclaimer>
    </BarInside>
  </Bar>
}
