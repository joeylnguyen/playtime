import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    <Modal>
      <ModalContent>
        {loading ? 'Creating playlist...' :
        (<div>
          <h3>Woot!</h3>
          <p>Your playlist is ready for groovin'!</p>
          <div>
            <a href={uri}>
              <PlaylistImage src={playlistImage} alt='Playlist cover' />
            </a>
          </div>
          <ButtonsWrapper>
            <a href={uri}>
              <OpenButton>Open Playlist</OpenButton>
            </a>
            <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
          </ButtonsWrapper>
        </div>)}
      </ModalContent>
    </Modal>
  );
};

export default Confirmation;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  position: fixed;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5em 3.5em 2em;
  border-radius: .5em;
  text-align: center;
`;

const PlaylistImage = styled.img`
  border-radius: .5em;
`;

const ButtonsWrapper = styled.div`
  padding: 1em .25em .25em;
  height: 50px;
`;

const Button = styled.button`
  border-radius: 50px;
  height: 100%;
  cursor: pointer;
  border-color: transparent;
  font-weight: bolder;
`;

const OpenButton = styled(Button)`
  width: 55%;
  margin: .5em;
  background-color: rgb(0,136,122);
  color: white;
`;

const CloseButton = styled(Button)`
  width: 35%;
  margin: .5em;
  background-color: rgb(237,234,229);
`;
