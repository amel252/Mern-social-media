import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <Link to="/">
                        <div className="logo-inner">
                            <img src="/img/icon.png" alt="icon" />
                            <h3>Raccoont</h3>
                        </div>
                    </Link>
                </div>
                {/* si uid est vrai sinon on passe l'autre */}
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <Link to={"/profil"}>
                                <h5>Bienvenue 'valeur dynamique</h5>
                            </Link>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <Link to={"/profil"}>
                        <img src="/img/icons/login.svg" alt="login" />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
