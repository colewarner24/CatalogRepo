import React, {useState} from 'react';
import AlbumTable from './Tables/AlbumTable';
import ArtistTable from './Tables/ArtistTable';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// Importing default pfp
import defPfp from './default.png'
import {useLocation } from 'react-router-dom';


function Form(props) {  

  const location = useLocation();
  console.log(location.state.user);

  let navigate = useNavigate();
    
    const [user, setUser] = useState({
        bio: "",
        profile: defPfp, // initialize pfp to default
        albums: [],
        artists: [],
        reviews: [],
      });
    const [nameData, setName] = useState({ album: "", artist: "" });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "bio") setUser({ ...user, bio: value });
        else if (name === "username") setUser({ ...user, username: value });
        else if (name === "profile") {
          let img = event.target.files[0];
          setUser({...user, profile: URL.createObjectURL(img)});
        }
        else if (name === "albums") setName({ ...nameData, album: value });
        else if (name === "artists") setName({ ...nameData, artist: value });
      }

      async function getAlbum(album_name) {
        try {
          const response = await axios.get(
            `http://localhost:5000/search/album/${album_name}`
          );
          return response.data;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      async function getArtist(artist_name) {
        try {
          const response = await axios.get(
            `http://localhost:5000/search/artist/${artist_name}`
          );
          return response.data;
        } catch (error) {
          console.log(error);
          return false;
        }
      }


      async function submitAlbum() {
        var albums = user.albums;
        var album = nameData.album;
        const album_response = await getAlbum(album);
        const album_data = album_response.albums.items[0]
        if (album_data !== undefined){
          albums.push(album_data);
          setUser({ ...user, albums: albums });
          setName({ album: "" });
        }
      }
    
      async function submitArtist() {
        var artists = user.artists;
        var artist = nameData.artist;
        const artist_response = await getArtist(artist);
        const artist_data = artist_response.artists.items[0]
        console.log(artist_data)
        if (artist_data !== undefined){
          artists.push(artist_data);
          setUser({ ...user, artists: artists });
          setName({ artist: "" });
        }
      }

    function submitForm() {
        var fullUser = {...user,...location.state.user};
        console.log(fullUser)
        navigate(`/profile/${fullUser.username}`, {state: {user: fullUser}})
        setUser({pagename: '', bio: '', profile_url: '', albums: [], artists: []});
        
    }

    return (
        <form>
        <label htmlFor="pagename">pagename</label>
        <input
            type="text"
            name="pagename"
            id="pagename"
            value={user.pagename}
            onChange={handleChange} />
        <label htmlFor="Bio">Bio</label>
        <input
            type="text"
            name="bio"
            id="bio"
            value={user.bio}
            onChange={handleChange} />
        {user.profile && <img src={user.profile} />}
        <label htmlFor="profile">Select Image</label>
        <input
            type="file"
            name="profile"
            id="profile"
            onChange={handleChange} />
        <label htmlFor="albums">Enter an album</label>
        <input
            type="text"
            name="albums"
            id="albums"
            value={nameData.album}
            onChange={handleChange} />
        <AlbumTable userdata={user} />
        <input text-align  = "center" name = "album-button" type="button" value="Submit Album" onClick={submitAlbum} />
        <br></br>
        <label htmlFor="artists">Enter an artist</label>
        <input
            type="text"
            name="artists"
            id="artists"
            value={nameData.artist}
            onChange={handleChange} />
        <ArtistTable userdata={user} />
        <input name = "artist-button" type="button" value="Submit Artist" onClick={submitArtist} />
        <br></br>
        <input name = "master-button" type="button" value="Submit All" onClick={submitForm} />
        </form>
    ); 
}


export default Form;