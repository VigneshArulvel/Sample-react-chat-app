import React from 'react';
import './SendMessageForm.css';
import MessagesList from '../MessagesList/MessagesList.js'

class SendMessageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value : {}
        }
    }
    _handleKeyDown = (event) => {
        if (event.key === "Enter"){
            this.props.sendMessage(event.target.value)
            event.target.value = ""
        }
    }
    render() {
        return(
            <div>
                <MessagesList data = {this.state} messages = {this.props.messages} roomId = {this.props.roomId}></MessagesList>
                <div></div>
                <input className = "FormArea" type="text" placeholder = "Type your message and hit ENTER" onKeyDown={this._handleKeyDown}/>
            </div>
        );
    }
}

export default SendMessageForm;