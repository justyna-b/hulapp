import React from 'react'
import  legUp from '../../assets/legUp.png'
import  legDown from '../../assets/legDown.png'

function Loader () {
  return (
    <div>
      <div id='loader-person'>
        <img className='bottom' src={legDown} />
        <img className='top' src={legUp} />
      </div>
    </div>
  )
}

export default Loader
