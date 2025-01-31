import * as React from "react";
import { Link, StaticQueryDocument, graphql } from "gatsby";
import { AnimatedBackground } from 'animated-backgrounds';

import Navbar from "../components/navbar";
import { Content } from "../components/content";
import * as utils from "../utils"
import { LogoSmall } from "../components/logo";
import { FormContact } from "../components/formContact";

import _subjects from "/content/subjects.json";
const subjects = structuredClone(_subjects); //deep copy


/**
 * The main page of the site (once logged in)

 * 
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


  const [navbarOpacity, setNavbarOpacity] = React.useState(0);
  const navbarRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {

      if (navbarRef.current == null) return;

      const scrollTop = window.scrollY;
      const navbarHeight = navbarRef.current.offsetHeight;
      const threshold = navbarHeight; // Adjust threshold as needed

      const opacity = Math.min(1, scrollTop / threshold);
      setNavbarOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col ">



      <Navbar leading={
        <>



        </>

      }
        trailing={<>

          <a className="btn btn-ghost " href="#updates">
            <span class="material-symbols-outlined">
              event
            </span>
            <span className="hidden md:inline">Updates & events</span>
          </a>
          <a className="btn btn-ghost " href="#list">
            <span class="material-symbols-outlined">
              school
            </span>
            <span className="hidden md:inline">Academic database</span>
          </a>
          <a className="btn btn-ghost " href="#contact"><span class="material-symbols-outlined">
            mail
          </span>
            <span className="hidden md:inline">Contact us</span>
          </a>
        </>/*
          <input type="text"
            placeholder="Search course"
            className="input input-bordered w-full max-w-xs" />
    */ }
        styleNavbarBgOpacity={navbarOpacity}
        isFixed={true}>

        <div className="hero min-h-screen"
          ref={navbarRef}>

          <AnimatedBackground animationName="particleNetwork" />
          <div className=" bg-gradient-to-b from-transparent to-base-100"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">


              <LogoSmall
                className="block m-auto"
                width="200"
                height="200"
              />

              <h1 className="mb-5 text-6xl font-bold font-['Futura_Std',sans-serif] text-base-content">Learn With <span className="text-[#d6d869]">SME</span></h1>
              <p className="mb-5 text-base-content ">Learn more and explore a world full of knowledge and ideas!</p>

            </div>
          </div>
        </div>


        <div className="bg-gradient-to-b from-transparent to-base-100 h-[15rem]"></div>
        <div className="bg-gradient-to-tr from-[#244875] via-[#192d47] to-[#244875]">

          <div className="bg-gradient-to-b from-base-100 to-transparent h-32"></div>

          <h2 className="text-3xl font-[Poppins] font-medium  text-center pt-10" id="updates">Updates and Events</h2>

          <Content className="p-4 xl:p-0 text-center">

            See our official Facebook page for news about the organization and our events!
            <br />
          </Content>



          <div className="flex justify-center py-4">
            <a href="https://www.facebook.com/SmeDlsuChapter" target="_blank">
              <button className="btn btn-primary">Open SME DLSU Facebook Page ↗</button>

            </a>
          </div>


          <h2 className="text-3xl font-[Poppins] font-medium   text-center pt-10" id="list">Explore our Academic Database</h2>

          <Content className="p-4 xl:p-0 text-center mb-10">

            See our in-house resources and review materials for the various different subjects under the Manufacturing Engineering program!
          </Content>

          <div className="flex justify-center mb-16">
            <div className="card bg-base-100 image-full w-96 shadow-xl">
              <figure>
                <img
                  src="https://unsplash.com/photos/HsTnjCVQ798/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Zmxvd2NoYXJ0fGVufDB8fHx8MTczODI1NTE3M3ww&force=true&w=640"
                  alt="flowchart" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Flowchart</h2>
                <p>View and track your progress under MEM!</p>
                <div className="card-actions justify-end">
                  <Link to="/flowchart">
                    <button className="btn btn-primary">Open flowchart view</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-28" style={{ /*backgroundImage: "linear-gradient(45deg, rgba(12,22,34,1) 0%, rgba(35,78,132,1) 100%)" */ }}>

            <ListView
              subjectsThatExist={subjectsThatExist} />
          </div>



          <h2 className="text-3xl font-[Poppins] font-medium text-center" id="contact">Contact us</h2>

          <Content className="p-4 xl:p-0">
            The communications form below is where you can give feedback about this site. Additionally, you can also request additional resources (like review materials and PowerPoints).

            <FormContact />

          </Content>

          <div className="bg-gradient-to-t from-base-100 to-transparent h-32"></div>

        </div>
        <div className="bg-gradient-to-t from-transparent to-base-100 h-[15rem]"></div>

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

  const [isShowMore, setIsShowMore] = React.useState(false);

  // the array containing the subjects to list out
  var subjectsToDisplay = subjects.nodes
    .filter((value, index, array) => {

      // if "show more", filter out the folders that doesn't exist
      if (isShowMore) {
        return subjectsThatExist.includes(value.id)
      } else {
        // if not show more, filter out folders that doesn't exist AND the subjects with category "engg"
        return subjectsThatExist.includes(value.id) && value.category != "engg"
      }

    })

  return (

    <Content>
      <div className="flex flex-row flex-wrap my-7 gap-7 place-content-center ">

        {
          // map out the subjects array to the React component
          subjectsToDisplay.map((value, index, array) => <ListCard
            node={value}
          />)
        }
      </div>
      <div className="flex place-content-center">
        <button className="btn btn-link" onClick={() => { setIsShowMore(!isShowMore) }}>{isShowMore ? "Show less" : "Show more"}</button>
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
  return <Link to={`/${node.id}`}><div className={`btn btn-neutral card-compact w-96 shadow-xl rounded-lg h-fit p-0`}>
    <div className="card-body">
      <h2 className="card-title font-['Poppins',sans-serif]">

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