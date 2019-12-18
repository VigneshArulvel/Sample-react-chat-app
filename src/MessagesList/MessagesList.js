import React from 'react';
import './MessagesList.css';
import ReactDOM from 'react-dom';

class MessagesList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messageData : []
        }
    }
    componentWillUpdate (){
        // This for removing auto scroll when we are reading messages.
        const node = ReactDOM.findDOMNode(this)
        this.scrollToBeDOne = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    componentDidUpdate () {
        if (this.scrollToBeDOne){
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
    }
    render() {
        if (this.props.roomId === ''){
            return(
                <div id = "joinRoom"> 
                    <h1>Join a room!</h1> 
                </div>
            )
        }
        let propsMessage = this.props.messages
        return(
            <div className = "MessageList">
                {propsMessage.map((item, index) => 
                    <div key = {index}>
                        <div>{item.senderId}</div>
                        <div className = "message">{item.text}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default MessagesList;
