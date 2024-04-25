
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
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

      }

    },
    {
      // to remove sourcemaps (/public/page-data) to decrease filecount
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    {
      resolve: `gatsby-plugin-minify`,
      options: {
        removeAttributeQuotes: true
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