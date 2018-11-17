import React, { Component } from "react";
import styled from "styled-components";


const TimerWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 2em;
width: 100%;
border: 4px solid blue;

`
const Label = styled.div`

`
const Time = styled.div`

`
export default class Timer extends Component {

    render() {
        let minutes = Math.floor(this.props.secondsLeft / 60);
        let seconds = this.props.secondsLeft - minutes * 60;
        let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
        let secondStr = seconds < 10 ? "0" + seconds : seconds.toString();

        return (
            <TimerWrapper>
                <Label id="timer-label">{this.props.label}</Label>
                <Time id="time-left">{minutesStr}:{secondStr}</Time>
            </TimerWrapper>
        );
    }
}