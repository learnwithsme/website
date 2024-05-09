import remarkGfm from "remark-gfm"

import { dirname } from "path"
import { fileURLToPath } from "url"

// https://www.gatsbyjs.com/docs/how-to/custom-configuration/es-modules/#migrating-from-commonjs-to-es-modules
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import('gatsby').GatsbyConfig}
 */
export default {
  siteMetadata: {
    title: `SME DLSU`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        //name: `SME DLSU Academic Hub`,
        //short_name: `GatsbyJS`,
        //start_url: `/`,
        //background_color: `#f7f0eb`,
        //theme_color: `#a2466c`,
        //display: `standalone`,
        icon: `src/images/logo.png`
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `subjects`,
        path: `${__dirname}/content`,
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
              colorIsTextColor: true, // to make \color{} a function, not a switch
              trust: true // to make \html stuff work
            },
          },
          {
            // https://github.com/borgfriend/gatsby-remark-embed-video
            resolve: "gatsby-remark-embed-video",
            options: {}
          },
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
          ]
        }

      }

    },
    {
      // to remove sourcemaps (/public/page-data) to decrease filecount
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    {
      resolve: `gatsby-plugin-minify`,
      options: {
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
      }
    },
    /*
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        ErrorDocument: `
          ErrorDocument 404 /pages_error/404.html
        `
      }
    }
    */
  ]
};