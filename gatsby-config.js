/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/draft/*`] },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    }
  ],
  proxy: {
    prefix: "/api",
    // url: "http://localhost:3000",
    url: "https://rosecitypools.info/",
  },
  // Ref: https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths/
}
