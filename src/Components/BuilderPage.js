import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuilderPage = ( { userData, accessToken } ) => {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const handleChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const addTracksToPlaylist = (playlistId) => {
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {'Authorization': 'Bearer ' + accessToken},
      data: {'uris': tracks}
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleCreatePlaylist = (event) => {
    event.preventDefault();

    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${userData.id}/playlists`,
      headers: {'Authorization': 'Bearer ' + accessToken},
      data: {
        name: playlistName,
        description: 'Created with the PlayTime App!'
      }
    })
      .then((result) => {
        addTracksToPlaylist(result.data.id);
        setPlaylistName('');
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const getTracks = (artistIds) => {
      axios({
        method: 'get',
        url: `https://api.spotify.com/v1/recommendations?seed_artists=${artistIds}&limit=100`,
        headers: {'Authorization': 'Bearer ' + accessToken},
      })
      .then((result) => {
        console.log(result);
        const tracksArray = result.data.tracks.map((track) => track.uri);
        setTracks(tracksArray);
      })
      .catch((error) => console.log(error));
    }

    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5',
      headers: {'Authorization': 'Bearer ' + accessToken},
    })
      .then((result) => {
        const artistsArray = result.data.items;
        if (artistsArray.length) {
          const artistIdString = artistsArray.map((artist) => artist.id).join(',');
          getTracks(artistIdString)
        }
      })
      .catch((error) => console.log(error));

  }, [accessToken]);

  return (
    <div>
      <div>Hi {userData.display_name}</div>
      <form onSubmit={handleCreatePlaylist}>
        <label>
          Playlist Name:
          <input type="text" name="playlistName" value={playlistName} onChange={handleChange}/>
        </label>
        <input type ="submit" value="Create Playlist!" />
      </form>
    </div>

  )
};

export default BuilderPage;