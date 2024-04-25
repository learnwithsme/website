import * as React from "react";
import { createRoot } from 'react-dom/client';
import { SizeMe } from 'react-sizeme'
import { Link, useStaticQuery, graphql } from "gatsby";
import loadable from '@loadable/component'

import Navbar from "../components/navbar";
import { Content } from "../components/content";
import * as utils from "../utils"
import { SubjectChip } from "../templates/acads_subject"

import _subjects from "/content/subjects.json"
const subjects = structuredClone(_subjects); //deep copy



export default function IndexPage({
  data
}) {

  const [view, setView] = React.useState("list");


  /** Subjects that are in the `/content/acads` folder 
   * @type {string[]}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="block m-auto" width="200" height="200" viewBox="0 0 2048 2048"><defs>
                <style>
                  {`.cls-1 {fill: #d6d851;} .cls-1, .cls-2 {fill-rule: evenodd;} .cls-2 {fill:#5d8ab4;}`}
                </style>
              </defs>
                <path class="cls-1" d="M752.442,1268.87s-194.065-148.93-225.583-192.15-57.943-66.6-37.6-116.967,85.677-87.771,238.116-121.141,308.372-62.188,363.442-87.722S1185,701,1185,701s-134.99-75.391-206.974-104.669-142.034-58.482-142.034-58.482,179.038,24.589,229.758,37.6S1254,619,1254,619s19-26.082,20.63-97.86S1253.74,400,1253.74,400s-300.479,25.623-405.216,41.773-325.7,72.269-430.279,116.963S133.093,688.619,130,867.853,426.6,1151.91,426.6,1151.91s126.931,50.15,162.921,62.66S752.442,1268.87,752.442,1268.87Z" />
                <path class="cls-2" d="M815.1,1649s-101.953-158.71-66.839-250.64S852.7,1285.58,852.7,1285.58s333.548-114.85,355.088-125.32,157.05-67.86,183.8-121.14,21.29-78.3,0-137.849S1253.74,750.89,1253.74,750.89L1185,701s23.18-14.835,39.5-33.656S1254,619,1254,619s284.2,99.539,346.47,123.535,278.19,119.075,304.95,221.4,18.15,172.33-66.84,246.46-302.47,203.66-597.37,309.12S815.1,1649,815.1,1649Z" />
              </svg>



              <h1 className="mb-5 text-5xl font-bold font-[Poppins] text-base-content">SME DLSU Academic Hub</h1>
              <p className="mb-5 text-base-content ">Learn more and explore a world full of knowledge and ideas!</p>

            </div>
          </div>
        </div>

        <Content className="p-4 xl:p-0">
          <h2 className="text-3xl font-[Poppins] font-medium">Explore our Academic Database</h2>
          The SME Academic Database is streamlined for ease and convenience and is aligned with the syllabus for different subjects. The database also contains a repository of review materials for your own benefit and supplementary lessons to aid your understanding in some concepts in class.
        </Content>

        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={() => document.getElementById('flowchartView').showModal()}>Open flowchart view</button>
        </div>
        <FlowchartDialog
          subjectsThatExist={subjectsThatExist} />

        <div className="pb-28" style={{ /*backgroundImage: "linear-gradient(45deg, rgba(12,22,34,1) 0%, rgba(35,78,132,1) 100%)" */ }}>



          <ListView
            subjectsThatExist={subjectsThatExist} />
        </div>

      </Navbar>




    </div>
  )
}

export const Head = () => <>
  <title>SME DLSU Academic Hub</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&?family=Poppins" />

  <meta name='og:title' content='SME DLSU Academic Hub' />
  <meta name='og:type' content='website' />

</>


function ListView({
  subjectsThatExist
}) {

  return (

    <Content>
      {/*
      <div className="my-7 w-fit m-auto">
        <label className="label cursor-pointer">
          <span className="label-text pr-1">Show all</span>
          <input type="checkbox" className="toggle" />
        </label>
      </div>
  */}
      <div className="flex flex-row flex-wrap my-7 gap-7 place-content-center ">

        {
          subjects.nodes.filter((value, index, array) => subjectsThatExist.includes(value.id)).map((value, index, array) => <ListCard
            node={value}
          />)
        }
      </div>
    </Content>
  )
}


const ListCard = ({ node }) => <Link to={`/${node.id}`} ><div className="btn btn-neutral card-compact w-96 shadow-xl rounded-lg " style={{
  height: "fit-content",
  padding: 0
}}>
  <div className="card-body">
    <h2 className="card-title">{node.id}<span className="text-sm">{node.name}</span></h2>

    <div className="card-actions justify-end">
      {
        node.tags?.map((value, index, array) => <div className="badge badge-outline">{value}</div>)
      }
    </div>
  </div>
</div></Link>


