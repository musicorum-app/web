module.exports = {
  plugins: [`gatsby-plugin-emotion`, `gatsby-plugin-sass`, {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/
      }
    }
  },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#B71C1C`,
        showSpinner: true
      }
    }
  ]
}