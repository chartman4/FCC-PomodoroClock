import React, { Component } from "react";
import Setter from './Setter';
import Timer from './Timer';
import Controls from './Controls';

import styled from "styled-components";

const ClockWrapper = styled.div`
display: grid;
grid-template-rows: 25% 55% 20% 
width: 95vw;
background-color: #7f8084;
border: 6px solid gray;
border-radius: 6px;
height: 100%;
font-family: sans-serif;
grid-row: 2px;
@media (min-width: 700px) {
    width: 508px;
`
const SettersWrapper = styled.div`
display: grid;
grid-template-columns: 40% 40%;
justify-content: space-around;
`
const defaultSession = 25; //25
const defaultBreak = 5;  //5
const setterUpperLimit = 60;
const setterLowerLimit = 0;


export default class PomodoroClock extends Component {
    constructor(props) {
        super(props);
        this.handleBreakSetting = this.handleBreakSetting.bind(this);
        this.handleSessionSetting = this.handleSessionSetting.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.tick = this.tick.bind(this);

        this.state = {
            breakSetting: defaultBreak,
            sessionSetting: defaultSession,
            session: true,
            secondsLeft: defaultSession * 60,
            running: false,
        };
        this.url = "http://streaming.tdiradio.com:8000/house.mp3";
        this.audio = new Audio(this.url);

    }

    handleBreakSetting = (change) => {
        // only allow updates when timer is not running
        if (!this.state.running) {
            let newSetting = this.state.breakSetting + change;
            if (newSetting > setterLowerLimit && newSetting <= setterUpperLimit)
                this.setState({ breakSetting: newSetting });
        }

    }

    handleSessionSetting = (change) => {

        if (!this.state.running) {
            let newSetting = this.state.sessionSetting + change;
            if (newSetting > setterLowerLimit && newSetting <= setterUpperLimit)
                this.setState((prevState) => ({
                    sessionSetting: prevState.sessionSetting + change,
                    secondsLeft: (prevState.sessionSetting + change) * 60
                }));
        }

    }


    // called every second to figure out the time left to display
    tick() {

        if (this.state.secondsLeft > 0) {
            this.setState((prevState) => ({ secondsLeft: prevState.secondsLeft - 1 }));
        } else {

            var playPromise = this.audio.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                })
                    .catch(error => {
                        console.log(error);
                    });
            }

            this.stopTimer();

            this.setState(function (prevState) {
                let flag = !this.state.session;
                let minutes = flag ? this.state.sessionSetting : this.state.breakSetting;

                return { session: flag, secondsLeft: minutes * 60 }
            });

            // start new timer
            this.startTimer();
        }
    }

    startTimer(e) {
        // run tick() every second
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({ running: true });
    }

    resetTimer(e) {

        var pausePromise = this.audio.pause();

        if (pausePromise !== undefined) {
            pausePromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                this.audio.currentTime = 0;

            })
                .catch(error => {
                    // Auto-play was prevented
                    console.log(error);
                });
        }
        this.setState({
            session: true,
            breakSetting: defaultBreak,
            sessionSetting: defaultSession,
            secondsLeft: defaultSession * 60,
            running: false
        })

        clearInterval(this.intervalHandle);

    }

    stopTimer() {
        clearInterval(this.intervalHandle);
        this.setState({ running: false });
    }

    render() {
        let timerLabel = this.state.session ? "Session" : "Break";
        return (
            <ClockWrapper>

                {/* Session and Break Length Setters */}
                <SettersWrapper>
                    <Setter id="break" label="Break Length"
                        value={this.state.breakSetting}
                        handleChange={this.handleBreakSetting}
                    />
                    <Setter id="session" label="Session Length"
                        value={this.state.sessionSetting}
                        handleChange={this.handleSessionSetting}
                    />
                </SettersWrapper>
                {/* <Timer label={timerLabel} minutes={this.state.minutes} seconds={this.state.seconds} /> */}

                <Timer label={timerLabel} secondsLeft={this.state.secondsLeft}
                />
                <Controls startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    resetTimer={this.resetTimer} />

                <audio
                    ref={ref => (this.audio = ref)}
                    id="beep"
                    src="http://res.cloudinary.com/chartman4/video/upload/v1499897861/BellSound_csbr1a.mp3"
                    preload="auto">
                </audio>

            </ClockWrapper>
        )
    }
}

