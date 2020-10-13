import React from 'react'
import logo from '../assets/logo.png'
import AuthService from '../logic/AuthService'

class LoggingForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: ''
    }
    this.Auth = new AuthService()
  }

  handleSubmit = event => {
    event.preventDefault()

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/profile-edit')
      })
      .catch(error => {
        this.setState({
          message: 'NIEPOPRAWNE DANE UŻYTKOWNIKA: BŁĘDNY LOGIN BĄDŹ HASŁO'
        })
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async componentWillMount () {
    if (await this.Auth.loggedIn()) this.props.history.replace('/users-home')
  }

  render () {
    return (
      <div className=' logging-form u-center-text'>
        <form onSubmit={this.handleSubmit}>
          <img className='logging-form__logo' src={logo} alt='logo' />
          <div>
            <div className='logging-form__input'>
              <input
                className='logging-form__input--data'
                type='email'
                placeholder='email'
                name='email'
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <input
                className='logging-form__input--data'
                type='password'
                placeholder='hasło'
                name='password'
                onChange={this.handleChange}
                required
              />
            </div>
            <button
              className='button button-red button-info button-submit logging-form__input--button'
              type='submit'
            >
              zaloguj
            </button>
            <div className='logging-form__forgotten-pwd'>
              <a
                href='/reset-pwd'
                className='logging-form__forgotten-pwd--link'
              >
                zapomniałem hasła
              </a>
            </div>
            <div className='u-center-text login-link'>
              Nie masz jeszcze konta?
              <a href='/registration' className='login-link__text'>
                &nbsp;zarejestruj się
              </a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default LoggingForm
