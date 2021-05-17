import React from 'react'
import Page from '../components/base/Page'
import Header from '../components/base/Header'
import Container from '../components/base/Container'

export default function NotFoundPage() {
  return (
    <Page page="404" name="404 Not found">
      <Container>
        <Header>404 Not found x.x</Header>
        <div
          style={{
            textAlign: 'center',
            width: '100%',
          }}
        >
          This page could not be found!
        </div>
      </Container>
    </Page>
  )
}
