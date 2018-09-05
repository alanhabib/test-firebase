// calender ID = q038hfkuiq782r4n6rv04pro24@group.calendar.google.com

import React, { Component } from "react";

class Calender extends Component {
  state = {
    events: []
  };

  componentDidMount = () => {
    this.getEvents();
  };
  render() {
    return <div className="calender" />;
  }
}

export default Calender;
