import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    textAlign: 'left'
  }
}))

export default function TOS () {
  const classes = useStyles()
  
  return (
    <div className={classes.main}>
      <h1>Terms &amp; Conditions</h1>
      <h2>Last update: 2020-08-10</h2>
      <p>
        By using the app, these terms will
        automatically apply to you – you should make sure therefore
        that you read them carefully before using the app. You’re not
        allowed to copy, or modify the app, any part of the app, or
        our trademarks in any way. You’re not allowed to attempt to
        extract the source code of the app, and you also shouldn’t try
        to translate the app into other languages, or make derivative
        versions. The app itself, and all the trade marks, copyright,
        database rights and other intellectual property rights related
        to it, still belong to the Musicorum Development Team.
      </p>
      <p>
        The Musicorum Development Team is committed to ensuring that the app is
        as useful and efficient as possible. For that reason, we
        reserve the right to make changes to the app or to charge for
        its services, at any time and for any reason. We will never
        charge you for the app or its services without making it very
        clear to you exactly what you’re paying for.
      </p>
      <p>
        The Musicorum app stores and processes personal data that
        you have provided to us, in order to provide our
        Service. It’s your responsibility to keep your device and
        access to the app secure. We therefore recommend that you do
        not modify/jailbreak your device, which is the process of
        removing software restrictions and limitations imposed by the
        official operating system of your device. It could make your
        device vulnerable to malware/viruses/malicious programs,
        compromise your phone’s security features and it could mean
        that the Musicorum app won’t work properly or at all.
      </p>
      <br />
      <div>
        <p>
          The app does use third party services that declare their own
          Terms and Conditions.
        </p>
        <p>
          Link to Terms and Conditions of third party service
          providers used by the app
        </p>
        <ul>
          <li>
            <a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank"
              rel="noopener noreferrer">Google Analytics</a>
          </li>
          <li>
            <a href="https://sentry.io/terms/" target="_blank" rel="noopener noreferrer">Sentry</a>
          </li>
        </ul>
      </div> <br />
      <p>
        You should be aware that there are certain things that
        the Musicorum Development Team will not take responsibility for. Certain
        functions of the app will require the app to have an active
        internet connection. The connection can be Wi-Fi, or provided
        by your mobile network provider, but Musicorum Development Team
        cannot take responsibility for the app not working at full
        functionality if you don’t have access to Wi-Fi, and you don’t
        have any of your data allowance left.
      </p>
      <p>
        If you’re using the app outside of an area with Wi-Fi, you
        should remember that your terms of the agreement with your
        mobile network provider will still apply. As a result, you may
        be charged by your mobile provider for the cost of data for
        the duration of the connection while accessing the app, or
        other third party charges. In using the app, you’re accepting
        responsibility for any such charges, including roaming data
        charges if you use the app outside of your home territory
        (i.e. region or country) without turning off data roaming. If
        you are not the bill payer for the device on which you’re
        using the app, please be aware that we assume that you have
        received permission from the bill payer for using the app.
      </p>
      <p>
        Along the same lines, the Musicorum Development Team cannot always take
        responsibility for the way you use the app i.e. You need to
        make sure that your device stays charged – if it runs out of
        battery and you can’t turn it on to avail the Service,
        the Musicorum Development Team cannot accept responsibility.
      </p>
      <p>
        With respect to the Musicorum Development Team’s responsibility for your
        use of the app, when you’re using the app, it’s important to
        bear in mind that although we endeavour to ensure that it is
        updated and correct at all times, we do rely on third parties
        to provide information to us so that we can make it available
        to you. The Musicorum Development Team accept no liability for any
        loss, direct or indirect, you experience as a result of
        relying wholly on this functionality of the app.
      </p>
      <p>
        At some point, we may wish to update the app. The app is
        currently available on – the requirements for
        system (and for any additional systems we
        decide to extend the availability of the app to) may change,
        and you may need to clear the website's cache if you want to keep
        using the app. The Musicorum Development Team does not promise that it
        will always update the app so that it is relevant to you
        and/or works with the version that you have
        available on your device. However, you promise to always
        accept updates to the application when offered to you, We may
        also wish to stop providing the app, and may terminate use of
        it at any time without giving notice of termination to you.
        Unless we tell you otherwise, upon any termination, (a) the
        rights and licenses granted to you in these terms will end;
        (b) you must stop using the app, and (if needed) delete it
        from your device.
      </p>
      <p>
        <h1>Changes to This Terms and Conditions</h1>
      </p>
      <p>
        We may update our Terms and Conditions
        from time to time. Thus, you are advised to review this page
        periodically for any changes. We will
        notify you of any changes by posting the new Terms and
        Conditions on this page.
      </p>
      <p>
        These terms and conditions are effective as of 2020-08-10
      </p>
      <p>
        <h1>Contact Us</h1>
      </p>
      <p>
        If you have any questions or suggestions about our
        Terms and Conditions, do not hesitate to contact us
        at <a href="mailto:methidezeeni@gmail.com">methidezeeni@gmail.com</a>.
      </p>
    </div>
  )
}
    