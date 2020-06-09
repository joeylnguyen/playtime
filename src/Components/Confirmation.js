import React, { useEffect } from 'react';
import axios from 'axios';

const Confirmation = ({ playlistData, accessToken }) => {
  const { id, uri } = playlistData;

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${id}/images`,
      headers: {'Authorization': 'Bearer ' + accessToken},
    })

  });

  return (
    <div>
      <a href={uri}>
        <div>hi</div>
      </a>
    </div>
  );
};

export default Confirmation;