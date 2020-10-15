import React from 'react'
import AuthService from '../../logic/AuthService'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import LoggedInNavbar from '../../layout/LoggedInNavbar'
import Sidebar from '../../layout/Sidebar'
import { MDBIcon } from 'mdbreact'
import UserForm from './UserForm'

class FriendAccount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: this.props.match.params.id,
      email: '',
      name: '',
      surname: '',
      countryId: '',
      city: '',
      auth: true,
      cityName: '',
      countryName: '',
      redirect: false,
      loadig: false,
      edit: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        'https://hulapp.pythonanywhere.com/api/users/' +
          this.props.match.params.id
      )
        .then(res => {
          this.setState({
            name: res.first_name,
            userId: res.id,
            surname: res.last_name,
            email: res.email,
            countryId: res.country,
            fileUploaded: null,
            city: res.city,
            src: res.profile_img
          })
          this.Auth.fetch(
            `https://hulapp.pythonanywhere.com/api/cities/${res.city}`
          ).then(r => {
            this.setState({
              cityName: r.name
            })
          })
          this.Auth.fetch(
            `https://hulapp.pythonanywhere.com/api/countries/${res.country}`
          ).then(r => {
            this.setState({
              countryName: r.name
            })
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
        <div className='grid-row posta-container'>
          <div className='grid-row--col-1-of-7 sider'>
            <Sidebar />
          </div>
          <div className='grid-row--col-6-of-7 posts'>
            <UserForm
              name={this.state.name}
              surname={this.state.surname}
              city={this.state.cityName}
              country={this.state.countryName}
              email={this.state.email}
              src={this.state.src}
              enableEdition={false}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FriendAccount