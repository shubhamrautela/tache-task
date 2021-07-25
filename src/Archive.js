import React, {useState} from 'react'
import { MdSearch } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {search} from './actions'


const Archive = () => {
    const data = useSelector((state) => state.data)
    const [users, albums, photos] = data && [...data]
    const [searchInput, setSearchInput] = useState("")
    const [selectedValue, setSelectedValue] = useState("users")
    const [searchResults, setSearchResults] = useState([]);
    const logged = useSelector((state) => state.isLoggedIn)

    const dispatch = useDispatch()
    const searchCount = useSelector((state) => state.searchTries)
    const showMessage = () => {
        const message = 
        <div>You have run out of search tries! Please <Link to="/login">Log in</Link> to search further.</div>

        setSearchResults([message])
    }
    const searchUsers = (searchInput) => {
        
        const results = users && users.filter((item) => item.username.search(searchInput) >= 0 )
        const result = results.map((res) => {
            return (
                <div><Link to={`/user/${res.username}`}>{res.name}</Link></div>
            )
        })
        setSearchResults(result)
    }

    const searchAlbums = (searchInput) => {
        const results = albums && albums.filter((item) => item.title.search(searchInput) >= 0 )
        const result = results.map((res) => {
            let count =0;
            return (
                <div>
                    <div>{res.title}</div>
                    <div>
                    {
                        
                    photos && photos.forEach((photo) => {
                        count++;
                        return (
                            photo.albumId === res.id && count< 10 ? <img src={photo.url} alt="search_image"/> : "hello"
                        )

                        
                    })
                    }
                    </div>
                </div>
            )
        })
        setSearchResults(result)
    }

    const searchPhotos = (searchInput) => {
        const results = photos && photos.filter((item) => item.title.search(searchInput) >= 0 )
        let count =0;
        const result = results.map((res) => {
            count++
            return (
                count < 100 ? 
                <div className="results_image">
                    <div >{res.title}</div>
                    <div>
                    <img src={res.url} alt="search_image" width="250px" height="250px"/>
                    </div>
                </div>
                : ""
            )
        })
        setSearchResults(result)
    }

    const User = (user) => {
        return (
            <div className="result_user">
            <Link>{user.name}</Link>
        </div>
        )
        
    }

    return(
        <div className="archive">
            <div className="searchbar">
                <input className="searchField" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}type="text" required></input>
                <select value={selectedValue} onChange={(e)=> setSelectedValue(e.target.value)}>
                    <option value="users">Users</option>
                    <option value="albums">Album</option>
                    <option value="photos">Photos</option>
                </select>
                <MdSearch onClick={() => {
                    if(searchInput)
                    if(!logged.isLoggedIn && searchCount < 5 ){
                        dispatch(search())
                    
                        selectedValue === 'users' 
                    ? searchUsers(searchInput) 
                    : selectedValue === 'albums'
                    ? searchAlbums(searchInput)
                    : searchPhotos(searchInput)
                    }
                    else if(logged.isLoggedIn){
                        selectedValue === 'users' 
                    ? searchUsers(searchInput) 
                    : selectedValue === 'albums'
                    ? searchAlbums(searchInput)
                    : searchPhotos(searchInput)
                    }
                    else if(searchCount >= 5){
                        showMessage();
                    }
                    
                }}/>
            </div>
            <div className="results">
                    {searchResults}
            </div>
        </div>
    )
}

export default Archive