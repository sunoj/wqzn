const postcssCustomMedia = require(`postcss-custom-media`)
const autoprefixer = require(`autoprefixer`)
const cssVariables = require(`postcss-css-variables`)
const colorModFunction = require(`postcss-color-mod-function`)
const cssNano = require(`cssnano`)
const customProperties = require(`postcss-custom-properties`)
const easyImport = require(`postcss-easy-import`)
const path = require(`path`)
const algoliaQueries = require(`./utils/algolia-queries`)

require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})


const plugins = [
  /**
   *  Content Plugins
   */
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: path.join(__dirname, `content`),
          name: `markdown-pages`,
      },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`,
      },
  },
  {
    resolve: `gatsby-plugin-netlify-cms`,
    options: {
      enableIdentityWidget: true,
    },
  },
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  {
      resolve: `gatsby-transformer-remark`,
      options: {
          plugins: [
              {
                  resolve: `gatsby-remark-images`,
                  options: {
                      withWebp: true,
                  },
              },
              `gatsby-remark-autolink-headers`,
              `gatsby-remark-code-titles`,
              `gatsby-remark-prismjs`,
              `gatsby-remark-external-links`,
          ],
      },
  },
  `gatsby-transformer-yaml`,
  `gatsby-plugin-catch-links`,
  /**
   *  Utility Plugins
   */
  {
      resolve: `gatsby-plugin-manifest`,
      options: {
          name: `维权指南`,
          short_name: `维权指南`,
          start_url: `/`,
          background_color: `#343f44`,
          theme_color: `#343f44`,
          display: `minimal-ui`,
          icon: `static/favicon.png`,
      },
  },
  `gatsby-plugin-react-helmet`,
  {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
          query: `
              {
              allMarkdownRemark{
                  edges {
                      node {
                          id
                          frontmatter {
                              published_at: date
                              feature_image: image
                          }
                          fields {
                              slug
                          }
                      }
                  }
              }
          }`,
          mapping: {
              allMarkdownRemark: {
                  sitemap: `pages`,
              },
          },
          exclude: [
              `/dev-404-page`,
              `/404`,
              `/404.html`,
              `/offline-plugin-app-shell-fallback`,
              `/data-schema`,
              `/data-schema-2`,
              `/v0.11/README`,
              `/README`,
              /(\/)?hash-\S*/, // exclude internal tags
          ],
      },
  },
  `gatsby-plugin-force-trailing-slashes`,
  /**
   *  Display Plugins
   */
  {
      resolve: `gatsby-plugin-postcss`,
      options: {
          postCssPlugins: [
              autoprefixer(),
              easyImport(),
              cssVariables(),
              colorModFunction(),
              customProperties({ preserve: false }),
              postcssCustomMedia(),
              cssNano({ zindex: false }),
          ],
      },
  },
  {
      resolve: `gatsby-plugin-react-svg`,
      options: {
          rule: {
              include: /icons/,
          },
      },
  },
]

const runAlgoliaBuild = () => (process.env.INCOMING_HOOK_TITLE && process.env.INCOMING_HOOK_TITLE === `Algolia`) || process.env.ALGOLIA
const hasAlgoliaKey = () => process.env.ALGOLIA_ADMIN_KEY && !process.env.ALGOLIA_ADMIN_KEY.match(/<key>/)

if (runAlgoliaBuild() && hasAlgoliaKey()) {
    plugins.push({
        resolve: `gatsby-plugin-algolia`,
        options: {
            appId: process.env.ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_ADMIN_KEY,
            queries: algoliaQueries,
            chunkSize: 10000, // default: 1000
        },
    })
}

module.exports = {
  siteMetadata: {
    title: `维权指南`,
    siteUrl: `https://www.wqzn.org`,
    description: `维权指南是一个开放的知识库，试图为消费者提供一系列在维权过程中切实可行的操作指南和法律参考。`,
  },
  plugins
}
