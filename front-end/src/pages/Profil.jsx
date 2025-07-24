import React from "react";
import Log from "../components/Log/";
// import log from "../../img/log.svg";

function Profil() {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signin={false} signup={true} />
                <div className="img-container">
                    <img src="/img/log.svg" alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default Profil;
