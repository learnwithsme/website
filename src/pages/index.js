import * as React from "react";
import { Link, StaticQueryDocument, graphql } from "gatsby";
import loadable from '@loadable/component'

import Navbar from "../components/navbar";
import { Content } from "../components/content";
import * as utils from "../utils"
import { SubjectChip } from "../templates/acads_subject"
import { LogoSmall } from "../components/logo";
import { FormContact } from "../components/formContact";

import _subjects from "/content/subjects.json";
const subjects = structuredClone(_subjects); //deep copy


/**
 * Main page
 * @param {{
 *   data: GraphqlQuery
 * }}  
 */
export default function IndexPage({
  data
}) {

  /** Subjects that are in the `/content/acads` folder 
  */
  const subjectsThatExist = data.allDirectory.nodes.map((value) => value.name);

  return (
    <div className="flex flex-col">

      <Navbar leading={
        <></>

      }
        trailing={<></>/*
          <input type="text"
            placeholder="Search course"
            className="input input-bordered w-full max-w-xs" />
    */ }
        enableNavbar={false}>

        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://unsplash.com/photos/W8WIwErOPlI/download?w=640)', }}>
          <div className="hero-overlay bg-gradient-to-b from-transparent to-base-100"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">


              <LogoSmall
                className="block m-auto"
                width="200"
                height="200"
              />

              <h1 className="mb-5 text-6xl font-bold font-['Futura_Std',ui-sans-serif,sans-serif] text-base-content">Learn With SME</h1>
              <p className="mb-5 text-base-content ">Learn more and explore a world full of knowledge and ideas!</p>

            </div>
          </div>
        </div>

        <h2 className="text-3xl font-[Poppins] font-medium  bg-gradient-to-b from-base-100 to-transparent text-center pt-10" id="list">Explore our Academic Database</h2>

        <Content className="p-4 xl:p-0">

          The SME Academic Database is streamlined for ease and convenience and is aligned with the syllabus for different subjects. The database also contains a repository of review materials for your own benefit and supplementary lessons to aid your understanding in some concepts in class.
        </Content>

        <div className="flex justify-center">
          <Link to="/flowchart">
            <button className="btn btn-primary">Open flowchart view</button>
          </Link>
        </div>

        <div className="pb-28" style={{ /*backgroundImage: "linear-gradient(45deg, rgba(12,22,34,1) 0%, rgba(35,78,132,1) 100%)" */ }}>



          <ListView
            subjectsThatExist={subjectsThatExist} />
        </div>



        <h2 className="text-3xl font-[Poppins] font-medium text-center">Contact us</h2>

        <Content className="p-4 xl:p-0">
          The communications form below is where you can give feedback about this site. Additionally, you can also request additional resources (books, review materials, PowerPoints).

          <FormContact />

        </Content>


      </Navbar>




    </div>
  )
}

export const Head = () => <>
  <title>Learn With SME</title>

  <meta name='og:title' content='Learn With SME' />
  <meta name='og:type' content='website' />

</>

/**
 *  The subjects list
 * @param {{
 *  subjectsThatExist: string[]
 * }}
 * @returns 
 */
function ListView({
  subjectsThatExist
}) {

  return (

    <Content>
      <div className="flex flex-row flex-wrap my-7 gap-7 place-content-center ">

        {
          subjects.nodes
            .filter((value, index, array) => subjectsThatExist.includes(value.id))
            .map((value, index, array) => <ListCard
              node={value}
            />)
        }
      </div>
    </Content>
  )
}

/**
 * Each individual button/card on the subjects list
 * @param {*} param0 
 */
function ListCard({
  node
}) {
  return <Link to={`/${node.id}`}><div className={`btn btn-neutral card-compact w-96 shadow-xl rounded-lg h-fit p-0 ${node.status != null ? "ring-4  ring-yellow-400" : ""}`}>
    <div className="card-body">
      <h2 className="card-title font-[Poppins,ui-sans-serif,sans-serif]">

        {node.status != null ? <div className="badge">{node.status.toUpperCase()}</div> : <></>}


        <span className="text-2xl font-semibold ">{node.id}</span>
        <span className="text-sm">{node.name}</span></h2>

      <div className="card-actions justify-end">
        {node.tags?.map((value, index, array) => <div className="badge badge-outline badge-sm">{value}</div>)}
      </div>
    </div>
  </div>
  </Link>;
}


/**
 * The GraphQL query
 * @typedef {{
 *  allDirectory: {
 *    nodes: {
 *      name: string
 *    }[]
 *  }
 * }} GraphqlQuery
 */

/**
 * @type {GraphqlQuery}
 */
export const query = graphql`
query {
  # get the folder names in /content
  allDirectory(
    filter: {dir: {regex: "/\\\/content/"}}
  ) {
    nodes {
      name
    }
  }
}
`