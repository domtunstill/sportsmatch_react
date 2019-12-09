import React from 'react'
import axios from 'axios'

class EditGameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameEdit: false,
      gameDate: this.props.gameDate,
      gameTime: this.props.gameTime
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let self = this;
    var element = document.getElementById("date-input").value;
    if(Date.parse(element) >= new Date()) {
      axios({
        method: 'patch',
        url: `/api/v1/games/${this.props.id}/edit`,
        headers: {
          "Content-Type": "application/json",
          "api-token": localStorage.getItem('jwtToken')
        },
        data:
        {
          game_date: document.getElementById("date-input").value,
          game_time: document.getElementById("time-input").value
        }})
        .then(function() {
          self.props.handleEdit(
            document.getElementById("date-input").value, 
            document.getElementById("time-input").value
            )
        })
        .then(function() {
          self.props.displayForm()
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }

  render() {
    var tempDate = new Date();
    var dayOfMonth = tempDate.getDate()
    if (dayOfMonth < 10) {
      dayOfMonth = '0' + dayOfMonth
    }
    var monthOfYear = tempDate.getMonth()+1
    if (monthOfYear < 10) {
      monthOfYear = '0' + monthOfYear
    }
    var date = tempDate.getFullYear() + '-' + monthOfYear + '-' + dayOfMonth ;
    return (
      <div className="form-container">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
          className="form-game-request"
          >
          <div className="form-group">
          <input
            id="date-input"
            name="date"
            type="date"
            required="required"
            value={this.state.gameDate}
            onChange={(e) => {this.setState({gameDate: e.target.value})}}
            min={date}
            className="form-control"
          ></input>
          </div>
          <div className="form-group">
          <input
            id="time-input"
            name="time"
            type="time"
            value={this.state.gameTime}
            onChange={(e) => {this.setState({gameTime: e.target.value})}}
            required="required"
            className="form-control"
          ></input>
          </div>
          <button
            name="requestGame"
            type="submit"
            className="request-button btn btn-outline-primary"
            onClick={this.handleClick}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default EditGameForm
