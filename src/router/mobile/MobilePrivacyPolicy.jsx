import React from 'react'

import { Typography, Container, Link as MuiLink } from '@material-ui/core'

// eslint-disable-next-line react/prop-types
function Link ({ href, children }) {
  return <MuiLink href={href} target="_blank" rel="noopener noreferrer">{children}</MuiLink>
}

console.log(Link)

export default function MobilePrivacyPolicy () {
  return (
    <Container maxWidth="md">
      <h1 style={{
        textAlign: 'center'
      }}>Musicorum mobile Privacy Policy</h1>
      <Typography color='textSecondary' style={{
        marginBottom: 16
      }}>Last updated at 12 nov 2022</Typography>

      <Typography>The Musicorum Mobile is an Android Application available and provided for free on the Google Play Store. It is developed and maintained by the Musicorum Team. Its code is publicly available on our <Link href="https://github.com/musicorum-app/mobile">GitHub repository</Link>.</Typography>

      <Typography>By using the application you must agree with these terms and that we may collect and use some information collected from the app. We will not sell your data to third parties. The data will only be used for required functionality, analytical usage, and/or problem-solving.</Typography>

      <h2>What we collect:</h2>

      <h3>1. Required information</h3>
      <Typography>When using the app you will be prompted to connect your <Link href="https://last.fm">Last.fm</Link> account. The information about your session, such as a token and username, will be saved locally on your device and will be used alongside the <Link href="https://last.fm/api">Last.fm API</Link> to access your account information to make the app function properly.</Typography>

      <h3>2. Cookies</h3>
      <Typography>When prompted to connect with your <Link href="https://last.fm">Last.fm</Link> account, a web page will be shown. This page may use cookies on their end. Please refer to <Link href="https://www.last.fm/legal">Last.fm terms</Link> for more.</Typography>

      <h3>3. Log data</h3>
      <Typography>The app may send anonymous requests to Musicorum Services, which may be collected by our hosting services. We also make use of the Firebase Crashlytics service to retrieve the log data of the app, which can be used to fix problems. Some of your personal data may be included in these logs, such as, but not limited to, device model, RAM, and disk usage.</Typography>

      <h3>4. Analytical data</h3>
      <Typography>We use Google Analytics and the Firebase Crashlytics services to retrieve some anonymous data to monitor and analyze information about your usage to improve the app and fix incoming problems. You can check how this is done in the source code, available on our <Link href="https://github.com/musicorum-app/mobile">public repository</Link>. Please refer to their policy to see how the data is used and managed on their end.</Typography>

      <h2>External sites and services</h2>
      <Typography>The app also provides some external links that may redirect to third-party apps or websites. These links may be automatically gathered, with no previous inspection from us. Those external services may not be owned and managed by the Musicorum members, and they may have specific privacy policies. We are not responsible for what is provided on those services and how they handle your data. Please refer to their policies.</Typography>

      <h2>Third-Party Services</h2>
      <Typography>The app uses 3rd-party services to work properly and to provide us with some analytical information. These services may deal with your data in their way. By using this app, you agree that these services may have access to some personal and non-personal information about you. Please refer to their policies for more:</Typography>
      <ul>
        <Link href="https://www.last.fm/legal/">
          <Typography component="li">Last.fm</Typography>
        </Link>
        <Link href="https://www.spotify.com/legal/privacy-policy/">
          <Typography component="li">Spotify</Typography>
        </Link>
        <Link href="https://www.google.com/policies/privacy/">
          <Typography component="li">Google Play Services</Typography>
        </Link>
        <Link href="https://www.google.com/policies/privacy/">
          <Typography component="li">Google Analytics</Typography>
        </Link>
        <Link href="https://firebase.google.com/support/privacy/">
          <Typography component="li">Firebase Crashlytics</Typography>
        </Link>
      </ul>

      <h2>Children&apos;s Privacy</h2>
      <Typography>The app does not restrict usage by age and we do not collect or require age information, meaning that we do not know if the data collected is from children. Nonetheless, we make high usage of <Link href="https://last.fm">Last.fm</Link> users&apos; data. Please refer to their policy about how they handle children&apos;s privacy.</Typography>

      <h2>Changes to this policy</h2>
      <Typography>This Privacy Policy may be updated from time to time, without previous warning, on this same page. The changes are affected immediately as they are updated here.</Typography>

      <h2>Contact</h2>
      <Typography>If you have any questions or suggestions about this policy, please contact us via our <Link href="https://discord.musc.pw/">Discord server</Link> or email <Link href="mailto:methidezeeni@gmail.com">methidezeeni@gmail.com</Link>.</Typography>

    </Container>
  )
}
