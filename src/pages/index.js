import React from 'react'
import Page from '../components/base/Page'
import Container from '../components/base/Container'
import Header from '../components/base/Header'
import LogoType from '../assets/logotype.svg'
import tw, { styled } from 'twin.macro'
import { TwitterPost } from '../components/social/TwitterPost'

const MainLogo = styled(LogoType)`
  ${tw`mt-8 h-9 lg:h-14`}
  width: auto;
`

const ContentGrid = styled.div`
  ${tw`grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-28`}
`

const ContentBox = styled.div`
  ${tw`flex flex-col justify-center`}
  font-weight: 400;
`

const ContentHeader = styled.h3`
  ${tw`mt-0 mb-6`}
  font-size: 1.7rem;
`

export default function Home () {
  return <Page page="home">
    <Container>
      <Header>
        <MainLogo/>
      </Header>
      <ContentGrid>
        <ContentBox>
          <ContentHeader>
            Share your musical charts automatically to Twitter
          </ContentHeader>
          Musicorum automatically tweets every week or month on your twitter account a fancy image(or just text) with
          your Last.fm charts.
        </ContentBox>
        <TwitterPost
          user={{
            avatar: 'https://pbs.twimg.com/profile_images/1325957152054374400/XTjFh45Y_400x400.jpg',
            name: 'Pedro Fracassi',
            user: 'plfracassi'
          }}
          footer={{
            date: new Date(),
            app: 'Musicorum'
          }}
          image="https://share.musc.pw/19anS4.jpg"
        >
          {'🎵 This was my week on music ✨'}
        </TwitterPost>
        <img width="100%" src="https://result.musicorumapp.com/V_5R7XF6EEkzhNqx_mexTEY-LFGpJ5B07PvkVW_HKEckZJ.webp"/>
        <ContentBox>
          <ContentHeader>
            Or just create an image and share where you like
          </ContentHeader>
          You can also just create some images and do what you want with it, with full control and customization.
        </ContentBox>
      </ContentGrid>
    </Container>
  </Page>
}
