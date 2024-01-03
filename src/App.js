import './index.css';
import RedBlackTreeVis from "./RedBlackTreeVis";
import RedBlackTree from "./structures/RedBlackTree";
import {useEffect, useState} from "react";
import {Structures} from "./models/Structures";
import RedBlackTreeHistory from "./helpers/RedBlackTreeHistory";

export default function App() {
    const [value, setValue] = useState(0)
    const [data, setData] = useState()
    const [structure, setStructure] = useState(Structures.RedBlackTree)
    const [rbtStyle, setRbtStyle] = useState(" bg-secondary text-background text-white px-10")
    const [btStyle, setBtStyle] = useState(" bg-tertiary text-background text-white px-10")

    useEffect(() => {
        switch (structure) {
            case Structures.RedBlackTree:
                setRbtStyle(" bg-secondary text-background text-white px-10")
                setBtStyle("bg-tertiary text-background text-white px-10")
                break
            case Structures.BTree:
                setRbtStyle(" bg-tertiary text-background text-white px-10")
                setBtStyle(" bg-secondary text-background text-white px-10")
                break
        }
    }, [structure]);

    return (
        <div className={"bg-background"}>
            <div className={"bg-tertiary"}
                 style={{width: "100%", paddingLeft: 10, alignItems: "center", position: "fixed"}}>
                <div className={"flex flex-row"}>
                    <h1 className={"text-2xl text-background px-10 p-4"}>
                        Structure Visualizer
                    </h1>
                    <button
                        type="button"
                        className={rbtStyle}
                        onClick={() => setStructure(Structures.RedBlackTree)}
                    >Red Black Tree
                    </button>
                    <button
                        type="button"
                        className={btStyle}
                        onClick={() => setStructure(Structures.BTree)}
                    >B Tree
                    </button>
                </div>
            </div>
            <div style={{height: 60}}>
                <p></p>
            </div>
            <form className="flex flex-row gap-10 p-4">
                <input
                    type="text"
                    id="textInput"
                    name="textInput"
                    placeholder="Node value..."
                    className="placeholder:text-background text-background p-2 bg-secondary rounded-lg"
                    value={(value === 0 || isNaN(value)) ? "" : value}
                    onChange={(text) => setValue(parseInt(
                        text.currentTarget.value.toString()
                    ))}
                />
                <div className="flex flex-row gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (value) {
                                switch (structure) {
                                    case Structures.RedBlackTree:
                                        RedBlackTree.RBInsert(value)
                                        RedBlackTreeHistory.InsertBreak()
                                        setData(RedBlackTree.transformTree())
                                        setValue(0)
                                        break;
                                }
                            }
                        }}
                        className={"p-2 text-background bg-add rounded-lg text-white px-10"}
                    >Add
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (value) {
                                switch (structure) {
                                    case Structures.RedBlackTree:
                                        RedBlackTreeHistory.DeletedNode(value)
                                        RedBlackTree.RBDelete(value)
                                        RedBlackTreeHistory.InsertBreak()
                                        setData(RedBlackTree.transformTree())
                                        setValue(0)
                                }
                            }
                        }}
                        className={"p-2 text-background bg-remove rounded-lg text-white px-10"}
                    >Remove
                    </button>
                </div>
            </form>
            {structure === Structures.RedBlackTree &&
                <div className={"flex flex-row"}>
                    <div style={{width: window.innerWidth*0.2, height:window.innerHeight*0.8, padding: 10, marginLeft: 14, overflowY:"scroll", borderWidth:1, borderColor:"#365486"}}>
                        <h1 className={"text-2xl text-secondary"} style={{marginBottom: 10}}>History</h1>
                        {
                            RedBlackTreeHistory.getHistory().map(sentence => {
                                return sentence !== "-" ? (
                                    <p className={"py-0.5 text-secondary"}>{sentence}</p>
                                ) : (
                                    <p className={"py-0.5 text-secondary"}>---</p>
                                )
                            })
                        }
                    </div>
                    <RedBlackTreeVis treeData={data}/>
                </div>
            }
        </div>
    )
}