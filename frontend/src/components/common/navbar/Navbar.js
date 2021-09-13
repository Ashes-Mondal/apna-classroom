import React from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import logo from '../../../images/logo/logo.png'
import { handleLogout } from '../../../axios/handleSession'

const links = [
    {
        title: 'Results',
        link: '/results'
    },
    {
        title: 'ToDos',
        link: '/toDos'
    },

]
const Navbar = () => {
    const history = useHistory();
    const LogoutHandler = async () => {
        try {
            await handleLogout();
            history.push('/');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.error);
        }
    }
    return (
        <div className="navbar-container">
            <div className='logo'>
                <span><img src={logo} alt='logo' onClick={() => history.push('/')} /></span>
                <span id='site-name' onClick={() => history.push('/')}>Apna<strong style={{ color: "black" }}>Classroom</strong></span>
            </div>
            <div className='navbar-links'>
                {
                    links.map((navLink) =>
                        <NavLink
                            className="navlink"
                            activeClassName="active-navlink"
                            to={navLink.link}>
                            {navLink.title}
                        </NavLink>)
                }
                <span onClick={LogoutHandler}>Logout</span>
            </div>
        </div>
    )
}

export default Navbar
