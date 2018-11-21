import React, { Component } from "react";
import Setter from './Setter';
import Timer from './Timer';
import Controls from './Controls';
import Popup from "./Popup ";

import styled from "styled-components";

const info = "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, separated by short breaks.  You can set the length of the work sessions and break sessions using the up and down arrows and start and stop the timer with the start button."

const ClockWrapper = styled.div`
display: grid;
grid-template-rows: 60% 15% 15% 10%;

font-family: sans-serif;

background-image: url("https://labs.jensimmons.com/2016/examples/images/tomato.jpg");
background-size: contain;
background-repeat: no-repeat;
background-position: center;

width: 70vw;
height: 100%;    
max-width: 900px;
 
// border: 4px solid green;

`

const SettersWrapper = styled.div`
display: grid;
grid-template-columns: 40% 40%;
justify-content: center;
// border: 2px red solid;
`

const Info = styled.div`
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
        this.playBeep = this.playBeep.bind(this);
        this.pauseBeep = this.pauseBeep.bind(this);

        this.state = {
            breakSetting: defaultBreak,
            sessionSetting: defaultSession,
            session: true,
            secondsLeft: defaultSession * 60,
            running: false,
            showInfo: false,
            isOpen: false
        };
        this.url = "http://streaming.tdiradio.com:8000/house.mp3";
        this.audio = new Audio(this.url);

    }

    openPopup = () => {
        this.setState({
            isOpen: true
        });
    }

    closePopup = () => {
        this.setState({
            isOpen: false
        });
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
        //only allow updates when timer is not running
        if (!this.state.running) {
            let newSetting = this.state.sessionSetting + change;
            if (newSetting > setterLowerLimit && newSetting <= setterUpperLimit)
                this.setState((prevState) => ({
                    sessionSetting: prevState.sessionSetting + change,
                    secondsLeft: (prevState.sessionSetting + change) * 60
                }));
        }
    }

    async playBeep() {
        try {
            await this.audio.play();
            //   playButton.className = "playing";
        } catch (err) {
            //   playButton.className = "";
            console.log(err);
        }
    }

    async pauseBeep() {
        try {
            this.audio.currentTime = 0;
            await this.audio.pause();

        } catch (err) {
            console.log(err);
        }
    }

    // called every second to figure out the time left to display
    tick() {

        if (this.state.secondsLeft > 0) {
            this.setState((prevState) => ({ secondsLeft: prevState.secondsLeft - 1 }));
        } else {

            this.playBeep();

            this.setState(function (prevState) {
                let flag = !this.state.session;
                let minutes = flag ? this.state.sessionSetting : this.state.breakSetting;

                return { session: flag, secondsLeft: minutes * 60 }
            });

        }
    }

    startTimer(e) {
        // run tick() every second
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({ running: true });
    }

    resetTimer(e) {

        this.pauseBeep();

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
        let timerLabel = this.state.session ? "Work" : "Break";
        return (
            <ClockWrapper>
                <Timer label={timerLabel} secondsLeft={this.state.secondsLeft} />
                <Controls startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    resetTimer={this.resetTimer} />
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
                <Info>
                    <button onClick={this.openPopup}>
                        Click Me for Instructions!
        </button>

                    <Popup show={this.state.isOpen}
                        onClose={this.closePopup}
                        message={info}>
                    </Popup>
                </Info>
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

