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
  *         date: string, 
  *         author: string
  *       }, 
  *       parent: {relativePath: string}, 
  *       tableOfContents, 
  *       fields: {
  *         timeToRead: {text: string}
  *       }
  *     }
  *   }
  * }} 
  */
export default function Layout({ data, children }) {

  console.log(data);

  const path = useLocation().pathname

  const id = path.split('/')[1];



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
            <span className="text-sm md:text-lg font-mono inline-block ">
              {data.mdx.frontmatter.author} · {data.mdx.frontmatter.date} · {data.mdx.fields.timeToRead.text}
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
    <meta name='date' content={data.mdx.frontmatter.date} />

  </>;
}

//export { Layout };

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        category
        date
        author
      }
      tableOfContents
      fields {
        timeToRead {
          text
        }
      }
    }
  }
`