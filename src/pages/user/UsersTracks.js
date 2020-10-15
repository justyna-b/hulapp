import React from 'react'
import AuthService from '../../logic/AuthService'
import { Redirect } from 'react-router-dom'
import LoggedInNavbar from '../../layout/LoggedInNavbar'
import Sidebar from '../../layout/Sidebar'
import PostAdd from '../../components/PostAdd'
import Track from '../../components/Track'
import Loader from '../../components/animations/Loader'

class UsersTracks extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tracks: [],
      auth: true,
      progressBarDisplayState: 'visible',
      name: '',
      surname: '',
      src: '',
      animation: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('https://hulapp.pythonanywhere.com/api/my-tracks/')
        .then(response => {
          this.setState({
            tracks: response,
            progressBarDisplayState: 'none'
          })
          setTimeout(() => {
            this.setState({ animation: false })
          }, 3500)
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
      <div>
        {this.state.auth ? '' : <Redirect to='/' />}
        <LoggedInNavbar />

        {this.state.animation ? (
          <Loader />
        ) : (
          <div className='grid-row posta-container'>
            <div className='grid-row--col-1-of-7 sider'>
              <Sidebar />
            </div>
            <div className='grid-row--col-6-of-7 posts'>
              {this.state.tracks.length > 0 ? (
                <div>
                  {this.state.tracks.map(track => (
                    <Track
                      data={track}
                      usersId={this.state.id}
                      name={this.state.name}
                      surname={this.state.surname}
                      src={this.state.src}
                      key={track.id}
                    />
                  ))}
                </div>
              ) : (
                <div> wyglada na to że nie masz żadnej trasy :/ </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default UsersTracks
