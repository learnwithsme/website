import React from "react"
import Navbar from "../components/navbar";

import { Link, graphql } from 'gatsby'
import { MDXProvider } from "@mdx-js/react"

import { Content } from "../components/content";
import { FormContact } from "../components/formContact";

import * as utils from "../utils"

import _subjects from "/content/subjects.json";
const subjects = structuredClone(_subjects); //deep copy

export default function Layout({
  data,
  children,
  pageContext
}) {


  const subjectId = pageContext.subject;

  const subjectsMap = Object.fromEntries(subjects.nodes.map(i => [i.id, i.name]));

  /** Subjects that are in the `/content/acads` folder 
   * @type {string[]}
  */
  const subjectsThatExist = data.allDirectory.nodes.map((value) => value.name);

  /** The node of this subject */
  const subjectNode = subjects.nodes.find((value, index, array) => value.id === subjectId);
  /** The subject ids wherein this subject is a source */
  const subjectEdgeSource = subjects.links.filter((value, index, array) => value.source === subjectId);
  /** The subject ids wherein this subject is a target */
  const subjectEdgeTarget = subjects.links.filter((value, index, array) => value.target === subjectId);

  // sort categories alphabetically
  data.allMdx.nodes.sort((a, b) => a.frontmatter.category?.localeCompare(b.frontmatter.category));

  /**  The list of categories and their resources
   * @type {Object.<string, {
   *  title: string, 
   *  link: string,
   *  status: string?,
   *  interactive: boolean?
   * }[]>} 
   */
  let categories = new Map();
  for (let node of data.allMdx.nodes) {
    let category = node.frontmatter.category;
    let toAdd = {
      title: node.frontmatter.title,
      link: node.fields.slug,
      status: node.frontmatter.status,
      interactive: node.frontmatter.interactive
    }
    if (category in categories) {
      categories[category].push(toAdd);
    } else {
      categories[category] = [toAdd]
    }
  }

  return (
    <MDXProvider components={shortcodes}>

      <dialog id="formContactDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 material-symbols-outlined">close</button>
          </form>
          <h3 className="font-bold text-lg">Contact us about "{subjectId}"</h3>

          <FormContact
            id="formContact"
            onSubmit={(a) => {
              a.preventDefault();

              // get contact form by id
              const form = document.getElementById("formContact");

              //submit then reset
              form.submit();
              form.reset();

              // close the dialog
              document.getElementById("formContactDialog").close();
            }}
          />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <Navbar
        leading={
          <Link to="../#list">
            <button className="btn btn-ghost" ><span className="material-symbols-outlined">
              arrow_back
            </span><span className="hidden md:inline">Back to courses</span>
            </button>
          </Link>}
      >
        <Content className='prose  p-4 xl:p-0'>
          <div className="flex flex-col">
            <div className="flex flex-row">

              <h1 className="grow flex flex-col md:flex-row justify-items-stretch mb-0">
                <div className="text-6xl md:text-8xl ">{subjectId}</div>
                <div className="md:pl-7 text-2xl  md:self-center justify-self-start">{subjectNode.name}</div>
              </h1>


              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 menu-sm shadow bg-base-200 rounded-box w-52">
                  <li><a onClick={() => {
                    document.getElementById('formContactDialog').showModal()
                  }}>Contact us about this page...</a></li>
                </ul>
              </div>

            </div>




            <div className="text-sm md:text-lg font-mono flex flex-col md:flex-row">
              <div>
                Requires:
                {utils.objectIsEmpty(subjectEdgeTarget) ? <span className="italic"> none</span> :
                  subjectEdgeTarget.map((value, index, array) => <SubjectChip
                    id={value.source}
                    title={subjectsMap[value.source]}
                    hasLink={subjectsThatExist.includes(value.source)}
                    type={value.type}
                  ></SubjectChip>)
                }

              </div>
              <div className="">
                <span className="hidden md:inline md:px-3">·</span>Unlocks:
                {
                  utils.objectIsEmpty(subjectEdgeSource) ? <span className="italic"> none</span> :
                    subjectEdgeSource.map((value, index, array) => <SubjectChip
                      id={value.target}
                      title={subjectsMap[value.target]}
                      hasLink={subjectsThatExist.includes(value.target)}
                      type={value.type}
                    ></SubjectChip>)
                }
              </div>


            </div>

          </div>
          {
            // do not display "Resources" header if empty

            utils.objectIsEmpty(categories) ? null : <h2 className="">Resources</h2>
          }


          <div className="flex flex-row flex-wrap my-7 gap-7 place-content-center ">

            {(() => {
              let out = [];
              for (let title in categories) {
                if (title === 'null') continue;
                let lessons = categories[title];


                out.push(<CategoryCard
                  title={title}
                  lessons={lessons}
                >
                </CategoryCard>)
              }
              // put uncategorized stuff at the last as "Additional"
              if ('null' in categories) {
                out.push(<CategoryCard
                  title="Additional"
                  lessons={categories['null']}
                ></CategoryCard>)
              }
              return out;
            })()}

          </div>


          {
            //show "More Information" header dependign of if it has content or not
            data.mdx.excerpt.length > 0 ? <h2 className="">More information</h2> : <></>
          }

          {children}
        </Content>


      </Navbar>
    </MDXProvider>
  )
}

