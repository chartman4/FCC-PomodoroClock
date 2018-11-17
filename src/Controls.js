import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ControlsWrapper = styled.div`
display:flex;
justify-content: space-around;
font-size: 1.2em;
border: 4px solid yellow;
justify-self: center;
align-self: center;
`

const Control = styled.button`
font-size: 2em;
width: 50px;
`

export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: true,
        };

        this.startStop = this.startStop.bind(this);
        this.reset = this.reset.bind(this);

    }

    reset = () => {
        this.setState((prevState, props) => ({ start: true }));
        this.props.resetTimer();

    }

    // if ready to stopped/paused, start timer otherwise stop timer
    // flip 
    startStop = () => {
        if (this.state.start) {
            this.props.startTimer()
        }
        else {
            this.props.stopTimer()
        }
        this.setState((prevState, props) => ({ start: !prevState.start }));
    }

    render(props) {
        let icon = this.state.start ? "play" : "pause";
        return (
            <ControlsWrapper >
                <Control id="start_stop" onClick={this.startStop}>
                    <FontAwesomeIcon icon={icon} />
                </Control>
                <Control id="reset" onClick={this.reset}>
                    <FontAwesomeIcon icon="redo" />
                </Control>
            </ControlsWrapper>
        );
    }
}