import React, { Component } from "react";
import styled from "styled-components";


const TimerWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: end;
webkit-box-pack: end;

-webkit-justify-content: end;
// font-size: 1em;
// width: 50%;
// border: 4px solid blue;

`
const Label = styled.div`
// margin-top: 40%;
font-size: 1em;
@media (min-width: 700px) {
    font-size: 1.5em;
}
`
const Time = styled.div`
font-family: 'BebasNeueRegular'; 
font-style: normal; 
font-weight: bold;
font-size: 1.5em;

 
@media (min-width: 700px) {
    font-size: 4em;
}
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