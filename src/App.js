import React, { Component } from 'react';
import './App.css';
import PomodoroClock from "./PomodoroClock";
import ErrorBoundary from "./ErrorBoundary"
import styled from "styled-components";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowUp, faArrowDown, faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faArrowUp, faArrowDown, faPlay, faPause, faRedo)


const Wrapper = styled.div`
display: grid;
grid-template-rows: 20vh 60vh 20vh;
justify-content: center;
// align-items: center;
// display: flex;
// flex-direction: column;
align-items: center;
// justify-content: space-around;

border: 2px solid purple;
align-content: center;
height: 100vh;
width: 100vw;
text-align: center;
// min-height: 550px;
// min-width: 80%;
`;
const Label = styled.div`
font-family: 'Lobster', cursive;
font-size: 20px;
/* For width 600px and larger: */
@media only screen and (min-width: 400px) {
  font-size: 50px; 
}
`


class App extends Component {

  render() {
    return (
      <Wrapper>
        <ErrorBoundary>
          <Label >Pomodoro Clock</Label>
          <PomodoroClock />
          <div>
            <h3>by Cheryl Hartman</h3>
          </div>
        </ErrorBoundary>

      </Wrapper>

    );
  }
}

export default App;
