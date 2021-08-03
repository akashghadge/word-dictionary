import React, { useState } from 'react';
import axios from 'axios';
import { Search } from "@material-ui/icons"
import InfoAboutWord from './InfoAboutWord';
// https://api.dictionaryapi.dev/api/v2/entries/<language_code>/<word>
// select box styling material ui
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactLoading from "react-loading"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    buttonStyle: {
        color: "white",
        backgroundColor: "inherit"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Home = () => {
    const classes = useStyles();
    let [word, setWord] = useState("");
    let [lgCode, setLgCode] = useState("en_US");
    let [dataWord, setDataWord] = useState([]);
    let [isdataFound, setDataFound] = useState(false);
    let [isLoading, setLoading] = useState(false);
    function inputChange(e) {
        setWord(e.target.value);
    }
    function inputLg(e) {
        setLgCode(e.target.value);
        console.log(lgCode);
    }
    function onSubmit(e) {
        setLoading(true);
        const url = `https://api.dictionaryapi.dev/api/v2/entries/${lgCode}/${word}`;
        axios.get(url)
            .then((wordData) => {
                setDataWord(wordData.data);
                setLoading(false);
                setDataFound(true);
            })
            .catch((err) => {
                // console.log(err);

                setDataFound(false);
                setLoading(false);
            })
    }
    return (
        <>
            <div className="headingBox">
                <h1 className="headingWord">Word Dictionary</h1>
            </div>
            <div className="mainParent">
                <div className="main">
                    <div className="inputBoxMain">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Language</InputLabel>
                            <Select native
                                value={lgCode}
                                onChange={inputLg}>
                                <option aria-label="None" value="Language" />
                                <option selected value="en_US">English (US)</option>
                                <option value="hi">Hindi</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="ja">Japanese</option>
                                <option value="ru">Russian</option>
                                <option value="en_GB">English (UK)</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="ko">Korean</option>
                            </Select>
                        </FormControl>
                        <input className="inputBoxWord" onChange={inputChange} value={word}></input>
                    </div>
                    <div className="buttonBox">
                        <button className="submitButton" onClick={onSubmit}>
                            <Search className={classes.buttonStyle}></Search>
                        </button>
                    </div>
                    <div className="wordDataDiv" style={{ textAlign: "center", marginTop: "2rem" }}>
                        {
                            isLoading ?
                                <>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <ReactLoading type={"bubbles"} color={"black"} height={"40%"} width={"40%"}></ReactLoading>
                                    </div>
                                </>
                                :
                                isdataFound ?
                                    <InfoAboutWord lg={lgCode} dataWord={dataWord[0]}></InfoAboutWord>
                                    : <h1 className="dataNot">Data Not Found</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