function FlowchartDialog({
  subjectsThatExist
}) {

  const [flowchartRequires, setFlowchartRequires] = React.useState(undefined);
  const [flowchartUnlocks, setFlowchartUnlocks] = React.useState(undefined);
  const [flowchartId, setFlowchartId] = React.useState(undefined);
  const [flowchartName, setFlowchartName] = React.useState(undefined);
  const [flowchartChangeOnHover, setFlowchartChangeOnHover] = React.useState(true);



  const subjectsMap = Object.fromEntries(subjects.nodes.map(i => [i.id, i.name]));



  return <dialog id="flowchartView" className="modal ">
    <div className="modal-box max-w-fit p-0 overflow-hidden">
      <form className="" method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="absolute right-2 top-2 z-20 btn btn-sm btn-circle btn-ghost ">✕</button>
      </form>

      <div className="z-10 absolute top-0 left-0 md:top-3 md:left-3 card max-sm:card-compact w-full md:w-96 bg-base-200 shadow-xl opacity-95">
        <div className="card-body">

          {flowchartId === undefined ? <span>Hover/select a subject to learn more.</span> : <>

            <h2 className="card-title">
              <span className="text-3xl font-bold">{flowchartId}</span>
              <br />
              <span className="text-sm">{flowchartName}</span>
            </h2>


            <div className="text-sm font-mono ">
              <div>
                Requires: {utils.objectIsEmpty(flowchartRequires) ? <span className="italic"> none</span> : <span>
                  {flowchartRequires.map((value, index, array) => <SubjectChip
                    id={value.source.id}
                    title={subjectsMap[value.source.id]}
                    hasLink={false}
                    type={value.type}
                  ></SubjectChip>)}</span>
                }
              </div>
              <div>
                Unlocks: {utils.objectIsEmpty(flowchartUnlocks) ? <span className="italic"> none</span> :
                  <span onClick={() => {

                  }}>
                    {flowchartUnlocks.map((value, index, array) => <SubjectChip
                      id={value.target.id}
                      title={subjectsMap[value.target.id]}
                      hasLink={false}
                      type={value.type}
                    ></SubjectChip>)}
                  </span>}

              </div>
            </div>
            <div className="card-actions justify-end">
              {subjectsThatExist.includes(flowchartId) ?
                <Link to={`/${flowchartId}`}><button className="btn btn-neutral">Go to subject page</button></Link> : <></>}
            </div>
          </>}
        </div>
      </div>

      {/* change on hover switch */}
      <div className="absolute bottom-3 left-3 z-10 form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-xs">Change on hover</span>
          <input type="checkbox" className="ml-3 toggle toggle-sm" checked={flowchartChangeOnHover} onClick={() => setFlowchartChangeOnHover(!flowchartChangeOnHover)} />
        </label>
      </div>

      <FlowchartView
        subjectsThatExist={subjectsThatExist}
        setFlowchartRequires={setFlowchartRequires}
        setFlowchartUnlocks={setFlowchartUnlocks}
        setFlowchartId={setFlowchartId}
        setFlowchartName={setFlowchartName}
        flowchartChangeOnHover={flowchartChangeOnHover}
      />
    </div>

    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
}


const ForceGraph2D = loadable(() => import('/src/components/reactForceGraph'));

function FlowchartView({
  subjectsThatExist,
  setFlowchartRequires,
  setFlowchartUnlocks,
  setFlowchartId,
  setFlowchartName,
  flowchartChangeOnHover
}) {

  const [highlightNodes, setHighlightNodes] = React.useState(new Set());
  const [highlightLinks, setHighlightLinks] = React.useState(new Set());
  const [hoverNode, setHoverNode] = React.useState(null);

  const [highlightNeighbors, setHighlightNeighbors] = React.useState([]);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleLinkHover = link => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };



  return (
    <ForceGraph2D
      graphData={subjects}
      backgroundColor="1c2f4f"
      // width={width}
      // height={height}

      nodeCanvasObject={(node, ctx, globalScale) => {

        const neighborisPrev = subjects.links.find((value, index, obj) => value.source === node.id && value.target === hoverNode?.id)

        const label = node.id;
        const fontSize = 15 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (hoverNode === node) {
          ctx.fillStyle = 'orange';
        } else if (highlightNodes.has(node)) {
          ctx.fillStyle = 'red';
        }
        ctx.fillStyle = hoverNode === node ? 'orange' : 'white';
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      }}
      //linkDirectionalParticleWidth={3}
      linkDirectionalParticles={2}
      linkColor={() => 'rgba(255,255,255,0.2)'}
      linkWidth={link => highlightLinks.has(link) || highlightNodes.has(link.source) || highlightNodes.has(link.target) ? 5 : 1}
      linkCurvature="curvature"
      //linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
      //nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
      d3VelocityDecay={0.3}
      //enableNodeDrag={false}
      //dagMode="radialin"
      onNodeHover={(node) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (node) { //if its an actual node
          highlightNodes.add(node);

          const neighbors = (subjects.links.filter((value, index, array) => value.source === node.id || value.target === node.id));

          neighbors.forEach(neighbor => highlightNodes.add(neighbor));


          //node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
          //node.links.forEach(link => highlightLinks.add(link));

          if (flowchartChangeOnHover) updateFlowchart(node);

        }

        setHoverNode(node || null);
        updateHighlight();


      }}
      //onLinkHover={handleLinkHover}
      onNodeClick={(subjectNode, event) => {

        updateFlowchart(subjectNode);

      }}

    />
  );

  function updateFlowchart(subjectNode) {

    let subjectId = subjectNode.id;

    /** The subject ids wherein this subject is a source */
    const subjectEdgeSource = subjects.links.filter((value, index, array) => value.source.id === subjectId);
    /** The subject ids wherein this subject is a target */
    const subjectEdgeTarget = subjects.links.filter((value, index, array) => value.target.id === subjectId);


    console.log(subjectEdgeSource);
    console.log(subjectEdgeTarget);

    setFlowchartRequires(subjectEdgeTarget);
    setFlowchartUnlocks(subjectEdgeSource);
    setFlowchartId(subjectNode.id);
    setFlowchartName(subjectNode.name)

  }

}



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