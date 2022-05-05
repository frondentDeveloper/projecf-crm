import React from 'react';
import {Routes, Route, Link} from "react-router-dom"
import Vrachebniy2Sect from "../seconComponents/Sklad2/Vrachebniy2Section/vrachebniy2Sect"
function SecTion(props) {
    return (
        <>
            <Vrachebniy2Sect/>
            <Routes>
                <Route path="/addVracheniy22" element={<Vrachebniy2Sect/>}/>
            </Routes>
        </>
    );
}

export default SecTion;