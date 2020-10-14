import React from 'react'
import AuthService from '../../logic/AuthService'
import { Redirect } from 'react-router-dom'
import LoggedInNavbar from '../../layout/LoggedInNavbar'
import Sidebar from '../../layout/Sidebar'
import PostAdd from '../../components/PostAdd'
import Post from '../../components/Post'

class UsersTracks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      tracks: [],
      name: '',
      src: '',
      id: ''
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://hulapp.pythonanywhere.com/auth/users/me/')
        .then(res => {
          this.setState({
            name: res.first_name,
            src: res.profile_img,
            id: res.user_id
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })

      await this.Auth.fetch('http://hulapp.pythonanywhere.com/api/my-tracks/')
        .then(response => {
          this.setState({
            tracks: response
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
      //}
    } else {
      this.setState({ auth: false })
    }
  }

  render () {
    return (
      <div className='posts-container'>
        {this.state.auth ? '' : <Redirect to='/home' />}
        <LoggedInNavbar />
        <div className='grid-row posta-container'>
          <div className='grid-row--col-1-of-7 sider'>
            <Sidebar />
          </div>
          <div className='grid-row--col-6-of-7 posts'>
            {this.state.tracks.length > 0 ? (
              <div>
                {this.state.tracks.map(track => (
                  <Post data={track} usersId={this.state.id} />
                ))}
              </div>
            ) : (
              <div> wyglada na to że nie masz żadnej trasy :/ </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default UsersTracks
