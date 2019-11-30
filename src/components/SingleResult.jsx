import React from 'react'

class SingleResult extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="card" style={{width: '18rem'}}>
          <div className="card-body">
              <p className="card-text">Game id: {this.props.game_id}</p>
              <p className="card-text">Winner id: {this.props.winner_id}</p>
              <p className="card-text">Loser id: {this.props.loser_id}</p>
              <p className="card-text">Confirmed: {this.props.confirmed}</p>
          </div>
        </div>
      </li>
    )
  }
}
export default SingleResult
