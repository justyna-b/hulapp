import React, { Component } from 'react'
import logo from '../assets/logo.png'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch('https://hulapp.pythonanywhere.com/auth/users/reset_password/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email
      })
    }).catch(error => {
      this.setState({ message: 'ERROR ' + error })
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  render () {
    return (
      <div>
        <div className='reset-pwd u-center-text'>
          <img className='reset-pwd__logo' src={logo} alt={'logo'} />
          <div className='reset-pwd__info'>
            Podaj swojego maila a odzyskamy Twoje hasło
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              className='logging-form__input--data reset-pwd__input'
              name='email'
              type='email'
              onChange={this.handleChange}
              placeholder='e-mail'
              required
            />
            <div>
              <button className='button button-red button-info button-submit'>
                wyślij
              </button>
            </div>
          </form>
          <div className='reset-pwd__to-home'>
            <a href='/home' className='reset-pwd__to-home--link'>
              Zabierz mnie na stronę główną
            </a>
          </div>
        </div>
      </div>
    )
  }
}
export default ResetPassword
