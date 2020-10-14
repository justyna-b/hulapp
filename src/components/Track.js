import React, { useState } from 'react'
import AuthService from './../logic/AuthService'

class Track extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      track: props.data,
      auth: true,
      name: '',
      surname: '',
      src: ''
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('https://hulapp.pythonanywhere.com/auth/users/me/')
        .then(res => {
          this.setState({
            name: res.first_name,
            surname: res.last_name,
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

  formatDateTime (dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  render () {
    return (
      <div>
        <div className='post'>
          <div className='post__header'>
            <div className='post__header'>
              <img
                src={this.state.src}
                alt='users img'
                className='post__header--img'
              />
              <div className='post__header--name'>
                {this.state.name} {this.state.surname}
              </div>
              <div className='post-header--date'>
                <div>{this.formatDateTime(this.state.track.time_start)}</div>
              </div>
            </div>
            <hr />
          </div>
          <div className='post--content'>
            <p>
              Czas trwania: <b>{this.state.track.duration}</b>
            </p>
            <p>
              Odległość: <b>{this.state.track.track_length}</b> km
            </p>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}
export default Track
