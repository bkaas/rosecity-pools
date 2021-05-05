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
  ],
  proxy: {
    prefix: "/api",
    url: "http://localhost:3000",
  },
  // Ref: https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths/
}
