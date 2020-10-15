import React from 'react'
import AuthService from '../../logic/AuthService'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import LoggedInNavbar from '../../layout/LoggedInNavbar'
import Sidebar from '../../layout/Sidebar'
import Loader from '../../components/animations/Loader'

import Post from '../../components/Post'

class PostWithComments extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      animation: true,
      post: '',
      postAuthorName: '',
      postAuthorSurname: '',
      postAuthorProfPic: '',
      postAuthorId: '',
      name: '',
      surname: '',
      src: '',
      comments: []
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      await this.Auth.fetch(
        `https://hulapp.pythonanywhere.com/api/comment?post=${this.props.match.params.postId}`
      ).then(response => {
        this.setState({
          comments: response
        })
      })
      await this.Auth.fetch(
        `https://hulapp.pythonanywhere.com/api/post/${this.props.match.params.postId}`
      )
        .then(response => {
          this.setState({
            post: response,
            postAuthorName: response.author.first_name,
            postAuthorSurname: response.author.last_name,
            postAuthorProfPic: response.author.profile_img,
            postAuthorId: response.author.id
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })

      await this.Auth.fetch('https://hulapp.pythonanywhere.com/auth/users/me/')
        .then(res => {
          this.setState({
            name: res.first_name,
            userId: res.id,
            surname: res.last_name,
            email: res.email,
            src: res.profile_img
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

  commentAddHandler = event => {
    event.preventDefault()
    this.Auth.fetch(`http://hulapp.pythonanywhere.com/api/comment/`, {
      method: 'POST',

      body: JSON.stringify({
        username: this.state.usernameOfComment,
        text: this.state.commentText,
        post: this.props.match.params.postId
      })
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }
      })
      .then(setTimeout(() => window.location.reload(), 1000))
  }

  onCommentChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <div className='posts-container'>
        {this.state.auth ? '' : <Redirect to='/home' />}
        <LoggedInNavbar />
        {this.state.animation ? (
          <Loader />
        ) : (
          <div className='grid-row posta-container'>
            <div className='grid-row--col-1-of-7 sider'>
              <Sidebar />
            </div>
            <div className='grid-row--col-6-of-7 posts'>
              <div className='post'>
                <div className='post__header'>
                  <div className='post__header'>
                    <img
                      src={this.state.postAuthorProfPic}
                      alt='users img'
                      className='post__header--img'
                    />
                    <div className='post__header--name'>
                      {this.state.postAuthorName} {this.state.postAuthorSurname}
                    </div>
                    <div className='post__header--date'>
                      {this.state.post.add_date.substr(0, 10)}
                      {this.state.post.add_date.substr(11, 12).substr(0, 5)}
                    </div>
                  </div>
                  <hr />
                </div>
                <div className='post--content'>{this.state.post.text}</div>
                <hr />
              </div>

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
                <form onSubmit={this.commentAddHandler}>
                  <div className='post--content u-center-text'>
                    <textarea
                      type='text'
                      name='content'
                      placeholder='Skomentuj'
                      onChange={this.onCommentChange}
                      name='commentText'
                    />
                  </div>
                  <div className='u-center-text'>
                    <button
                      type='submit'
                      className='button-transparent btn-sub'
                    >
                      skomentuj
                    </button>
                  </div>
                </form>
              </div>

              {this.state.comments.map(comment => (
                <div className='post'>
                  <div className='post__header'>
                    <div className='post__header'>
                      <img
                        src={comment.author.profile_img}
                        alt='users img'
                        className='post__header--img'
                      />
                      <div className='post__header--name'>
                        {comment.author.first_name} {comment.author.last_name}
                      </div>
                      <div className='post__header--date'>
                        {comment.add_date.substr(0, 10)}{' '}
                        {comment.add_date.substr(11, 12).substr(0, 5)}
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className='post--content'>{comment.text}</div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default PostWithComments
