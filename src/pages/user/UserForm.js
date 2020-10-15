import React from 'react'
import { Link } from 'react-router-dom'
import { MDBIcon } from 'mdbreact'

class UserForm extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div className='account u-center-text'>
          <div className='u-margin-bottom-small'>
            <img className='account__photo' src={this.props.src} />
            {!this.props.enableEdit ? (
              <div className='account__data--edit'>
                <Link to='/edit-my'>
                  <span className='account__data--edit--text'>
                    edytuj mój profil
                  </span>
                  <MDBIcon size='1x' icon='edit' className='icon-red' />
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
          <hr />
          <div className='account__data post'>
            <div className='account__data--title'>Imię i nazwisko</div>
            <hr />
            <div className='account__data--content'>
              {this.props.name} {this.props.surname}
            </div>
          </div>
          <div className='account__data post'>
            <div className='account__data--title'>Lokalizacja</div>
            <hr />
            <div className='account__data--content'>
              {this.props.city} , {this.props.country}
            </div>
          </div>
          <div className='account__data post'>
            <div className='account__data--title'>Kontakt</div>
            <hr />
            <div className='account__data--content'>{this.props.email}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserForm
