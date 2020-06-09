import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Confirmation = ({ playlistData, accessToken, setShowModal }) => {
  const { id, uri } = playlistData;
  const [playlistImage, setplayListImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${id}/images`,
      headers: {'Authorization': 'Bearer ' + accessToken},
    })
      .then((result) => {
        setplayListImage(result.data[1].url)
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [accessToken, id])

  return (
    <div>
      {loading ? 'Creating playlist...' :
      (<div>
        <h3>Woot!</h3>
        <p>Your playlist is ready for groovin'!</p>
        <div>
          <a href={uri}>
            <img src={playlistImage} alt='Playlist cover' />
          </a>
        </div>
        <div>
          <a href={uri}>
            <button>Open Playlist</button>
          </a>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>)}
    </div>
  );
};

export default Confirmation;