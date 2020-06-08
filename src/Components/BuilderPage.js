import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuilderPage = ( { userData, accessToken } ) => {
  const [tracks, setTracks] = useState()

  const handleCreatePlaylist = (playlistName) => {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/users/${userData.id}/playlists`,
      data: {
        name: playlistName,
        description: 'Created with the PlayTime App!'
      }
    })
  }

  useEffect(() => {
    const getTracks = (artistIds) => {
      axios({
        method: 'get',
        url: `https://api.spotify.com/v1/recommendations?seed_artists=${artistIds}&limit=100`,
        headers: {'Authorization': 'Bearer ' + accessToken},
      })
      .then((result) => console.log(result))
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
      .catch((error) => console.log(error))

  }, [accessToken]);

  return (
    <div>
      <div>Hi {userData.display_name}</div>
    </div>

  )
};

export default BuilderPage;