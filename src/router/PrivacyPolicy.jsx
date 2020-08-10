import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    textAlign: 'left'
  }
}))

export default function PrivacyPolicy () {
  const classes = useStyles()
  
  return (
    <div className={classes.main}>
      <h1>Privacy Policy</h1>
      <h2>Last update: 2020-08-10</h2>
      <p>
        The Musicorum Development Team built the Musicorum app as
        an Open Source app. This SERVICE is provided by
        the Musicorum Development Team at no cost and is intended for use as
        is.
      </p>
      <p>
        This page is used to inform visitors regarding our
        policies with the collection, use, and disclosure of Personal
        Information if anyone decided to use our Service.
      </p>
      <p>
        If you choose to use our Service, then you agree to
        the collection and use of information in relation to this
        policy. The Personal Information that we collect is
        used for providing and improving the Service. We will not use or share your information with
        anyone except as described in this Privacy Policy.
      </p>
      <p>
        The terms used in this Privacy Policy have the same meanings
        as in our Terms and Conditions, which is accessible at
        <a href="https://musicorumapp.com/tos" target="_blank" rel="noopener noreferrer">https://musicorumapp.com/tos</a> unless otherwise defined in this Privacy Policy.
      </p>
      <p>
        <h1>Information Collection and Use</h1>
      </p>
      <p>
        For a better experience, while using our Service, we
        may require you to provide us with certain personally
        identifiable information, including but not limited to Twitter Account ID, Access Token and Access Secret,
        Last.fm Session Key. The information that we request will be retained on your device 
        and may be collected by us for services as the Musicorum Twitter Scheduler.
      </p>
      <div>
        <p>
          The app does use third party services that may collect
          information used to identify you.
        </p>
        <p>
          Link to privacy policy of third party service providers used
          by the app
        </p>
        <ul>
          <li>
            <a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" rel="noopener noreferrer">Google Analytics</a>
          </li>
          <li>
            <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer">Sentry</a>
          </li>
        </ul>
      </div>
      <p>
        <h1>Log Data</h1>
      </p>
      <p>
        We want to inform you that whenever you
        use our Service, in a case of an error in the app,
        we collect data and information (through third party
        products) on your device called Log Data. This Log Data may
        include information such as your device Internet Protocol
        (“IP”) address, device name, operating system version, the
        configuration of the app when utilizing our Service,
        the time and date of your use of the Service, and other
        statistics.
      </p>
      <p>
        <h1>Cookies</h1>
      </p>
      <p>
        Cookies are files with a small amount of data that are
        commonly used as anonymous unique identifiers. These are sent
        to your browser from the websites that you visit and are
        stored on your device's internal memory.
      </p>
      <p>
        This Service may use these “cookies” explicitly, and also,
        the app may use third party code and libraries that use
        “cookies” to collect information and improve their services.
        You have the option to either accept or refuse these cookies
        and know when a cookie is being sent to your device. If you
        choose to refuse our cookies, you may not be able to use some
        portions of this Service.
      </p>
      <p>
        <h1>Service Providers</h1>
      </p>
      <p>
        We may employ third-party companies and
        individuals due to the following reasons:
      </p>
      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      <p>
        We want to inform users of this Service
        that these third parties have access to your Personal
        Information. The reason is to perform the tasks assigned to
        them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </p>
      <p>
        <h1>Security</h1>
      </p>
      <p>
        We value your trust in providing us your
        Personal Information, thus we are striving to use commercially
        acceptable means of protecting it. But remember that no method
        of transmission over the internet, or method of electronic
        storage is 100% secure and reliable, and we cannot
        guarantee its absolute security.
      </p>
      <p>
        <h1>Links to Other Sites</h1>
      </p>
      <p>
        This Service may contain links to other sites. If you click on
        a third-party link, you will be directed to that site. Note
        that these external sites are not operated by us.
        Therefore, we strongly advise you to review the
        Privacy Policy of these websites. We have
        no control over and assume no responsibility for the content,
        privacy policies, or practices of any third-party sites or
        services.
      </p>
      <p>
        <h1>Children’s Privacy</h1>
      </p>
      <p>
        These Services do not address anyone under the age of 13.
        We do not knowingly collect personally
        identifiable information from children under 13. In the case
        we discover that a child under 13 has provided
        us with personal information, we immediately
        delete this from our servers. If you are a parent or guardian
        and you are aware that your child has provided us with
        personal information, please contact us so that
        we will be able to do necessary actions.
      </p>
      <p>
        <h1>Changes to This Privacy Policy</h1>
      </p>
      <p>
        We may update our Privacy Policy from
        time to time. Thus, you are advised to review this page
        periodically for any changes. We will
        notify you of any changes by posting the new Privacy Policy on
        this page.
      </p>
      <p>This policy is effective as of 2020-08-10</p>
      <p>
        <h1>Contact Us</h1>
      </p>
      <p>
        If you have any questions or suggestions about our
        Privacy Policy, do not hesitate to contact us at <a href="mailto:methidezeeni@gmail.com">methidezeeni@gmail.com</a>.
      </p>
    </div>
  )
}
  