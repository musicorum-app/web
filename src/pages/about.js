import React from 'react'
import Page from '../components/base/Page'
import Header from '../components/base/Header'
import Container from '../components/base/Container'

export default function AboutPage() {
  return (
    <Page page="about" name="About">
      <Container>
        <Header>About</Header>
        {'<'}cool description text here{'>'}
      </Container>
    </Page>
  )
}
