import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import './css/login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    let self = this;
    axios
      .post("/api/v1/players/login", {
          email: document.getElementById("email-input").value,
          password: document.getElementById("password-input").value
      })
      .then(function(response) {
        console.log(response);
        console.log(response.data.jwt_token)
        self.props.updateAuthState(
          response.data.jwt_token,
          response.data.user_id
        );
        localStorage.setItem('jwtToken', response.data.jwt_token)
        localStorage.setItem('user_id', response.data.user_id)
      })
      .catch(function(error) {
        console.log(error);
      });
    }

  render() {
    if (this.props.authToken) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div class="container">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8" id="">
              <img src="https://images.unsplash.com/photo-1547073044-67b2ec97ed0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" />
            </div>
            <div class="col-2"></div>
          </div>
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <div className="form-container">
                <h3>Log in</h3>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                  className="form-login"
                >
                  <div className="form-group">
                    <input
                      id="email-input"
                      name="email"
                      placeholder="email"
                      type="text"
                      required="required"
                      className="email form-control"
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      id="password-input"
                      name="password"
                      placeholder="password"
                      type="password"
                      className="password form-control"
                      required="required"
                    ></input>
                  </div>
                  <div className='row'>
                    <div className='col'>
                    <div className="form-group">
                    <div id="div-center">
                      <button
                        name="login"
                        type="submit"
                        className="login-button btn btn-primary"
                        onClick={this.handleLogin}>
                        Login
                      </button>
                    </div>
                  </div>
                    </div>
                  </div>
                </form>
                <div id="div-center">
                  <NavLink to='/signup' id="signup-link">Sign Up</NavLink>
                </div>
              </div>
            </div>
            <div class="col-3"></div>
          </div>
        </div>
      );
    }
  }
}
export default Login;
