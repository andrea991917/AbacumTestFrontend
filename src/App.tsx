import React from 'react';
import Game from "./pages/Game";
import "./assets/scss/style.scss";
import { StylesProvider } from '@material-ui/core';

function App() {
  return (
    <div>

        <StylesProvider injectFirst>
            <Game/>
        </StylesProvider>

    </div>
  );
}

export default App;
