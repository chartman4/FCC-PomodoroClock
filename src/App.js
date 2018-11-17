import React, { Component } from 'react';
import './App.css';
import PomodoroClock from "./PomodoroClock";
import styled from "styled-components";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faMinus, faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faPlus, faMinus, faPlay, faPause, faRedo)


const Wrapper = styled.div`
display: grid;
grid-template-rows: 20vh 60vh 20vh;
justify-content: center;
align-items: center;
height: 100vh;
text-align: center;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Pomodoro Clock</h1>
        <PomodoroClock />
        <h2>by Cheryl Hartman</h2>
      </Wrapper>

    );
  }
}

export default App;
