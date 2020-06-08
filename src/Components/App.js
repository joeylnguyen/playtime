import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import querystring from 'querystring';
import BuilderPage from './BuilderPage';
import '../App.css';

const App = () => {
  const [userData, setUserData] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const parsed = querystring.parse(window.location.search);
    const accessToken = parsed['?access_token'];
    if (accessToken) {
      axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {'Authorization': 'Bearer ' + accessToken},
      })
        .then((result) => {
          console.log(result)
          setUserData(result.data);
          setSignedIn(true);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleSignIn = () => {
    window.location = 'http://localhost:8888/login';
  }

  return (
    <div>
      {signedIn
      ? <div>Hi {userData.display_name}</div>
      : <Wrapper>
        <div>
          <span>PlayTime</span>
          <p>PlayTime lets you quickly build Spotify playlists based on your desired play length. Sign in to get building!</p>
        </div>
        <button onClick={handleSignIn}>
          Sign into Spotify
        </button>
      </Wrapper>}
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  text-align: center;
`;