import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPause, faPlay, faSync, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '@fontsource/baloo-tammudu-2';

import App from './App';
import './index.css';

// load font-awesome icons
library.add(faPause, faPlay, faSync, faSpinner);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('reactAudioComponent')
);
