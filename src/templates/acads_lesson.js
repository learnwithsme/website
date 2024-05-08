import React from "react"
import { useLocation } from '@reach/router';

import { MDXProvider } from "@mdx-js/react";
import { InlineMath, BlockMath } from 'react-katex';
import { Link, graphql } from 'gatsby'

import { State, Observe } from '/src/utils';
import { Content } from "../components/content";
import Navbar from "../components/navbar";

const components = { InlineMath, BlockMath, State, Observe };

/** GraphQL query about this MDX file
  *
  * @param {{ data: {
  *     mdx: {
  *       frontmatter: {
  *         category: string, 
  *         title: string, 
  *         datePublished: string, 
  *         dateUpdated: string, 
  *         author: string[],
  *         checker: string[],
  *       }, 
  *       parent: {relativePath: string}, 
  *       tableOfContents, 
  *       fields: {
  *         slug: string
  *         timeToRead: {text: string}
  *       }
  *       excerpt: string
  *     }
  *   }
  * }} 
  */
export default function Layout({ data, children }) {

  const path = useLocation().pathname

  const id = path.split('/')[1];

  const listFormat = new Intl.ListFormat();


  return (
    <MDXProvider components={components}>



      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />


      <Navbar
        leading={
          <>
            <Link to="../">
              <button className="btn btn-ghost"><span className="material-symbols-outlined">
                arrow_back
              </span><span className="hidden md:inline">Back to {id}</span></button>
            </Link>
          </>}
      >

        <Content className='prose p-4 xl:p-0'>
          <h1 className="">
            <span className="text-xs md:text-sm font-mono uppercase ">{data.mdx.frontmatter.category}</span>

            <br />

            <span className="md:text-6xl flex flex-row flex-nowrap">

              {/* TITLE OF THE LESSON */}
              <span className="grow">{data.mdx.frontmatter.title}</span>

              {/* more options right menu */}
              <span className="grow-0">

                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                    <span className="material-symbols-outlined">more_vert</span>
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 menu-sm shadow bg-base-200 rounded-box w-52">
                    <li><a href={
                      // create GitHub repo link
                      // `data.mdx.fields.slug` has a trailing slash, we need to remove that
                      `https://github.com/learnwithsme/website/tree/main/content${data.mdx.fields.slug.substring(0, data.mdx.fields.slug.length - 1)}.mdx`
                    } target="_blank" rel="noreferrer">View source code ↗</a></li>
                  </ul>
                </div>

              </span>

            </span>

            <br />

            <span className="text-sm md:text-lg font-mono">

              <span className="flex flex-row flex-wrap">

                <span className="after:content-['·'] after:px-2">
                  {listFormat.format(data.mdx.frontmatter.author)}
                </span>
                <span className="after:content-['·'] after:px-2">
                  {data.mdx.frontmatter.datePublished}
                  {data.mdx.frontmatter.dateUpdated != null ? ` (updated ${data.mdx.frontmatter.dateUpdated})` : <></>}
                </span>
                <span className="tooltip tooltip-bottom" data-tip={`${data.mdx.fields.timeToRead.words} words`}>
                  {data.mdx.fields.timeToRead.text}
                </span>
              </span>
              
              {
                data.mdx.frontmatter.checker != null ?
                  <span className="text-xs md:text-sm">
                    Checked by: {listFormat.format(data.mdx.frontmatter.checker ?? ['-'])}
                  </span>
                  : <></>
              }

            </span>

          </h1>
          <div className="divider"></div>

          {children}
        </Content>

      </Navbar>
    </MDXProvider>
  )
}

export const Head = ({
  data,
  pageContext,
}) => {

  const path = useLocation().pathname

  const id = path.split('/')[1];

  return <>
    <title> {data.mdx.frontmatter.title} - {id} - SME Academic Hub</title>

    <meta property='og:title' content={data.mdx.frontmatter.title} />
    <meta property='og:type' content="article" />
    <meta property='og:site_name' content="SME DLSU Academic Hub" />
    <meta name='author' content={data.mdx.frontmatter.author} />
    <meta name='date' content={data.mdx.frontmatter.datePublished} />
    <meta property="og:description" content={data.mdx.excerpt} />
    <meta name="description" content={data.mdx.excerpt} />

  </>;
}

//export { Layout };

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        category
        datePublished(formatString: "YYYY-MM-DD")
        dateUpdated(formatString: "YYYY-MM-DD")
        author
        checker
      }
      tableOfContents
      fields {
        slug
        timeToRead {
          text
          words
        }
      }
      excerpt
    }
  }
`