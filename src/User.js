import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>;

const User = ({match}) => {
    const logged = useSelector((state) => state.isLoggedIn)
    const users = useSelector((state) => state.data[0])
    const [userData, setUserData] = useState({})
    const user = match.params.id
    const albums = useSelector((state) => state.data[1])
    const photos = useSelector((state) => state.data[2])
    
    const coord = userData && userData.address && [+userData.address.geo.lat, +userData.address.geo.lng]
    const defaultProps = {
        center: {
          lat: coord && coord[0],
          lng: coord && coord[1]
        },
        zoom: 11
      };



    const finalAlbum= []
    useEffect(() => {
        const usersData = users && users.filter((person)=> user === person.username)
        setUserData(users && usersData[0])
    },[users])

    
        const userAlbum = albums && albums.filter((album) => album.userId === userData.id)
        const userAlbums = userAlbum && userAlbum.slice(0,5)
        
        userAlbums && userAlbums.forEach((album) => {
            let photoArray = []
            let count = 0;
            photos.forEach((photo) => {
                if(count<2){
                    if(photo.albumId === album.id){
                        photoArray.push(photo)
                        count++;
                    }
                }

            })
            finalAlbum.push({album,photoArray})
        })


    return (
        userData ?
        <div className="userProfile">
            <div className="userProfileHeader">
                <div className="userDetail">
                    <div>{userData && userData.name}</div>
                    <div className="userAddress">{userData && userData.address && userData.address.city}</div>
                </div>
                {
logged.isLoggedIn ?
                <div className="userContactDetail">
                  <div className="userEmail">{userData && userData.email}</div>
                  <div className="userPhone">{userData && userData.phone}</div>
                </div>
                  : <div><Link to="/login">See contact</Link></div>
                
                }
                
  
            </div>
            <div id="mapid">
            <div style={{ height: '250px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
           lat={ coord && coord[0]}
           lng={coord && coord[1]}
          text="."
        />
      </GoogleMapReact>
    </div>

            </div>
            
            
            <div className="albums">
               {
                   finalAlbum ? 
                   finalAlbum.map(({album, photoArray}) => {
                   
                       return(

                    <div className="album">
                        <div>{album.title}</div>
                        <div className="photos">
                                       <img src={photoArray[0].url} className="userPhoto" />
                                       <img src={photoArray[1].url} className="userPhoto" />
                        </div>
                    </div>
                       )
               })
               : <div>no album</div>
                   }
            </div>
        </div>
        : <div className="userProfile">No such user found</div>
    )
}

export default User