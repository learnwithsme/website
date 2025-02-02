import readingTime from "reading-time";
import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import TerserPlugin from "terser-webpack-plugin"

// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=mdx#timetoread
export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {

    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "src/pages",
    })

    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body)
    });
    createNodeField({
      node,
      name: `slug`,
      value: `${relativeFilePath}`
    });
    createNodeField({
      node,
      name: `customAcadsSubject`,
      value: relativeFilePath.split('/')[1]
    });
  }
}



const acadsSubject = path.resolve(`./src/templates/acads_subject.js`);
const acadsLesson = path.resolve(`./src/templates/acads_lesson.js`);

export const createPages = async ({ graphql, actions: { createPage }, reporter }) => {

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }



  // create blog post pages
  const posts = result.data.allMdx.nodes




  // call `createPage` for each result
  posts.forEach((node, index) => {
    let slugPath = node.fields.slug.split('/');

    // if the third level has something, it's a lesson
    let isLesson = slugPath[2] != "";

    createPage({
      path: node.fields.slug,
      component: `${isLesson ? acadsLesson : acadsSubject}?__contentFilePath=${node.internal.contentFilePath}`,
      // you can use the values in this context in
      // our page layout component
      context: {
        id: node.id,
        // add subject as a variable to the GraphQL query
        subject: slugPath[1]
      },
    })
  })
};

// https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/
export const onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
  getConfig
}) => {
  const config = getConfig();

  // remove license.txt files to reduce file count
  // https://stackoverflow.com/a/65650316
  config.optimization = {
    ...config.optimization,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  }

  actions.replaceWebpackConfig(config)

}
