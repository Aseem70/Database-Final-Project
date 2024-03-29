import React from 'react';
import './SignIn.css'
import logoCinema from '../../logoCinema.svg';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignInEmail: '',
      SignInPassword: '',
      showMessage: this.props.showMessage
    }
  }

  onEmailChange = (event) => {
    this.setState({ SignInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ SignInPassword: event.target.value });
  }

  onButtonEnterSignIn = (event) => {
    if (event.which === 13) {
      this.onSubmitSignIn();
    }
  }

  onSubmitSignIn = (event) => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.name) {
          let count = 0;
          fetch('http://localhost:3000/getCountTickets', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: user.email,
              phoneno: user.phoneno,
            })
          })
          .then(response => response.json())
          .then(obj => {
            this.props.loadUser(user, obj);
            this.setState({ showMessage: false })
            this.props.onButtonRedirect('home')
          })

          fetch('http://localhost:3000/myTickets', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: this.state.SignInEmail
            })
          })
          .then(response => response.json())
          .then(movies => {
            this.props.myTickets(movies);
          })
        } else if (user === "Invalid credentials") {
          this.setState({ showMessage: true })
          this.refs.email.value = '';
          this.refs.password.value = '';
        }
      })
  }

  render() {
    return (
      <div>
        { this.state.showMessage ?
              <div className="alert alert-warning">
                  <strong>The email or password is incorrect!</strong>
              </div>
              : <div>
              </div>
            }
        <article className="br3 shadow-5 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw7 center">
          <div onKeyUp={this.onButtonEnterSignIn}>
            <main className="pa4 black-80">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                      ref = "email"
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="email"
                      name="email-address"
                      id="email-address"
                      onChange={this.onEmailChange}
                    />
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                    ref = "password"
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                  </div>
                </fieldset>
                <div className="center">
                  <input
                  onClick={this.onSubmitSignIn}
                  className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6.1 dib"
                  type="submit"
                  value="Sign in"
                  />
                </div>
                <div className="lh-copy mt3 center">
                  <p onClick={() => this.props.onButtonRedirect('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                </div>
              </div>
            </main>
          </div>
        </article>
      </div>
    )
  }
}

export default SignIn;
