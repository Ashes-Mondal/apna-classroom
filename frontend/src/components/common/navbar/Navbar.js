import React, { useMemo } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import logo from "../../../images/logo/logo.png";
import { handleLogout } from "../../../axios/handleSession";
import { useSelector } from "react-redux";

const Navbar = () => {
    const history = useHistory();
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const links = useMemo(() => {
        if (enrolledClassrooms.length) {
            return [
                {
                    title: "Results",
                    link: `class/${enrolledClassrooms[0]._id}/results`,
                },
                {
                    title: "ToDos",
                    link: `/class/${enrolledClassrooms[0]._id}/todos`,
                },
            ];
        } else return [];
    }, [enrolledClassrooms]);
    const checkResultActive = (match, location) => {
        // //some additional logic to verify you are in the home URI
        if (!location) return false;
        const { pathname } = location;
        return pathname.includes("/results");
    };
    const LogoutHandler = async () => {
        try {
            await handleLogout();
            history.push("/");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.error);
        }
    };
    return (
        <div className="navbar-container">
            <div className="logo">
                <span>
                    <img src={logo} alt="logo" onClick={() => history.push("/")} />
                </span>
                <span id="site-name" onClick={() => history.push("/")}>
                    Apna<strong style={{ color: "black" }}>Classroom</strong>
                </span>
            </div>
            <div className="navbar-links">
                {links.map((navLink, key) => {
                    if (navLink.title === "Results") {
                        return (
                            <NavLink key={key} className="navlink" activeClassName="active-navlink" isActive={checkResultActive} to={navLink.link}>
                                {navLink.title}
                            </NavLink>
                        );
                    } else {
                        return (
                            <NavLink key={key} className="navlink" activeClassName="active-navlink" to={navLink.link}>
                                {navLink.title}
                            </NavLink>
                        );
                    }
                })}
                <span onClick={LogoutHandler}>Logout</span>
            </div>
        </div>
    );
};

export default Navbar;
