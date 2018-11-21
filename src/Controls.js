import React, { Component } from "react";
import styled from "styled-components";

const ControlsWrapper = styled.div`
display:flex;
justify-content: space-around;
font-size:14px;
// border: 4px solid yellow;
justify-self: center;
align-self: center;
`

const Control = styled.button`
font-size: .5em;
// width: 50px;
margin: 5px;
border-radius: 6px;
border: 1px solid white;
box-shadow: 0px 2px 0 grey, 2px 4px 6px #eee;
&:hover {
    box-shadow: 0px 2px 0 grey;
    color: white;
    }
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
        let icon = this.state.start ? "START" : "PAUSE";

        return (
            <ControlsWrapper >
                <Control id="start_stop" onClick={this.startStop}>
                    {icon}
                </Control>
                <Control id="reset" onClick={this.reset}>
                    RESET
                </Control>
            </ControlsWrapper>
        );
    }
}