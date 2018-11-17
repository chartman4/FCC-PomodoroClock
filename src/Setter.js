import React, { Component } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// https://fontawesome.com/how-to-use/on-the-web/using-with/react

const SetterWrapper = styled.div`
display: flex;
flex-direction: column;
border: 2px solid pink;
justify-content: space-between;
`
const Button = styled.button`
    border-radius: 6px;
    font-size: 2.5rem;
    border: 1px solid white;
    box-shadow: 0px 2px 0 grey, 2px 4px 6px #eee;
    
    &:hover {
        box-shadow: 0px 2px 0 grey;
        color: white;
        }
`
const Label = styled.label`
font-size: 1.3em;
`
const ChangeWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
border: 2px solid green;
`
const Counter = styled.div`
font-size: 2em;
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
                    <Button id={incId} onClick={this.onIncrement}><FontAwesomeIcon icon="plus" /></Button>
                    <Counter id={lengthId}>{this.props.value}</Counter>
                    <Button id={decId} onClick={this.onDecrement}><FontAwesomeIcon icon="minus" /></Button>
                </ChangeWrapper>
            </SetterWrapper>

        );
    }

}
