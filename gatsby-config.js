module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Musicorum`,
        short_name: `Musicorum`,
        start_url: `/`,
        background_color: `#131313`,
        theme_color: `#B71C1C`,
        display: `standalone`,
        icon: 'src/assets/icons/logo-circle.png',
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: process.env.SENTRY_DSN,
        sampleRate: 1.0,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#B71C1C`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
        ignore: [`**/\.*`, `**/*~`]
      }
    },
    {
      resolve: `@jbseo/gatsby-plugin-react-i18next`,
      options: {
        sourceInstanceName: `locale`,
        languages: [`en`, `pt`],
        defaultLanguage: `en`,
        ns: ['common'],
        defaultNS: 'common',
        i18nextOptions: {
          languages: [`en`, `pt`],
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          ns: ['common'],
          defaultNS: 'common'
        },
        pages: [
          {
            matchPath: '/:lang?',
            getLanguageFromPath: true
          }
          ]
      },
    },
  ],
}
