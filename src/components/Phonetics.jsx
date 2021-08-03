import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ReactLoading from "react-loading"
import { LibraryMusicTwoTone } from "@material-ui/icons"
const Phonetics = () => {
    // state section
    let [isLoading, setLoading] = useState(false);
    let params = useParams();
    let [phData, setPhData] = useState([]);
    useEffect(() => {
        setLoading(true);
        let url = `https://api.dictionaryapi.dev/api/v2/entries/${params.lg}/${params.word}`
        axios.get(url)
            .then((data) => {
                setLoading(false);
                setPhData(data.data[0].phonetics);
                console.log(data.data[0].phonetics);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    return (
        <>
            <div className="headingBox">
                <h1 className="headingWord">Phonetics</h1>
            </div>
            <div className="phoneticsMain">
                {/* loading effect */}
                {
                    isLoading ?
                        <>
                            <div style={{ "height": "100vh", "width": "100vw" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <ReactLoading type={"spin"} color={"black"} height={"10%"} width={"10%"}></ReactLoading>
                                </div>
                            </div>
                        </> :
                        phData != null && phData.length != 0
                            ?
                            phData.map((elem, i) => {
                                return (
                                    <>
                                        <div className="phoneticSingle">
                                            <h5 className="textPhonetic">Text : {elem.text}</h5>
                                            <a href={elem.audio} target="blank" className="audioLink">
                                                <LibraryMusicTwoTone></LibraryMusicTwoTone>
                                            </a>
                                        </div>
                                    </>
                                )
                            }) :
                            <h1>No data</h1>
                }
            </div>
        </>
    );
}

export default Phonetics;
