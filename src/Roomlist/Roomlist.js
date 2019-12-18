import React from 'react';
import './Roomlist.css';
// import DummyValue from './DummyValue.js'; 

class RoomList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messageData : []
        }
    }
    render() {
        const orderedRooms = [...this.props.rooms].sort((a,b) => a.id-b.id)
        return(
            <div className = "RoomList">
                <h1>Room List</h1>
                {orderedRooms.map((item, index) => {
                    let FocusClassName = this.props.currentRoom === item.id ? "FocusedRoom" : "Rooms";
                    return(
                    <a onClick = {() => {this.props.subscribeToRoom(item.id)}} href = "/#" key = {index} className = {FocusClassName}>
                        {item.name}
                    </a>
                    )}
                )}
            </div>
        );
    }
}

export default RoomList;