/**
 * Each category card, wherein it has a title and a list of lessons
 * 
 * @param {{lessons: {title: string, link: string, status: string?, interactive: boolean?}[], title: string}} 
 * @returns 
 */
function CategoryCard({
  title,
  lessons,
}) {
  return <div className="card card-compact w-96 bg-base-200 shadow-xl not-prose">
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <ul className="menu w-full  p-0">
        {lessons.map((value, index, array) =>
          <li>
            <Link to={value.link} className="flex flex-row">
              { //status
                value.status != null ?
                  <div className="badge badge-neutral">{value.status.toUpperCase()}</div>
                  : <></>
              }
              <span className="grow">{value.title}</span>

              {
                value.interactive === true ?
                  <span className="tooltip tooltip-bottom" data-tip="This lesson is interactive.">
                    <span className="material-symbols-outlined" >touch_app</span>
                  </span>
                  : <></>
              }

            </Link>
          </li>

        )}
      </ul>
    </div>
  </div>
}

/**
 *  The chip that is used in the "requires" and "unlocks"
 * 
 */
export function SubjectChip({
  id,
  type,
  title,
  hasLink,
  onClick
}) {
  let badgeState = "";
  let tooltip = "";

  title ??= id; //default title is the id

  switch (type) {
    case "hard":
      badgeState = "badge-warning";
      tooltip = "hard pre-requisite"
      break;
    case "soft":
      badgeState = "badge-success";
      tooltip = "soft pre-requesite"
      break;
    case "co":
      badgeState = "badge-info";
      tooltip = "co-requisite"
      break;
  }

  return <utils.ConditionalWrapper
    condition={hasLink}
    wrapper={(children) => <Link to={`/${id}`} >{children}</Link>}
  >
    <div
      className={`tooltip tooltip-bottom font-sans pl-1 ${hasLink ? "cursor-pointer" : "cursor-default"}`}
      data-tip={`${title}\n(${tooltip})`}
      onClick={onClick}
    >
      <div className={`badge badge-outline font-mono ${badgeState}`}>{id} ({type.substring(0, 1).toUpperCase()})</div>
    </div>

  </utils.ConditionalWrapper>

}


export const Head = ({
  data,
  pageContext
}) => {

  const subjectId = pageContext.subject;

  /** The node of this subject */
  const subjectNode = subjects.nodes.find((value, index, array) => value.id === subjectId);

  return <>
    <title>{subjectId} - Learn With SME</title>


    <meta name='og:title' content={`${subjectId} - ${subjectNode.name}`} />
    <meta name='og:type' content="article" />
    <meta name='og:site_name' content="SME DLSU Academic Hub" />
    <meta name="og:description" content={data.mdx.excerpt} />
    <meta name="description" content={data.mdx.excerpt} />

  </>;
}

//export { Layout };


const shortcodes = { Link } // Provide common components here


export const query = graphql`
  query($subject: String!, $id: String!) {
    allMdx(
      filter: {
        fields: {
          # get only the pages for this subject
          customAcadsSubject: {eq: $subject}
          # exclude the index pages
          slug: {regex: "/^(\\\/.......\\\/)./"}, 
        }
      }
    ) {
      nodes {
        frontmatter {
          title
          category
          status
          interactive
        }
        fields {
          slug
        }
      }
    }
    # get the folder names in /content/acads
    allDirectory(
      filter: {dir: {regex: "/\\\/content/"}}
    ) {
      nodes {
        name
      }
    }
    # get excerpt of this subject's index.mdx 
    mdx(id: {eq: $id}){
      excerpt
    }
  }
`