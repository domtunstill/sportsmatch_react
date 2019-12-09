import React, { Component } from "react";
import axios from "axios";
import CreateMessage from './CreateMessage';
import SingleMessage from './SingleMessage';
import styles from './css/DisplayMessages.module.css'
import Location from './Location';

class DisplayMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_id: props.match.params.id,
      organiser_id: props.match.params.organiser_id,
      opponent_id: props.match.params.opponent_id,
      messageSent: false,
      messageData: [],
      messageDetails: []
    }
  }

  componentDidMount() {
    this.getMessages()
  }
  getMessages() {
    let self = this;
    axios({
      url: `/api/v1/messages/${this.props.match.params.id}`,
      headers: {
        'Content-Type': 'application/json',
        'api-token': localStorage.getItem('jwtToken')
      }
    })
    .then(function(response) {
      let details = response.data.pop()
      self.setState({
        messageData: response.data,
        messageDetails: details
      })
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.messageSent !== prevState.messageSent) {
      this.getMessages()
    }
  }

  handleSubmitMessage() {
    this.setState(prevState => {
      return { messageSent: !prevState.messageSent }
    })
  }

  showOtherUserName() {
    if (this.state.messageDetails.organiser_id === parseInt(localStorage.getItem('user_id'))) {
      return this.state.messageDetails.opponent
    } else {
      return this.state.messageDetails.organiser
    }
  }

  renderMap(){
    if (this.state.messageDetails.player_postcode){
      return(
        <div>
          <Location postcode={this.state.messageDetails.player_postcode}/>
        </div>
      )
    }
  }

  render() {


    if (this.state.messageData === []) {
      return (
        <div className={styles.emptyInbox}>
          <h4 className={styles.heading}>No previous messages, send a message to start your conversation...</h4>
          <CreateMessage
            id={this.state.game_id}
            organiser_id={this.state.organiser_id}
            opponent_id={this.state.opponent_id}
          />
        </div>
      )
    } else {
      return (
        <div className={styles.topDiv}>
        <div className={styles.opponent}>
          <h3 style={{textAlign: 'center'}}>Your conversation with {this.showOtherUserName()}</h3>
        </div>
          {this.state.messageData.map((message) => (
            <SingleMessage
              key={message.id}
              id={message.id}
              game_id={message.game_id}
              sender_id={message.sender_id}
              organiser_id={message.organiser_id}
              opponent_id={message.opponent_id}
              content={message.content}
              created_at={message.created_at}
              organiser={this.state.messageDetails.organiser}
              opponent={this.state.messageDetails.opponent}
            />
          ))}
          {this.renderMap()}
          <CreateMessage
            id={this.state.game_id}
            organiser_id={this.state.organiser_id}
            opponent_id={this.state.opponent_id}
          />
        </div>
      )
    }
  }
}
export default DisplayMessages;

// <div className={styles.messages}>
