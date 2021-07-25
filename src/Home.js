import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {AiOutlineHeart, AiFillHeart, AiOutlineComment} from 'react-icons/ai';
import {MdPerson, MdPersonAdd, MdFavorite, MdFavoriteBorder, MdBookmark, MdBookmarkBorder} from 'react-icons/md';
import {GoComment} from 'react-icons/go';
import {Link} from 'react-router-dom';


const Home = (props) => {
    
    const data = useSelector(state => state.data)
    const users = data[0] && data[0].sort(function(user1, user2) {
        var nameA = user1.name.toUpperCase(); // ignore upper and lowercase
        var nameB = user2.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      })
    const albums = data[1]
    const photos = data[2]

    const posts = users && users.map((user) => {
        const id = user.id
        const userAlbum = albums && albums.filter((album) => album.userId === id)
        const [userAlbum1, userAlbum2] = [...userAlbum]
        const userPhotos1 = photos.filter((photo) => photo.albumId === userAlbum1.id)
        const userPhotos2 = photos.filter((photo) => photo.albumId === userAlbum2.id)
        const finalPhotos = [...userPhotos1.slice(0,2), ...userPhotos2.slice(0,2)]
        return {user, userAlbum1, userAlbum2, finalPhotos}
    })

      

    return (
        <div className="feed">
            {
                
            posts && posts.map((post) => {
                const user = post.user
                const photos = post.finalPhotos

                return(
                photos && photos.map((photo)=> {
                    return (
                    
                <div className="post">
                    <div className="header">

                        <div className="info">
                            <MdPerson className="dp"/>
                            <div className="personal">
                                <div><Link to={`/user/${user.username}`}>{user.name}</Link></div>
                                <div className="user_address">{user.address.city}</div>
                                </div>
                                
    
                        </div>

                        <div className="extra">
                            <MdPersonAdd className="dp"/>
                        </div>
                    </div>
    
                    <div className="photo">
                         <img src={photo.url} className="post_image" alt="data_image" />  
                    </div>
                    <div className="options">
                        <div className="reaction">
                            <MdFavoriteBorder/>
                            <AiOutlineComment/>
                        </div>
                        <div className="option">
                                <MdBookmarkBorder/>
                        </div>
                    </div>
                </div>
                    )
    
                })

            )
                })
                
}
        </div>
    );
}

export default Home