import React from 'react'
import AuthService from '../logic/AuthService'
import { Link, Redirect } from 'react-router-dom'
import Search from '../components/Search'

class LoggedInNavbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      redirect: false
    }
    this.Auth = new AuthService()
  }
  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('https://hulapp.pythonanywhere.com/auth/users/me/')
        .then(res => {
          this.setState({
            name: res.first_name,
            src: res.profile_img
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }
  }

  onClickLogOut = event => {
    event.preventDefault()
    this.Auth.logout()
    window.location.reload()
    this.setState({
      redLogPage: true
    })
    window.location.href = '/home'
  }

  handleUserChange = val => {
    this.setState({
      userId: val,
      redirect: true
    })
    {
      setTimeout(() => {
        window.location.href = `/user/${val}`
      }, 500)
    }
  }

  render () {
    return (
      <div>
        <div className='navbar-header scrolled z-index-above'>
          <div className='navbar-header__logo'>
            <h1 className='navbar-header__logo--text'>hulapp</h1>
          </div>
          <form action='#' className='search'>
            <Search
              id='searchUsers'
              controlId='formUsersSearch'
              label='Przyjaciele'
              dest='users'
              name='userId'
              required='true'
              onSelect={this.handleUserChange}
              value={this.state.user}
              defVal={this.state.userId}
              onClick={this.clickHandler}
            />
          </form>
          <div className='navbar-header__user'>
            <img className='navbar-header__user--photo' src={this.state.src} />
            <span className='navbar-header__user--logout'>
              {this.state.name}
            </span>
            <button className='button-transparent' onClick={this.onClickLogOut}>
              <a href='/home' className=' navbar-header__user--logout--btn'>
                wyloguj
              </a>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LoggedInNavbar
