import React from 'react';
import './CreateRoomForm.css';
import RoomList from '../Roomlist/Roomlist';

class CreateRoomForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value : {}
        }
    }
    _handleKeyDown = (event) => {
        if (event.key === "Enter"){
            this.props.createNewRoom(event.target.value)
            event.target.value = ""
        }
    }
    render() {
        return(
            <div>
                <RoomList rooms = {this.props.rooms} subscribeToRoom = {this.props.subscribeToRoom} currentRoom = {this.props.currentRoom}></RoomList>
                <input className = "FormArea" type="text" placeholder = "Add new Room" onKeyDown={this._handleKeyDown}/>
            </div>
        );
    }
}

export default CreateRoomForm;