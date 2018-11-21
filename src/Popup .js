import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
background: white;
position:absolute;
    width:50%;
    height: 50%;
    top: 40%;
    left: 25%;
    margin: 0 auto;
    border: 2px solid black;
    padding: 20px;
`
const Button = styled.button`
border: 1px solid white;
box-shadow: 0px 2px 0 grey, 2px 4px 6px black;
margin: 20px;
&:hover {
    box-shadow: 0px 2px 0 grey;
    color: white;
    }
`
class Popup extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <Wrapper>
                <div className="popup">
                    {this.props.message}
                    <div>
                        <Button className="popup-close" onClick={this.props.onClose}>Close</Button>
                    </div>

                </div>
            </Wrapper>
        );
    }
}

export default Popup;
