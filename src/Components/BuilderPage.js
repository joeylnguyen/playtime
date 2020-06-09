import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Timer';


const BuilderPage = ( { userData, accessToken } ) => {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleChange = (event) => {
    switch(event.target.id) {
      case 'playlistName':
        setPlaylistName(event.target.value);
        break;
      case 'hours':
        setHours(event.target.value);
        break;
      case 'minutes':
        setMinutes(event.target.value);
        break;
      default:
        break;
    }
  };

  const buildTracklist = () => {
    let tracklist = [];
    const convertedHours = hours * 3600000;
    const convertedMinutes = minutes * 60000;
    let remainingDuration = convertedHours + convertedMinutes;

    for (let i = 0; i < tracks.length; i += 1) {
      if (remainingDuration > 0) {
        remainingDuration -= tracks[i].trackDuration;
        tracklist.push(tracks[i].uri);
      } else {
        break;
      }
    }
    return tracklist;
  };

  const addTracksToPlaylist = (playlistId, tracklist) => {
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {'Authorization': 'Bearer ' + accessToken},
      data: {'uris': tracklist}
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
        const tracklist = buildTracklist();
        addTracksToPlaylist(result.data.id, tracklist);
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
        const tracksArray = result.data.tracks.map((track) => {
          return { uri: track.uri, trackDuration: track.duration_ms };
        });
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
      <Timer hours={hours} minutes={minutes} handleChange={handleChange} />
      <form onSubmit={handleCreatePlaylist}>
        <label>
          Playlist Name:
          <input type="text" id="playlistName" value={playlistName} onChange={handleChange} />
        </label>
        <input type ="submit" value="Create Playlist!" />
      </form>
    </div>

  )
};

export default BuilderPage;