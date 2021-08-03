import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading"

const Meanings = () => {
    let [isLoading, setLoading] = useState(false);

    let params = useParams();
    let [meanData, setMeanData] = useState([]);
    useEffect(() => {
        setLoading(true);
        let url = `https://api.dictionaryapi.dev/api/v2/entries/${params.lg}/${params.word}`
        axios.get(url)
            .then((data) => {
                setMeanData(data.data[0].meanings);
                // console.log(data.data[0].meanings);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    return (
        <>
            <div className="headingBox">
                <h1 className="headingWord">Meanings</h1>
            </div>
            <div className="meaningMain">
                {
                    isLoading ?
                        <>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ReactLoading type={"bubbles"} color={"black"} height={"40%"} width={"40%"}></ReactLoading>
                            </div>
                        </>
                        :
                        meanData != null ? meanData.map((elem, i) => {
                            return (
                                <>
                                    <div className="meaningSingle">
                                        <h5 className="headMeaningText" >Part Of Speech : {elem.partOfSpeech}</h5>
                                        <div >
                                            {
                                                elem.definitions.map((innerElem, i) => {
                                                    return (
                                                        <>
                                                            <h6 className="textMeaning">definition : {innerElem.definition}</h6>
                                                            <h6 className="textMeaning">Example : {innerElem.example}</h6>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }) : null

                }
            </div>
        </>
    );
}

export default Meanings;