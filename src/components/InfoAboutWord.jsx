import React from 'react';
import { NavLink } from 'react-router-dom';
const InfoAboutWord = (props) => {
    console.log(props.dataWord);
    return (
        <>
            <h1>
                <span style={{ color: "purple" }}>
                    Word :
                </span>
                <span style={{ textTransform: "capitalize", marginLeft: "1rem" }}>
                    {props.dataWord.word}
                </span>
            </h1>
            <hr style={{ margin: "1rem" }}></hr>
            <div className="infoSection">
                {/* nevigate two meaning and phonetics */}
                <NavLink className="navlinkCustom" to={`/phonetics/${props.lg}/${props.dataWord.word}`}>
                    <h5>phonetics : {props.dataWord.phonetics.length}</h5>
                </NavLink>
                <NavLink className="navlinkCustom" to={`/meanings/${props.lg}/${props.dataWord.word}`}>
                    <h5>Meanings : {props.dataWord.meanings.length}</h5>
                </NavLink>
            </div>
        </>
    );
}

export default InfoAboutWord;
