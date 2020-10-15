import React from 'react'
import AuthService from '../../logic/AuthService'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from 'react-loader-spinner'
import LoggedInNavbar from '../../layout/LoggedInNavbar'
import Sidebar from '../../layout/Sidebar'
import { MDBIcon } from 'mdbreact'
import AutoComplete from '../../components/Autocomplete'
import UserForm from './UserForm'

class AccountEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: '',
      email: '',
      name: '',
      surname: '',
      countryId: '',
      city: '',
      description: '',
      age: '',
      message: '',
      showAlert: false,
      auth: true,
      visible: true,
      cityName: '',
      countryName: '',
      redirect: false,
      showSubmit: false,
      loadig: false
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('https://hulapp.pythonanywhere.com/auth/users/me/').then(
        res => {
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
        }
      )
    } else {
      this.setState({ auth: false })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.Auth.fetch('https://hulapp.pythonanywhere.com/auth/users/me/', {
      method: 'PATCH',

      body: JSON.stringify({
        first_name: this.state.name,
        last_name: this.state.surname,
        country: this.state.countryId,
        city: this.state.city
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
    })
    {
      setTimeout(() => {
        window.location.reload()
      }, 3500)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCityChange = val => {
    this.setState({ city: val.id })
  }

  handleCountryChange = val => {
    this.setState({ countryId: val.id })
  }

  fileSelectedHandler = event => {
    this.setState({
      fileUploaded: event.target.files[0],
      showSubmit: true
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData()
    fd.append(
      'profile_img',
      this.state.fileUploaded,
      this.state.fileUploaded.name
    )
    fd.append('username', this.state.email)
    this.setState({
      loading: true,
      showSubmit: false
    })

    axios({
      method: 'PATCH',
      url: 'https://hulapp.pythonanywhere.com/auth/users/me/',
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      },
      data: fd
    }).then(res => {
      this.setState({
        src: res.profile_img,
        loading: false
      })
      window.location.reload()
    })
  }

  handleSelectChange = e => {
    switch (e.propname) {
      case 'city':
        this.setState({
          city: e.id,
          cityName: e.value
        })
        break
      default:
        break
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
            <div>
              <div className='account u-center-text'>
                <div className='u-margin-bottom-small'>
                  <div className='button-photo-wrapper'>
                    <label
                      className='new-button'
                      htmlFor='upload'
                      id='change-photo'
                    >
                      <MDBIcon icon='image' /> edytuj
                    </label>
                    <input
                      name='myfile'
                      id='upload'
                      type='file'
                      onChange={this.fileSelectedHandler}
                      accept='image/*'
                    />
                  </div>
                  {this.state.loading ? (
                    <div className='spinner'>
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <img className='account__photo' src={this.state.src} />
                  )}
                  {this.state.showSubmit && (
                    <button
                      className='submit-photo-button'
                      onClick={this.fileUploadHandler}
                    >
                      <MDBIcon far icon='check-circle' /> Załaduj zdjęcie
                    </button>
                  )}
                </div>

                <hr />
                <form className='input-in-form' onSubmit={this.handleSubmit}>
                  <button
                    type='submit'
                    onClick={this.submitHandlerAlertShow}
                    className='button button-red button-info button-submit u-margin-bottom-small'
                  >
                    Zapisz zmiany
                  </button>
                  <div className='account__data post'>
                    <div className='account__data--title'>Imię i nazwisko</div>
                    <hr />
                    <div className='account__data--content'>
                      <input
                        placeholder={this.state.name}
                        className='edit-input'
                        type='text'
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <input
                        placeholder={this.state.surname}
                        className='edit-input'
                        type='text'
                        value={this.state.surname}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className='account__data post'>
                    <div className='account__data--title'>Lokalizacja</div>
                    <hr />
                    <div className='account__data--content'>
                      <div className='registration-container__input--select'>
                        <AutoComplete
                          controlId='formBasicCity'
                          label='miasto'
                          dest='cities'
                          name='city'
                          required='true'
                          onSelect={this.handleSelectChange}
                          value={this.state.city}
                          defVal={this.state.cityName}
                        />
                      </div>
                      <div className='registration-container__input--select'>
                        {this.state.countryName}
                      </div>
                    </div>
                  </div>
                </form>
                <div className='account__data post'>
                  <div className='account__data--title'>Kontakt</div>
                  <hr />
                  <div className='account__data--content'>
                    {this.state.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountEdit
