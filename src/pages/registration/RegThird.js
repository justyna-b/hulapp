import React from 'react'

class RegThird extends React.Component {
  render () {
    return (
      <div className='registration-container__summary'>
        <div className='registration-container__summary--card u-center-text'>
          <p>
            imię :&nbsp;
            <span className='registration-container__summary--card--title'>
              {this.props.name}
            </span>
          </p>
          <p>
            nazwisko :&nbsp;
            <span className='registration-container__summary--card--title'>
              {this.props.surname}
            </span>
          </p>
          <p>
            miasto :&nbsp;
            <span className='registration-container__summary--card--title'>
              {this.props.city}
            </span>
          </p>
          <p>
            państwo :&nbsp;
            <span className='registration-container__summary--card--title'>
              {this.props.country}
            </span>
          </p>
          <p>
            email :&nbsp;
            <span className='registration-container__summary--card--title'>
              {this.props.email}
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default RegThird
