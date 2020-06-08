import React, { useState } from 'react';
import '../App.css';

function App() {
  return (
    <div className="App">
      <button onClick={() => window.location = 'http://localhost:8888/login'}>
        Sign into Spotify
      </button>
    </div>
  );
}

export default App;
