import Tree from "react-d3-tree";
import {useCenteredTree} from "../helpers/useCenteredTree";
import '../index.css';

const BinaryHeapVis = ({binaryTreeData}) => {
    const [translate, containerRef] = useCenteredTree();
    const containerStyles = {
        width: "100vw",
        height: "100vh"
    };
    return (
        <div style={containerStyles} ref={containerRef}>
            {binaryTreeData !== undefined && <Tree
                data={binaryTreeData}
                translate={translate}
                orientation={"vertical"}
                renderCustomNodeElement={(node) => {
                    return (
                        <foreignObject width={50} height={100} x={-25}>
                            <div style={{
                                border: "1px solid black",
                                backgroundColor: node.nodeDatum.attributes.color,
                                padding: 10,
                                borderRadius: 50
                            }}>
                                <h3 style={{textAlign: "center", color: "#DCF2F1"}}>{node.nodeDatum.name}</h3>
                            </div>
                        </foreignObject>
                    )
                }}
            />}
        </div>
    )
}

export default BinaryHeapVis