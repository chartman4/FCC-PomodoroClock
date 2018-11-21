import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// https://daveceddia.com/open-modal-in-react/
export default class InfoIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false
        };

        this.toggle = this.toggle.bind(this);
    }

};

const info = "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks."

toggle = () => {
    this.props.handleChange(1);
}
// The gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
};

// The modal "window"
const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30
    render() {
        return (
            i
        )
    }