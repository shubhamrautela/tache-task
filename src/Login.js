import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { login } from './actions';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const users = useSelector((state) => state.data[0])
    const user = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch();
    console.log("this is users", users)
    return (
        user.isLoggedIn 
        ?  <Redirect push to="/"></Redirect>
        :
         <form>
    
  
    <div class="form_container">
        <div className="username">
        <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" onChange={(e) => setUsername(e.target.value)} required />
      
        </div>
       
        <div className="password">
        <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" onChange={(e) => setPassword(e.target.value)} required />
            
        </div>
        
      <button type="submit" 
      onClick={() => (users.filter((user) => user.username === username).length === 1 && password === '123456')
       ? dispatch(login({isLoggedIn:true, username}))
       : console.log("not running") }>
           Login</button>
      
    </div>
 
  </form> 
    )
}

export default Login