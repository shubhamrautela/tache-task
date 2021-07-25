import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {logout} from './actions'

const Navbar = () => {
    const user = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch();
    const navStyle={
        color: 'black',
    }
    return (

        <nav>
            <h3>Logo</h3>
        <ul className="nav-links">
            
            <Link style={navStyle} to="/"  >Home</Link>
            <Link style={navStyle} to="/About">About</Link>
            <Link style={navStyle} to="/Contact">Contact</Link>
            <Link style={navStyle} to="/Archive">Archive</Link>

            
        </ul>
        <div>
            {
            
               user.isLoggedIn ? <div className="user"><div className="userName">{user.username}</div><Link style={navStyle} to="/Login" onClick={() => dispatch(logout())}>Logout</Link></div>
               : <Link style={navStyle} to="/Login">Login</Link> 
            }
            
            
        </div>

               </nav>
    );
}

export default Navbar