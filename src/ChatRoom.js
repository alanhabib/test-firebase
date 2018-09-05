import React, { Component } from "react";
import AuthButton from "./Components/AuthButton";
import firebase, { googleProvider } from "./firebase";

class ChatRoom extends Component {
  state = {
    message: "",
    messages: [],
    user: false
  };

  componentDidMount() {
    this.onAuthStateChanged();
    //   connecting to firebase backend
    firebase
      .database()
      .ref("messages/")
      // whenever something happens on "messages" we will get notified
      .on("value", snapshot => {
        const currentMessages = snapshot.val();
        if (currentMessages != null) {
          this.setState({
            messages: currentMessages
          });
        }
      });
  }

  auth = () => {
    if (!this.state.user) {
      firebase.auth().signInWithPopup(googleProvider);
    } else {
      firebase.auth().signOut();
    }
  };

  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  updateMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  //   whenever the component changes state React reload the component with new data
  // React reacts to changes, this is the concept of React, only the subportion of the component changes.
  //
  submitMessage = e => {
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    };
    // when we submit nextMessage we connect to firebase find the messages key again add another key inside
    // and set our nextMessages value for the subindex
    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);
    //   let list = Object.assign([], this.state.messages)
    //   list.push(nextMessage)
    //   this.setState({
    //       messages: list
    //   })
  };

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return <li key={message.id}>{message.text}</li>;
    });
    return (
      <div>
        <ol>{currentMessage} </ol>
        {this.state.user ? (
          <div>
            <input
              onChange={this.updateMessage}
              type="text"
              placeholder="Message"
            />
            <br />
            <button onClick={this.submitMessage}>Send Message</button>
          </div>
        ) : null}
        <br />
        <AuthButton user={this.state.user} onClick={this.auth} />
      </div>
    );
  }
}

export default ChatRoom;
