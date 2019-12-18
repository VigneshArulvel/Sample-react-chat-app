import React from 'react';
import './App.css';
import Header from './Header/Header';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import CreateRoomForm from './CreateRoomForm/CreateRoomForm';
import {tokenUrl, instanceLocater} from './config';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value : '',
      messages : [],
      joinableRooms : [],
      joinedRooms : [],
      roomId : ''
    }
  }
  componentDidMount() {
    const chatManager = new ChatManager({
        instanceLocator : instanceLocater,
        userId: 'Vicky',
        tokenProvider: new TokenProvider({
            url: tokenUrl
        })
    })
    chatManager
      .connect()
      .then(currentUser => {
          this.currentUser = currentUser
          this.setState({ currentUser: currentUser })
          this.getRooms()  
      })
      .then(currentRoom => {
          this.setState({
              currentRoom,
              users: currentRoom.userIds
          })
      })
      .catch(error => console.log(error))
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => 
        this.setState({
          joinableRooms,
          joinedRooms : this.currentUser.rooms
        })
        )
      .catch(error => console.log(error, "error in fetching rooms") )
  }

  subscribeToRoom = (roomId) => {
    let messageData = []
    this.setState({
      roomId : roomId,
      messages : messageData
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 100,
      hooks: {
          onMessage: message => {
            messageData.push(message)
            this.setState({
                  messages : messageData
              })
          },
      }
      
  })
      .then(this.getRooms())
      .catch(err => console.log(err, "error in subscribe to rooms"))
  }
  sendMessage = (text) =>{
    this.currentUser.sendMessage({
      text,
      roomId : this.state.roomId
    });
  }

  createNewRoom = (name) => {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log(err, "error in create new room"))
  }
  render(){
    return (
      <div className = "WholeApp">
        <Header></Header>
        <div id = "roomForm">
          <CreateRoomForm rooms = {[...this.state.joinableRooms, ...this.state.joinedRooms]} subscribeToRoom = {this.subscribeToRoom} currentRoom = {this.state.roomId} createNewRoom = {this.createNewRoom}></CreateRoomForm>
        </div>
        <div id = "messageForm">
          <SendMessageForm messages = {this.state.messages} sendMessage = {this.sendMessage} roomId = {this.state.roomId}></SendMessageForm>
        </div>
      </div>
    );
  }
}

export default App;
