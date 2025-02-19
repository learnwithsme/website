import * as React from "react";
import { ReactFlow, Controls, Background, Panel, useNodesState, useEdgesState, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Link, graphql } from "gatsby";

import _subjects from "/content/subjects.json";
import Navbar from "../components/navbar";
import { SubjectChip } from "../templates/acads_subject"
import "/src/styles/flowchart.css"
const subjects = structuredClone(_subjects); //deep copy

const layerSpacing = 100;
const nodeSpacing = 10;
const nodeWidth = 75;
const defaultIdNumber = "122";

/**
 * 
 * @param {{
*   data: GraphqlQuery
* }}  
*/
export default function IndexPage({
    data,
}) {


    /** Subjects that are in the `/content/acads` folder 
    */
    const subjectsThatExist = data.allDirectory.nodes.map((value) => value.name);

    // state variables

    const [nodes, setNodes, onNodesChange] = useNodesState(subjects.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(subjects.links);

    const [selectedNode, setSelectedNode] = React.useState(null);

    const [selectedIdNumber, setSelectedIdNumber] = React.useState(defaultIdNumber);


    for (var i of subjects.links) {

        i.id = i.source + i.target

        i.requisite ??= `${i.type}`; //saving the subject requisite "type" into a variable
        i.type = "smoothstep"; //replacing the "type" field because react-flow has a different meaning to that field (the type of edge)

        i.animated = i.requisite == "soft"

        index++;
    }

    var index = 0;

    var terms = new Map(),
        // keep track the id numbers registered on the JSON file in this set
        idNumbers = new Set();

    for (var i of subjects.nodes) {

        if (!terms.has(i.term?.[selectedIdNumber] ?? 0)) {
            terms.set(i.term?.[selectedIdNumber] ?? 0, []);
        }
        index = terms.get(i.term?.[selectedIdNumber] ?? 0).length;

        i.width = nodeWidth

        i.position = {
            x: index * (nodeSpacing + nodeWidth),
            y: (i.term?.[selectedIdNumber] ?? 0) * layerSpacing,
        }

        i.data = {
            label: i.id
        }

        terms.get(i.term?.[selectedIdNumber] ?? 0).push(i)
        // add the ID number to the set of ID numbers
        if (i.term != null) Object.keys(i.term).forEach((id) => idNumbers.add(id))

    }

    var connectedEdges = null, connectedNodes = null;

    if (selectedNode != null) {

        connectedEdges = subjects.links.filter(
            (edge) => edge.source === selectedNode.id || edge.target === selectedNode.id
        );

        connectedNodes = subjects.nodes.filter(
            (node) => connectedEdges.some((edge) => node.id === edge.source || node.id === edge.target)
        );

    }

    React.useEffect(() => {

        // reset if null
        if (selectedNode == null) {
            setNodes((nodes) => subjects.nodes);
            setEdges((links) => subjects.links);
            return;
        }


        setNodes((prevNodes) => {

            return prevNodes.map((node, index, array) => {

                let output = {
                    ...node,
                    className: '',
                    style: {

                    }
                }


                let isConnected = connectedNodes.some((value) => node.id === value.id)

                if (node.id === selectedNode.id) {

                    output.className = 'ring-4'


                } else if (isConnected) {

                    let edge = connectedEdges.find((edge) => (edge.source == node.id) || (edge.target == node.id))


                    switch (edge.requisite) {
                        case 'hard':
                            output.className = 'bg-warning'
                            break;
                        case 'soft':
                            output.className = 'bg-success'
                            break;
                        case 'co':
                            output.className = 'bg-info'
                            break;

                    }

                    output.style = {

                    }


                    // output.style = {
                    //     backgroundColor: (()=>{
                    //         switch (edge.requisite){
                    //             case 'hard': return 'red';
                    //             case 'soft': return 'cyan';
                    //             case 'co': return 'gray';

                    //         }
                    //     })(),
                    // }

                } else {
                    output.style = {
                        opacity: 0.2,
                    }

                }

                return output;

            })

        });


        setEdges((prevEdges) => {

            return prevEdges.map((edge, index, array) => {

                let output = {
                    ...edge,
                    type: "smoothstep"
                }


                let isConnected = connectedEdges.some((value) => (edge.source === value.source) && (edge.target === value.target))

                if (isConnected) {
                    output.style = {

                    }
                    output.type = "simplebezier"
                    output.markerEnd = {
                        type: MarkerType.Arrow,
                        width: 20,
                        height: 20,
                    }
                } else {

                    output.style = {
                        opacity: 0.1,
                    }
                }



                return output;


            });

        })




    }, [setSelectedIdNumber, selectedIdNumber, selectedNode, setSelectedNode,])


    return <Navbar
        enableDivider={true}
        enableNavbar={false}
        enableFooter={false}>

        <div style={{ height: "100vh", width: "100vw" }}>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesConnectable={false}
                nodesDraggable={false}
                edgesFocusable={false}
                edgesReconnectable={false}
                onNodeClick={(event, node) => {
                    setSelectedNode((_) => {

                        if (selectedNode == null || selectedNode.id != node.id) {
                            return node;
                        } else {
                            return null;
                        }

                    });
                }}
                style={{
                    color: "black"
                }}
            >
                <Background />
                <Controls />
                <Panel position="top-left">
                    <div className="z-10">

                        <Link to="/#list">
                            <button className="btn btn-primary">
                                <span className="material-symbols-outlined">
                                    arrow_back
                                </span><span className="hidden md:inline">Back to courses</span>
                            </button>
                        </Link><br />
                        <select className="select select-bordered  text-white bg-base-300 m-0 mt-4" onChange={(e) => {
                            setSelectedNode((_) => null) //deselect currently selected
                            setSelectedIdNumber((_) => e.target.value);
                        }}> {
                                /* programmatically add the options from the idNumbers set */
                                [...idNumbers].map((val, index, set) => <option value={`${val}`} selected={val === selectedIdNumber}>ID {val}</option>)
                            }
                        </select>
                    </div>
                </Panel>
                <Panel position="top-right" style={{
                    color: "white"
                }}>

                    <div className="z-0 absolute top-32 sm:top-0 right-0 card max-sm:card-compact w-96 bg-base-200 shadow-xl opacity-95">
                        <div className="card-body">

                            {selectedNode === null ? <span>Select a subject to learn more.</span> : <InfoPanel 
                            selectedNode={selectedNode} 
                            connectedEdges={connectedEdges}
                            subjectsThatExist={subjectsThatExist}
                            selectedIdNumber={selectedIdNumber}
                            />
                            }
                        </div>
                    </div>


                </Panel>

                <Panel position="bottom-center" className="text-center text-slate-400 text-xs">
                    Created by SME DLSU Academics Subcommittee.<br />Content may not be accurate and should only be used as a visualization.

                </Panel>

            </ReactFlow>


        </div>

    </Navbar>




}


export const Head = () => <>
    <title>Flowchart | Learn With SME</title>

    <meta name='og:title' content='Flowchart | Learn With SME' />
    <meta name='og:type' content='website' />

</>

/**
 * The info panel at the top-right, when a subject has been selected.
 * 
 */
function InfoPanel({ selectedNode, connectedEdges, subjectsThatExist, selectedIdNumber }) {
    return <>

        <h2 className="card-title">
            <span className="text-3xl font-bold">{selectedNode.id}</span>
            <br />
            <span className="text-sm">{selectedNode.name}</span>
        </h2>


        <div className="text-sm font-mono ">
            <div>
                Term {selectedNode.term?.[selectedIdNumber] ?? "N/A"}
            </div>
            <div>
                Requires: {connectedEdges.some((edge) => selectedNode.id == edge.target) ? <span>
                    {connectedEdges.filter((edge) => selectedNode.id == edge.target).map((value, index, array) => <SubjectChip
                        id={value.source}
                        //title={}
                        hasLink={false}
                        type={value.requisite}
                    ></SubjectChip>)}</span> : <span className="italic"> none</span>
                }

            </div>

            <div>
                Unlocks: {connectedEdges.some((edge) => selectedNode.id == edge.source) ? <span>
                    {connectedEdges.filter((edge) => selectedNode.id == edge.source).map((value, index, array) => <SubjectChip
                        id={value.target}
                        //title={}
                        hasLink={false}
                        type={value.requisite}
                    ></SubjectChip>)}</span> : <span className="italic"> none</span>
                }

            </div>
        </div>



        <div className="">
            {subjectsThatExist.includes(selectedNode.id) ?
                <Link to={`/${selectedNode.id}`}><button className="btn btn-neutral">Go to subject page</button></Link> : <></>}
        </div>

    </>

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