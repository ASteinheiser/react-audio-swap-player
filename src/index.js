import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

import App from './App';
import './index.css';

// load font-awesome icons
library.add(faPlay, faPause, faSync);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('reactAudioComponent')
);
