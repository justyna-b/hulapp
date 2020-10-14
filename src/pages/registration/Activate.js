import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

class Activate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: this.props.match.params.uid,
      token: this.props.match.params.token,
      message: '',
      res: '',
      showButton: 'true'
    }
  }

  componentDidMount () {
    fetch('https://hulapp.pythonanywhere.com/auth/users/activation/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: this.state.uid,
        token: this.state.token
      })
    })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            message: 'Uff, w końcu... Super, że jesteś z nami!'
          })
        } else if (response.status >= 400) {
          this.setState({ message: 'Coś poszło nie tak :(' })
        } else {
          this.setState({ message: 'Coś poszło nie tak :(' })
        }
      })
      .then(data => {
        this.setState({ res: data })
      })
      .catch(error => {
        this.setState({ message: 'ERROR ' + error })
      })
  }

  render () {
    return (
      <div>
        <div className='reset-pwd u-center-text'>
          <img className='reset-pwd__logo' src={logo} alt={'logo'} />
          <div className='u-info u-margin-bottom-medium'>
            {this.state.message}
          </div>
          {this.state.showButton ? (
            <Link to='/signin'>
              <div>
                <button className='button button-red button-info button-submit'>
                  zaloguj
                </button>
              </div>
            </Link>
          ) : (
            ''
          )}
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
export default Activate
