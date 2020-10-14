import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

class Activate extends Component {
  render () {
    return (
      <div>
        <div className='reset-pwd u-center-text'>
          <img className='reset-pwd__logo' src={logo} alt={'logo'} />
          <div className='u-info u-margin-bottom-medium'>
            Super, że jesteś z nami!
          </div>
          <Link to='/signin'>
            <div>
              <button className='button button-red button-info button-submit'>
                zaloguj
              </button>
            </div>
          </Link>
          <div className='reset-pwd__to-home'>
            <a href='/home' className='reset-pwd__to-home--link'>
              Zabierz mnie na stronę główną
            </a>
          </div>
        </div>
      </div>
    )
  }
}
export default Activate
