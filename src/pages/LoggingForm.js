import React from 'react'
import logo from '../assets/logo.png'

class LoggingForm extends React.Component {
  render () {
    return (
      <div className=' logging-form u-center-text'>
        <form>
          <img className='logging-form__logo' src={logo} alt='logo' />
          <div>
            <div className='logging-form__input'>
              <input
                className='logging-form__input--data'
                type='email'
                placeholder='email'
              />
            </div>
            <div>
              <input
                className='logging-form__input--data'
                type='password'
                placeholder='hasło'
              />
            </div>
            <button
              className='button button-red button-info button-submit logging-form__input--button'
              type='submit'
            >
              zaloguj
            </button>
            <div className='logging-form__forgotten-pwd'>
              zapomniałeś hasła?
              <a href='!#' className='logging-form__forgotten-pwd--link'>
                &nbsp; przypomnij
              </a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default LoggingForm
