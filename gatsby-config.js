module.exports = {
  plugins: [`gatsby-plugin-emotion`, `gatsby-plugin-sass`, {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/,
      },
    },
  },],
}