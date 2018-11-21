import React, { Component } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// https://fontawesome.com/how-to-use/on-the-web/using-with/react

const SetterWrapper = styled.div`
display: flex;
flex-direction: column;
// border: 2px solid pink;
width: 90%;
justify-content: center;
// padding: 20px;

`
const Button = styled.button`
    // border-radius: 6px;
    // font-size: 1.5em;
    border: 1px solid white;
    box-shadow: 0px 2px 0 grey, 2px 4px 6px #eee;
    &:hover {
        box-shadow: 0px 2px 0 grey;
        color: white;
        }
`
const Label = styled.label`
font-weight: bold;
font-size: .5em;
@media (min-width: 700px) {
    font-size: 1em;

}
`
const ChangeWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
// border: 2px solid purple;
`
const Counter = styled.div`
// font-size: 2em;
margin: 0 10px;
font-family: 'Orbitron', sans-serif;
width: 50px;
`
export default class Setter extends Component {
    constructor(props) {
        super(props);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);

    }

    onIncrement = () => {
        this.props.handleChange(1);
    }
    onDecrement = () => {
        this.props.handleChange(-1);
    }
    render() {

        let labelId = this.props.id + "-label";
        let decId = this.props.id + "-decrement";
        let incId = this.props.id + "-increment";
        let lengthId = this.props.id + "-length";

        return (
            <SetterWrapper>
                <Label id={labelId}>{this.props.label}</Label>
                <ChangeWrapper>
                    <Button id={incId} onClick={this.onIncrement}><FontAwesomeIcon icon="arrow-up" /></Button>
                    <Counter id={lengthId}>{this.props.value}</Counter>
                    <Button id={decId} onClick={this.onDecrement}><FontAwesomeIcon icon="arrow-down" /></Button>
                </ChangeWrapper>
            </SetterWrapper>

        );
    }

}
