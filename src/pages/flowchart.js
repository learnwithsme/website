import * as React from "react";
import { ReactFlow, Controls, Background, Panel, useNodesState, useEdgesState, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Link, StaticQueryDocument, graphql } from "gatsby";

import _subjects from "/content/subjects.json";
import Navbar from "../components/navbar";
import { SubjectChip } from "../templates/acads_subject"
import "/src/styles/flowchart.css"
const subjects = structuredClone(_subjects); //deep copy

const layerSpacing = 100;
const nodeSpacing = 10;
const nodeWidth = 75;


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



    const [nodes, setNodes, onNodesChange] = useNodesState(subjects.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(subjects.links);

    const [selectedNode, setSelectedNode] = React.useState(null);


    for (var i of subjects.links) {

        i.id = i.source + i.target

        i.requisite ??= `${i.type}`; //saving the subject requisite "type" into a variable
        i.type = "smoothstep"; //replacing the "type" field because react-flow has a different meaning to that field (the type of edge)

        i.animated = i.requisite == "soft"

        index++;
    }

    var currentTerm = 0, index = 0;

    for (var i of subjects.nodes) {

        if ((i.term?.["122"] ?? 0) != currentTerm) {
            currentTerm = (i.term?.["122"] ?? 0)
            index = 0
        } else {
            index++;
        }

        i.width = nodeWidth

        i.position = {
            x: index * (nodeSpacing + nodeWidth),
            y: (i.term?.["122"] ?? 0) * layerSpacing,
        }

        i.data = {
            label: i.id
        }

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




    }, [selectedNode, setSelectedNode])


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
                    <Link to="/">
                        <button className="btn btn-primary">
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span><span className="hidden md:inline">Back to courses</span>
                        </button>
                    </Link>
                </Panel>
                <Panel position="top-right" style={{
                    color: "white"
                }}>

                    <div className="z-10 absolute top-0 right-0 card max-sm:card-compact w-96 bg-base-200 shadow-xl opacity-95">
                        <div className="card-body">

                            {selectedNode === null ? <span>Select a subject to learn more.</span> : <>

                                <h2 className="card-title">
                                    <span className="text-3xl font-bold">{selectedNode.id}</span>
                                    <br />
                                    <span className="text-sm">{selectedNode.name}</span>
                                </h2>


                                <div className="text-sm font-mono ">
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
                        </div>
                    </div>





                </Panel>
            </ReactFlow>


        </div>

    </Navbar>




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