import React from 'react'
import AuthService from '../../logic/AuthService'
import { Redirect } from 'react-router-dom'
import LoggedInNavbar from '../../layout/LoggedInNavbar'

class UsersPostsAll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://hulapp.pythonanywhere.com/auth/users/me/')
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

  render () {
    return (
      <div className='posts-container'>
        {this.state.auth ? '' : <Redirect to='/home' />}
        <LoggedInNavbar />
        <div className='grid-row'>
          <div className='grid-row--col-1-of-7 sider'></div>
          <div className='grid-row--col-6-of-7 posts'></div>
        </div>
      </div>
    )
  }
}
export default UsersPostsAll
