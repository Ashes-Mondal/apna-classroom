import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import logo from "../../../images/logo/logo.png";
import { handleLogout } from "../../../axios/handleSession";
import { useDispatch, useSelector } from "react-redux";
import { unsetUserAuth } from "../../../redux/actions/userAuthentication";

const getLinks = (enrolledClassrooms) => {
    if (enrolledClassrooms.length === 0) return [];
    return [
        {
            title: "Results",
            link: `/class/${enrolledClassrooms[0]._id}/results`,
        },
        {
            title: "ToDos",
            link: `/class/${enrolledClassrooms[0]._id}/todos`,
        },
    ];
};

const Navbar = () => {
    const history = useHistory();
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const checkResultActive = (match, location) => {
        // //some additional logic to verify you are in the home URI
        if (!location) return false;
        const { pathname } = location;
        return pathname.includes("/results");
    };
    const checkTodosActive = (match, location) => {
        // //some additional logic to verify you are in the home URI
        if (!location) return false;
        const { pathname } = location;
        return pathname.includes("/todos");
    };

    const LogoutHandler = async () => {
        try {
            await handleLogout();
            dispatch(unsetUserAuth());
            history.push("/");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.error);
        }
    };
    return (
        <div className="navbar-container">
            <a className="logo" href={"/"}>
                <span>
                    <img src={logo} alt="logo" />
                </span>
                <span id="site-name">
                    Apna<strong style={{ color: "black" }}>Classroom</strong>
                </span>
            </a>
            <div className="navbar-links">
                {user.role === "student"
                    ? getLinks(enrolledClassrooms).map((navLink, key) => {
                          if (navLink.title === "Results") {
                              return (
                                  <NavLink key={key} className="navlink" activeClassName="active-navlink" isActive={checkResultActive} to={navLink.link} onClick={() => history.push(navLink.link)}>
                                      {navLink.title}
                                  </NavLink>
                              );
                          } else if (navLink.title === "ToDos") {
                              return (
                                  <NavLink key={key} className="navlink" activeClassName="active-navlink" isActive={checkTodosActive} to={navLink.link}>
                                      {navLink.title}
                                  </NavLink>
                              );
                          } else {
                              return <></>;
                          }
                      })
                    : null}
                <span onClick={LogoutHandler}>Logout</span>
            </div>
        </div>
    );
};

export default Navbar;
