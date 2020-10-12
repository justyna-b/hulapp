import React from 'react'
import logo from '../assets/logo.png'
import {MDBIcon} from 'mdbreact'

class LoggingForm extends React.Component {
  render () {
    return (
      //   <div className='grid-row logging-form'>
      //     <div className='grid-row--col-1-of-2'>logon page</div>
      //     <div className='grid-row--col-1-of-2'>here logo</div>
      //   </div>

      <div className=' logging-form u-center-text'>
        <img className='logging-form__logo' src={logo} alt='logo' />
        <div>
        <div className='logging-form__input'>
          <input className='logging-form__input--data' placeholder='email' />
        </div>
        <div>
           <input className='logging-form__input--data' placeholder='hasło'/>
        </div>
         <button  className='button button-red button-info button-submit logging-form__input--button'>
              zaloguj
            </button>
        </div>
        
      </div>
    )
  }
}
export default LoggingForm
