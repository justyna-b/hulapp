import React from 'react'
import AuthService from '../logic/AuthService'

class PostAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      src: '',
      auth: true,
      content: '',
      username: '',
      id: ''
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://hulapp.pythonanywhere.com/auth/users/me/')
        .then(response => {
          this.setState({
            name: response.first_name,
            surname: response.last_name,
            src: response.profile_img,
            username: response.username,
            id: response.id,
            waiter: false
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.content <= 0) {
      alert('nie możesz dodać pustego posta!')
    } else {
      this.Auth.fetch('http://hulapp.pythonanywhere.com/api/post/', {
        method: 'POST',

        body: JSON.stringify({
          first_name: this.state.name,
          last_name: this.state.surname,
          text: this.state.content,
          username: this.state.username
        })
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          }
        })
        .then(this.setState({ alertSuccessVisible: true }))
        .then(setTimeout(() => this.setState({ success: true }), 2000))
    }
  }

  render () {
    return (
      <div>
        <div className='post post-add'>
          <div className='post__header'>
            <img
              className='post__header--img'
              src={this.state.src}
              alt='users img'
            />
            <div className='post__header--name'>
              {this.state.name} {this.state.surname}
            </div>
            <hr />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className='post--content u-center-text'>
              <textarea
                type='text'
                name='content'
                placeholder='Napisz post...'
                onChange={this.handleChange}
              />
            </div>
            <div className='u-center-text'>
              <button type='submit' className='button-transparent btn-sub'>
                dodaj
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default PostAdd
