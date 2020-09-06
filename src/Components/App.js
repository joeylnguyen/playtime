import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import querystring from 'querystring';
import BuilderPage from './BuilderPage';
import { Button } from './Confirmation';
import '../App.css';

const App = () => {
  const [userData, setUserData] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleSignIn = () => {
    window.location =  process.env.LOGIN_URI || 'http://13.57.127.139:8888/login';
  }

  useEffect(() => {
    const parsed = querystring.parse(window.location.search);
    setAccessToken(parsed['?access_token']);

    if (accessToken) {
      axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {'Authorization': 'Bearer ' + accessToken},
      })
        .then((result) => {
          setUserData(result.data);
          setSignedIn(true);
        })
        .catch((error) => console.log(error));
    }
  }, [accessToken]);

  return (
    <Wrapper>
      {signedIn
      ? <BuilderPage userData={userData} accessToken={accessToken}/>
      : <div>
        <Title>PlayTime</Title>
          <Paragraph>
            PlayTime lets you quickly build Spotify playlists based on your desired playlist duration. <br/>Log in to get started!
          </Paragraph>
        <LoginButton onClick={handleSignIn}>
          LOG IN WITH SPOTIFY
        </LoginButton>
      </div>}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
`;

const Title = styled.span`
  font-size: xxx-large;
  font-weight: 200;
  color: white;
`;

const Paragraph = styled.p`
  padding: 1em;
  font-size: larger;
  font-weight: 100;
  color: white;
`;

const LoginButton = styled(Button)`
  padding: .5em 1em;
`;