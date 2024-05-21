import * as React from "react";
import { Link, graphql } from "gatsby";
import loadable from '@loadable/component'

import Navbar from "../components/navbar";
import { Content } from "../components/content";
import * as utils from "../utils"
import { SubjectChip } from "../templates/acads_subject"
import { LogoSmall } from "../components/logo";
import { FormContact } from "../components/formContact";

import _subjects from "/content/subjects.json"
const subjects = structuredClone(_subjects); //deep copy


/**
 * Main page
 */
export default function IndexPage({
  data
}) {

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


              <LogoSmall
                className="block m-auto"
                width="200"
                height="200"
              />

              <h1 className="mb-5 text-6xl font-bold  font-['Futura_Std',ui-sans-serif,sans-serif] text-base-content">Learn With SME</h1>
              <p className="mb-5 text-base-content ">Learn more and explore a world full of knowledge and ideas!</p>

            </div>
          </div>
        </div>

        <h2 className="text-3xl font-[Poppins] font-medium  bg-gradient-to-b from-base-100 to-transparent text-center pt-10" id="list">Explore our Academic Database</h2>

        <Content className="p-4 xl:p-0">

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
  <title>SME DLSU Academic Hub</title>

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


const ListCard = ({ node }) => <Link to={`/${node.id}`} ><div className={`btn btn-neutral card-compact w-96 shadow-xl rounded-lg h-fit p-0 ${node.status != null ? "ring-4  ring-yellow-400" : ""}`}>
  <div className="card-body">
    <h2 className="card-title">

      {node.status != null ? <div className="badge">{node.status.toUpperCase()}</div> : <></>}


      <span className="text-2xl font-semibold font-[Poppins]">{node.id}</span>
      <span className="text-sm font-[Poppins]">{node.name}</span></h2>

    <div className="card-actions justify-end">
      {
        node.tags?.map((value, index, array) => <div className="badge badge-outline badge-sm">{value}</div>)
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
                  <span>
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
          <input type="checkbox" className="ml-3 toggle toggle-sm" checked={flowchartChangeOnHover} onChange={() => setFlowchartChangeOnHover(!flowchartChangeOnHover)} />
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

//https://github.com/vasturiano/react-force-graph/issues/155
// https://loadable-components.com/docs/api-loadable-component/
const ForceGraph2D = loadable(() => import('/src/components/reactForceGraph'), {
  resolveComponent: (components) => components.ForceGraph2D,
});

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

  //const [highlightNeighbors, setHighlightNeighbors] = React.useState([]);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  /*
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
  */
  return (

    <ForceGraph2D
      graphData={subjects}
      backgroundColor="#1c2f4f"
      // width={width}
      // height={height}

      nodeCanvasObject={(node, ctx, globalScale) => {

        //const neighborisPrev = subjects.links.find((value, index, obj) => value.source === node.id && value.target === hoverNode?.id)

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