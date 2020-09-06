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
        console.log(result.data);
        setplayListImage(result.data.length > 1 ? result.data[1].url : result.data[0].url)
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
              <PlaylistImage src={playlistImage} alt='Playlist cover' height='300' width='300' />
            </a>
          </div>
          <ButtonsWrapper>
            <a href={uri}>
              <OpenButton>OPEN PLAYLIST</OpenButton>
            </a>
            <CloseButton onClick={() => setShowModal(false)}>CLOSE</CloseButton>
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
  background: rgb(33,33,33);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5em 3.5em 2em;
  border-radius: .5em;
  text-align: center;
  color: white;
`;

const PlaylistImage = styled.img`
  border-radius: .5em;
`;

const ButtonsWrapper = styled.div`
  padding: 1em .25em .25em;
  height: 50px;
`;

export const Button = styled.button`
  border-radius: 50px;
  height: 100%;
  cursor: pointer;
  border-color: transparent;
  font-weight: bolder;
  background-color: rgb(30,215,96);
  color: white;
`;

const OpenButton = styled(Button)`
  width: 55%;
  margin: .5em;
`;

const CloseButton = styled(Button)`
  width: 35%;
  margin: .5em;
  background-color: rgb(83,83,83);
  color: white;
`;
