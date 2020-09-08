import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Timer from './Timer';
import Confirmation, { Button } from './Confirmation';

const BuilderPage = ( { userData, accessToken } ) => {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistData, setPlaylistData] = useState({});
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [showModal, setShowModal] = useState(false);


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
 // TODO: Can export this into own modular function
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
    console.log(`tracklist: `, tracklist)

    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {'Authorization': 'Bearer ' + accessToken},
      data: {'uris': tracklist}
    })
      .then((result) => {
        console.log(result);
        setShowModal(true);
        setHours(0);
        setMinutes(0);
        setPlaylistName('');
      })
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
        setPlaylistData(result.data);
        const tracklist = buildTracklist();
        addTracksToPlaylist(result.data.id, tracklist);
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
      <Timer hours={hours} minutes={minutes} handleChange={handleChange} />
      <form onSubmit={handleCreatePlaylist}>
        <NameInput type="text" id="playlistName" placeholder="Name your playlist" value={playlistName} onChange={handleChange} />
        <SubmitButtonWrapper>
          <SubmitButton type ="submit" value="CREATE PLAYLIST" />
        </SubmitButtonWrapper>
      </form>
      {showModal ? <Confirmation playlistData={playlistData} accessToken={accessToken} setShowModal={setShowModal} /> : null}
    </div>
  )
};

export default BuilderPage;

const NameInput = styled.input`

  background-color: transparent;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Work Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  height: 100%;
  line-height: 4rem;
  outline: none;
  padding: .75rem 1rem;
  text-align: center;
  &:focus {
    & + .input-after {
      animation: type 1.25s ease 0.5s infinite;
      box-shadow: none;
      height: calc(100% - 1rem);
      margin-left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
    }

    &::placeholder {
      opacity: 0;
      transition: 0.15s ease;
    }
  }
`;

const SubmitButtonWrapper = styled.div`
  height: 50px;
`;

const SubmitButton = styled.input`
  padding: .5em 1em;
  margin: 1.5em;
  background-color: rgb(30,215,96);
  color: white;
  border-radius: 50px;
  height: 100%;
  cursor: pointer;
  border-color: transparent;
  font-weight: bolder;
  font-size: large;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
