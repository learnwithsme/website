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
  *         timeToRead: {text: string}
  *       }
  *       excerpt: string
  *     }
  *   }
  * }} 
  */
export default function Layout({ data, children }) {

  console.log(data);

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
              <button className="btn btn-ghost"><span class="material-symbols-outlined">
                arrow_back
              </span><span className="hidden md:inline">Back to {id}</span></button>
            </Link>
          </>}
      >

        <Content className='prose p-4 xl:p-0'>
          <h1 className="">
            <span className="text-xs md:text-sm font-mono uppercase ">{data.mdx.frontmatter.category}</span>
            <br />
            <span className=" md:text-6xl ">{data.mdx.frontmatter.title}</span>
            <br />

            <div className="dropdown dropdown-bottom mr-2">
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info ">
                <span class="material-symbols-outlined">
                  info
                </span>
              </div>
              <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-200 rounded-box w-72">
                <div tabIndex={0} className="card-body font-sans text-md font-normal">
                  Checker: {listFormat.format(data.mdx.frontmatter.checker ?? ['-'])}<br/>Word count: {data.mdx.fields.timeToRead.words}
                </div>
              </div>
            </div>

            <span className="text-sm md:text-lg font-mono inline-block align-middle ">
              {listFormat.format(data.mdx.frontmatter.author)} · {data.mdx.frontmatter.datePublished}
              {data.mdx.frontmatter.dateUpdated != null ? <> (updated {data.mdx.frontmatter.dateUpdated}) </> : <> </>}

              · {data.mdx.fields.timeToRead.text}
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

    <meta name='og:title' content={data.mdx.frontmatter.title} />
    <meta name='og:type' content="article" />
    <meta name='og:site_name' content="SME DLSU Academic Hub" />
    <meta name='author' content={data.mdx.frontmatter.author} />
    <meta name='date' content={data.mdx.frontmatter.datePublished} />
    <meta name="og:description" content={data.mdx.excerpt} />
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
        timeToRead {
          text
          words
        }
      }
      excerpt
    }
  }
`