import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Contact from './Contact';
import About from './About';
import Home from './Home';
import Login from './Login';
import User from './User';
import Archive from './Archive'
import './index.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from './actions';


const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

const App = () => {
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([])
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);


    const fetchData = async (url) => {
        const response = await fetch(url)
        const data = await response.json();
        return data;
    }

    useEffect(()=> {
        console.log("first")
        fetchData(usersUrl).then((data) => setUsers(data));
        fetchData(albumsUrl).then((data) => setAlbums(data));
        fetchData(photosUrl).then((data) => setPhotos(data));
        
    },[])

    useEffect(() => {
        
        dispatch(setData([users, albums, photos]))
    }, [users, albums, photos])
    
    return (
        <Router>
        <div id="root">
       <Navbar/>
       <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/about" component={About} />
       <Route path="/contact" component={Contact} />
       <Route path="/login" component={Login}/>
       <Route path="/user/:id"  component={User}/>
       <Route path="/archive" component={Archive}/>
       </Switch>
</div>
</Router>

    )
    
}

export default App